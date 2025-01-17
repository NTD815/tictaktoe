'use client';

import { useState } from 'react';
import { SquareProps } from "@/types/ttt"

export default function Board() {
  
  const [boardState, setBoardState] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]);

  const [gameSteps, setGameSteps] = useState<string[][][]>([]);

  const [xMoveSet, setXMoveSet] = useState<number[]>([]);
  const [oMoveSet, setOMoveSet] = useState<number[]>([]);

  const [lastMove, setLastMove] = useState('');

  // console.log(boardState)
  // console.log(lastMove)
  const handleClick = (rowIdx: number, colIdx: number) => {

    //check if a spot has already been marked, and if so, we don't do any further change
    if(boardState[rowIdx][colIdx]) return;

    let currMove = lastMove == 'X' ? 'O' : 'X'; 

    if(currMove == 'X'){
      setXMoveSet((prev) => {
        return [...prev, 3*rowIdx + colIdx];
      });
    }else{
      setOMoveSet((prev) => {
        return [...prev, 3*rowIdx + colIdx];
      });
    }

    console.log(xMoveSet)
    console.log(oMoveSet)
    
    setBoardState((prev) => {
      const board = [...prev]

      const row = board[rowIdx]

      row[colIdx] = currMove

      board[rowIdx] = row

      return board;
    });

    setLastMove(currMove)

    setGameSteps((prev) => {
      const currState = boardState.map((ele) => [...ele]);
      return [...prev, currState];
    })

    console.log(gameSteps)
  }

  const resetBoard = () => {
    setBoardState(() => {
      return [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];
    })
  }

  const jumpToStep = (step: number) => {
    setBoardState(() => {
      return gameSteps[step];
    });
  }


  return <>
    <div className="h-screen flex items-center justify-center">

      <div className="w-[300px] h-[300px] relative">
        {boardState.map((row, rowIdx) => {
          return (
          <div className="board-row" key={rowIdx}>
            {row.map((cell, colIdx) => {
              return <Square value={cell} key={colIdx} handleClick={() => handleClick(rowIdx, colIdx)}/>
            })}
          </div>
          );
        })}
      </div>

      <div className="w-[300px] h-fit relative border">
          <div className="border m-2 p-2">
            <button onClick={resetBoard} className="border bg-slate-400 text-white p-2 rounded-md">Reset</button>
          </div>
          <div className="border m-2 p-2">
            <h1>GameSteps</h1>
            {gameSteps.map((step, idx) => {
              return <p key={idx} onClick={()=> jumpToStep(idx)} className="cursor-pointer">Step {idx + 1}</p>
            })}
          </div>
      </div>
    </div>
  </>;
}


function Square({value, handleClick} : SquareProps) {
  return <button className="square" onClick={handleClick}>{value}</button>
}
