import { TestBed } from '@angular/core/testing';

import { Connect4Service } from './connect4.service';
import { BehaviorSubject } from 'rxjs';
import { Board, emptyBoard, genBoard, initReturns, playReturns, Connect4Interface, Token, winnerReturns } from './models/connect4.models';

describe('Connect4Service test init', () => {
  let service: Connect4Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Connect4Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //init board vide ok
  it("should init an empty 7x5", () => {
    const b: Board = {width: 7, height: 5, data: [[], [], [], [], [], [], []]};
    const R = service.init(b);
    expect( R.error ).toBeUndefined();
    expect( service.board ).toBe( b );
  });

  //width et height negatif -7, -5
  it("should init an empty 7x5", () => {
    const b: Board = {width: -7, height: -5, data: [[]]};
    const R = service.init(b);
    expect( R.error ).toMatch('invalid magnitudes');
  });

  //width negatif -7
  it("should init an empty 7x5", () => {
    const b: Board = {width: -7, height: 5, data: [[]]};
    const R = service.init(b);
    expect( R.error ).toMatch('invalid magnitudes');
  });

  //height negatif -5
  it("should init an empty 7x5", () => {
    const b: Board = {width: 7, height: -5, data: [[]]};
    const R = service.init(b);
    expect( R.error ).toMatch('invalid magnitudes');
  });

  //height not digit
  it("should init an empty 7x5", () => {
    const b: Board = {width: 7.2, height: 5, data: [[]]};
    const R = service.init(b);
    expect( R.error ).toMatch('invalid magnitudes');
  });

  //height not digit
  it("should init an empty 7x5", () => {
    const b: Board = {width: 7, height: 5.2, data: [[]]};
    const R = service.init(b);
    expect( R.error ).toMatch('invalid magnitudes');
  });

  //height not digit
  it("should init an empty 7x5", () => {
    const b: Board = {width: 7.2, height: 5.2, data: [[]]};
    const R = service.init(b);
    expect( R.error ).toMatch('invalid magnitudes');
  });

});


describe('Connect4Service test winner', () => {
  let service: Connect4Service;
  let empty7x5: Board;

  beforeAll(() => {
    const gb = genBoard(` |
                          |
                          |
                          |
                          |
                          |-------`);
    if (gb.error === undefined) {
      empty7x5 = gb.board;
    }
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Connect4Service);
  });

  it("#RED is play at columns 0 ", () => {
    const b: Board = {width: 7, height: 5, data: [[], ['YELLOW'], [], [], [], [], []]};
    service.init(b);
    const res = service.playStartYellow('RED', 0);
    expect(service.board.data).toEqual([['RED'], ['YELLOW'], [], [], [], [], []]);
  });

  it("#YELLOW is play at columns -1 ", () => {
    const b: Board = {width: 7, height: 5, data: [[], ['RED'], [], [], [], [], []]};
    service.init(b);
    const res = service.playStartYellow('YELLOW', -1);
    expect(res).toEqual({error: 'out of range'});
  });

  it("#RED is play at columns -1 should out of range", () => {
    const b: Board = {width: 7, height: 5, data: [[], ['RED'], [], [], [], [], []]};
    service.init(b);
    const res = service.playStartYellow('RED', 9);
    expect(res).toEqual({error: 'out of range'});
  });

  it("#RED is play at columns 7 should out of range", () => {
    const b: Board = {width: 7, height: 5, data: [[], ['RED'], [], [], [], [], []]};
    service.init(b);
    const res = service.playStartYellow('RED', 7);
    expect(res).toEqual({error: 'out of range'});
  });

    it("Column is full 0", () => {
      const b: Board = {width: 7, height: 5, data: [['RED','YELLOW','RED','YELLOW','RED','YELLOW'], [], [], [], [], [], []]};
      service.init(b);
      const res = service.playStartYellow('RED', 0);
      expect(res).toEqual({error:'column is full'});
    });


});

