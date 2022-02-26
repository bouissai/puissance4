import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Board, emptyBoard, initReturns, playReturns, Connect4Interface, Token, winnerReturns } from './models/connect4.models';

@Injectable({
  providedIn: 'root'
})
export class Connect4Service implements Connect4Interface {
  play(arg0: string, arg1: number) {
    throw new Error('Method not implemented.');
  }
  private readonly _boardSubj = new BehaviorSubject<Board>(emptyBoard);
  public  readonly boardObs = this._boardSubj.asObservable();

  get board(): Board  {return this._boardSubj.value}
  set board(b: Board) {this._boardSubj.next(b)}
  /**
   * Initialize the board.
   * Errors should be considered in order (if several errors are possible, returns the first one in the following list)
   * @param board The new board
   * @returns \{error: undefined, board: Board} if the board is valid
   * @returns \{error: 'invalid magnitudes'} if width or height are not valid magnitude (i.e. strictly positive integers)
   */
   init(board: Board): initReturns {
    let error = undefined;
    if((board.width <= 1 || board.height <= 1) || (!Number.isInteger(board.width) || !Number.isInteger(board.height))){
      return {error : 'invalid magnitudes'};
    }
    let i = 0, j = 0;
    board.data.forEach(element => {
      element.forEach(col => {
        if(col == 'RED'){
          i = i + 1;
        }else{
          j = j + 1;
        }
      })
    });
    this.board = board;
    return {error, board};
  }

  /**
   * Play token at column  when we start by RED\
   * PRECONDITION : the board is correct.
   * @param token The token to play
   * @param column The column where to play, must be an integer
   * @returns \{error: undefined, board: the new board} with token t at column in case of success. The new board is then set to the board attribute
   * @returns \{error: 'out of range'} in case column is not a valid column index :
   * @returns \{error: 'column is full'} in case column is ALREADY full.
   * @returns \{error: 'not your turn'} As RED begins, then #RED should be equals to #YELLOW or #YELLOW + 1.
   */

   playStartRed(token: Token, column: number): playReturns {
    if(column > this.board.width-1 || column < 0 ){
      return{error: 'out of range'}
    }
    let counts_colonne_jaune = 0;
    let counts_colonne_rouge = 0;
    let nombre_total_piece = 0;
    this.board.data.forEach(element => {
      element.forEach(col => {
        if(col == 'RED'){
          counts_colonne_rouge = counts_colonne_rouge + 1;
        }
        if(col == 'YELLOW'){
          counts_colonne_jaune = counts_colonne_jaune + 1;
        }
        nombre_total_piece = nombre_total_piece + 1;
      })
    });
    let counts_colonne = 0;
    for (const num of this.board.data[column]) {
      if((num=='YELLOW')||(num=='RED')){
        counts_colonne++;
      }
    }
    if(counts_colonne==this.board.height+1){
      return {error: 'column is full'};
    }
    if((token == 'RED')&&(counts_colonne_rouge > counts_colonne_jaune)){
      window.alert("Not your turn");
      return{error: 'not your turn'}
    }

   if((token == 'YELLOW')&&(counts_colonne_jaune === counts_colonne_rouge)){
      window.alert("Not your turn");
      return{error: 'not your turn'}
    }
    let copie_board_data: any[] = [];
    for(let i = 0; i < this.board.data.length;i++){
      copie_board_data.push([]);
      for(let j = 0; j < this.board.data[i].length;j++){
        copie_board_data[i].push(this.board.data[i][j]);
      }
    }
    const copie_board_height= this.board.height;
    const copie_board_width= this.board.width;
    let copie_board : Board;
    let i=0;
    while(i<this.board.height) {
      if((!(this.board.data[column][i]=='YELLOW'))&&(!(this.board.data[column][i]=='RED'))){
        copie_board_data[column][i] = token;
        i=this.board.height
      }
      i++;
    }
    this.init({data:copie_board_data,height:copie_board_height,width:copie_board_width});
    return {success: {data:copie_board_data,height:copie_board_height,width:copie_board_width}};
  }
  /**
   * Play token at column  when we start by YELLOW
   * PRECONDITION : the board is correct.
   * @param token The token to play
   * @param column The column where to play, must be an integer
   * @returns \{error: undefined, board: the new board} with token t at column in case of success. The new board is then set to the board attribute
   * @returns \{error: 'out of range'} in case column is not a valid column index :
   * @returns \{error: 'column is full'} in case column is ALREADY full.
   * @returns \{error: 'not your turn'} As YELLOW begins, then #YELLOW should be equals to #RED or #RED + 1.
   */

  playStartYellow(token: Token, column: number): playReturns{
    if(column > this.board.width-1 || column < 0 ){
      return{error: 'out of range'}
    }
    let counts_colonne_jaune = 0;
    let counts_colonne_rouge = 0;
    let nombre_total_piece = 0;
    this.board.data.forEach(element => {
      element.forEach(col => {
        if(col == 'RED'){
          counts_colonne_rouge = counts_colonne_rouge + 1;
        }
        if(col == 'YELLOW'){
          counts_colonne_jaune = counts_colonne_jaune + 1;
        }
        nombre_total_piece = nombre_total_piece + 1;
      })
    });
    let counts_colonne = 0;
    for (const num of this.board.data[column]) {
      if((num=='YELLOW')||(num=='RED')){
        counts_colonne++;
      }
    }
    if(counts_colonne==this.board.height+1){
      return {error: 'column is full'};
    }
    if((token == 'YELLOW')&&(counts_colonne_jaune > counts_colonne_rouge )){
      window.alert("Not your turn");
      return{error: 'not your turn'}
    }

   if((token == 'RED')&&(counts_colonne_jaune === counts_colonne_rouge)){
      window.alert("Not your turn");
      return{error: 'not your turn'}
    }

    let copie_board_data: any[] = [];
    for(let i = 0; i < this.board.data.length;i++){
      copie_board_data.push([]);
      for(let j = 0; j < this.board.data[i].length;j++){
        copie_board_data[i].push(this.board.data[i][j]);
      }
    }
    const copie_board_height= this.board.height;
    const copie_board_width= this.board.width;
    let copie_board : Board;
    let i=0;
    while(i<this.board.height) {
      if((!(this.board.data[column][i]=='YELLOW'))&&(!(this.board.data[column][i]=='RED'))){
        copie_board_data[column][i] = token;
        i=this.board.height
      }
      i++;
    }
    this.init({data:copie_board_data,height:copie_board_height,width:copie_board_width});
    return {success: {data:copie_board_data,height:copie_board_height,width:copie_board_width}};
  }

  /**
   * Identify who is the winner, if there is any. NONE otherwise. \
   *  We check for 8 directions if theres is 4 same token.
   * PRECONDITION : the board is correct.
   * @param nb Columns of the last token played
   * @returns the token of the winner if any, NONE otherweise
   */
  winner(nb: number): winnerReturns {
    //FIRST WE SEARCH IN BOARD THE COORDS OF THE LAST TOKEN IN THE COLUMNS i

    let y = this.board.data[nb].length-1 //coord(nb,j) = last play position in board
    let tokenplay = (this.board.data[nb][y]);

    let piece = this.board.data[nb][y];
    let ROW_COUNT = this.board.width;
    let COLUMN_COUNT = this.board.height;
    // Check horizontal locations for win

    for(let c=0; c<(COLUMN_COUNT-3);c++){
      for (let r=0; r<(ROW_COUNT);r++){
        if (this.board.data[r][c] == piece && this.board.data[r][c+1] == piece && this.board.data[r][c+2] == piece && this.board.data[r][c+3] == piece)
          return piece;
        }
    }
    // Check vertical locations for win
    for (let c=0;c<(COLUMN_COUNT);c++){
      for (let r=0;r<ROW_COUNT-3;r++){
        if (this.board.data[r][c] == piece && this.board.data[r+1][c] == piece && this.board.data[r+2][c] == piece && this.board.data[r+3][c] == piece)
          return piece;
      }
    }
    // Check positively sloped diaganols
    for(let c=0; c<(COLUMN_COUNT-3);c++){
      for (let r=0; r<(ROW_COUNT-3);r++){
        if (this.board.data[r][c] == piece && this.board.data[r+1][c+1] == piece && this.board.data[r+2][c+2] == piece && this.board.data[r+3][c+3] == piece)
          return piece;
      }
    }

    // Check negatively sloped diaganols
    for (let c=0 ;c<(COLUMN_COUNT-3);c++){
      for (let r=3 ;r<(ROW_COUNT);r++){
        if (this.board.data[r][c] == piece && this.board.data[r-1][c+1] == piece && this.board.data[r-2][c+2] == piece && this.board.data[r-3][c+3] == piece)
          return piece;
      }
    }
    return 'NONE';
  }
}
