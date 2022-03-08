import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Connect4Service } from '../connect4.service';
import { Board, genBoard, Token, winnerReturns } from '../models/connect4.models';

@Component({
  selector: 'app-connect4',
  templateUrl: './connect4.component.html',
  styleUrls: ['./connect4.component.scss']
})
export class Connect4Component {
  board: Observable<Board>;
  current: Token = 'RED';
  message: Object = {};
  start: Token = 'YELLOW';
  showBlock = true;
  winners : winnerReturns ='NONE';


  constructor(private p4s: Connect4Service) {
    this.board = p4s.boardObs;
    //Initialize A empty board 6x7
    const winR4_2_6x7 = genBoard(`|
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |-------
    `);
    if (winR4_2_6x7.error === undefined) {
      this.message = p4s.init(winR4_2_6x7.board);

    }
  }

  setWinners(win : winnerReturns){
    this.winners = win;
  }

  /**
   * Display a board as a matrix of tokens and empty strings.
   * @param b The board to display
   * @returns A matrix composed of tokens and ''
   */
  matrix(b: Board): (Token | '')[][] {
    const D = b.data;
    return Array(b.height).fill(0).map(
      (_, j) => D.map( (_, i) => D[i][j] ?? '' )
    ).reverse();
  }

  /**
   * The current player plays a piece in column i,
   * if it is possible he places it in the board
   * @param i columns to play
   */
  play(i: number): void {
    console.log("Courament c'est : "+this.current);
    if(this.start==='RED'){
      this.message = this.p4s.playStartRed(this.current, i);
      this.winner(i);
      this.current = this.current === 'RED' ? 'YELLOW' : 'RED';
    }
    else{
      this.message = this.p4s.playStartYellow(this.current, i);
      this.winner(i);
      this.current = this.current === 'RED' ? 'YELLOW' : 'RED';
    }
  }

  /**
   * Identify if theres a winners during the game
   * @param n
   * @returns the token of the winners if theres is one else return 'NONE'
   */
  winner(n: number): winnerReturns {
    let gagnant = this.p4s.winner(n)
    if(gagnant!='NONE' && gagnant!=undefined){
      this.winners = this.p4s.winner(n)
      this.clearAll()
    }
    return this.p4s.winner(n);
  }

 /* Set which player start YELLOW OR RED */
  setStart(token:Token){
    this.start=token;
    this.current=token;
  }

  /* Clear our data board */
  clearAll(){
    const winR4_2_6x7 = genBoard(`|
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |-------
    `);
    if (winR4_2_6x7.error === undefined) {
      this.message = this.p4s.init(winR4_2_6x7.board);
    }
    this.current = 'RED';
    this.message = {};
    this.start = 'YELLOW';
    this.showBlock = true;
    }
  }


export type genBoardResult = {error: undefined, board: Board} | {error: "string non parsable to a Board"}
/**
 * Parse a string and returns a board.
 *   First column is made of '|'.
 *   The cases must be R, Y or ' ' \
 *   |R  R \
 *   |YR R \
 *   |----    <= bottom line, defines the width
 * @param str The string to be parsed
 * @returns an error or a board
 */




