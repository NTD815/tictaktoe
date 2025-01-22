'use client';

import { useEffect, useState } from 'react';
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

  const [winner, setWinner] = useState('');

  const [currentStep, setCurrentStep] = useState(9);

  const [leadingMark, setLeadingMark] = useState<string>('');
  // console.log(boardState)
  // console.log(lastMove)

  useEffect(() => {
    if(gameSteps.length >= 5){
      checkVictoryCondition();
    }
  }, [boardState, gameSteps]);

  const syncMoveSetsWithHistoryRevision = () => {
    if(currentStep === 0){
        if(leadingMark == 'X'){
            setXMoveSet(() => {
                return xMoveSet.slice(0,1);
            });
            setOMoveSet(() => {
                return [];
            });
        }else{
            setXMoveSet(() => {
                return [];
            });
            setOMoveSet(() => {
                return oMoveSet.slice(0,1);
            });
        }
    }else if(currentStep % 2 != 0){
        //slice equally  
        let elements = (currentStep + 1)/2

        setXMoveSet(() => {
            return xMoveSet.slice(0, elements);
        });

        setOMoveSet(() => {
            return oMoveSet.slice(0, elements);
        });
    }else if(currentStep % 2 == 0){
        let leadingSlice = currentStep/2 + 1;
        let followingSlice = currentStep/2;

        if(leadingMark == 'X'){
            setXMoveSet(() => {
                return xMoveSet.slice(0, leadingSlice);
            });

            setOMoveSet(() => {
                return oMoveSet.slice(0, followingSlice);
            });
        }else{
            setXMoveSet(() => {
                return xMoveSet.slice(0, followingSlice);
            });

            setOMoveSet(() => {
                return oMoveSet.slice(0, leadingSlice);
            });
        }
    }
  }
  const placeMarker = (rowIdx: number, colIdx: number) => {

    let lm = lastMove;

    if(winner) return;

    if(currentStep < gameSteps.length -1){
      //invalidate the history  after this step
      setGameSteps((prev) => {
        return prev.slice(0, currentStep + 1);
      });

      syncMoveSetsWithHistoryRevision();

      //reset current set since we now want to build new history
      setCurrentStep(9);

      //reset last move for that step
      let followUpMark = leadingMark == 'X' ? 'O' : 'X';

      if(currentStep % 2 == 0){
        setLastMove(leadingMark);
        lm = leadingMark;
      }else{
        setLastMove(followUpMark);
        lm = followUpMark;
      }
    }
    //check if a spot has already been marked, and if so, we don't do any further change
    if(boardState[rowIdx][colIdx]) return;

    let currMove = lm == 'X' ? 'O' : 'X'; 
    
    if(!gameSteps.length) setLeadingMark(currMove);

    if(currMove == 'X'){
      setXMoveSet((prev) => {
        return [...prev, 3*rowIdx + colIdx];
      });
    }else{
      setOMoveSet((prev) => {
        return [...prev, 3*rowIdx + colIdx];
      });
    }
    
    setBoardState((prev) => {
      const board = [...prev]

    //   const row = board[rowIdx]

    //   row[colIdx] = currMove

      board[rowIdx][colIdx] = currMove

      return board;
    });

    setLastMove(currMove)

    setGameSteps((prev) => {
      const currState = structuredClone(boardState);
      return [...prev, currState];
    })
}

  const resetBoard = () => {
    setBoardState(() => {
      return [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];
    });

    //reset game history
    setGameSteps(() => {
      return [];
    });

    //reset move sets
    setXMoveSet(() => {
      return [];
    });

    setOMoveSet(() => {
      return [];
    })

    //reset last move
    setLastMove('');

    setCurrentStep(9);

    setLeadingMark('');

    setWinner('');
  }

  const jumpToStep = (step: number) => {
    setBoardState(() => {
      return structuredClone(gameSteps[step]);
    });

    setCurrentStep(step);
  }

  const currentTurn = () => {
    return lastMove == 'X' ? 'O' : 'X';
  }
  const checkVictoryCondition = () => {
    //check rows
    for(let i = 0; i < 3; i++){
      if(boardState[i][0] && boardState[i][0] == boardState[i][1] && boardState[i][0] == boardState[i][2]){
        setWinner(boardState[i][0]);
        return;
      }
    }

    //check columns
    for(let i = 0; i < 3; i++){
        if(boardState[0][i] && boardState[0][i] == boardState[1][i] && boardState[0][i] == boardState[2][i]){
          setWinner(boardState[0][i]);
          return;
        }
    }

    //checks diagonals
    //left diagonal
    
    if(boardState[0][0] && boardState[0][0] == boardState[1][1] && boardState[0][0] == boardState[2][2]){
        setWinner(boardState[0][0]);
        return;
    }
    
    //right diagonal
    if(boardState[0][2] && boardState[0][2] == boardState[1][1] && boardState[0][2] == boardState[2][0]){
        setWinner(boardState[0][2]);
        return;
    }
  }


  return <>
    <div id="game_screen" className="h-screen flex items-center justify-center">
      
      <div className="w-fit max-w-[50%] board">
      <h1 className="text-4xl font-bold absolute top-[15%] text-white">
        {winner ? `Winner: ${winner}` : gameSteps.length < 9 ? `Player: ${currentTurn()}` : 'Game over'}
      </h1>
        <div className="my-2">
          {boardState.map((row, rowIdx) => {
            return (
            <div className="board-row" key={rowIdx}>
              {row.map((cell, colIdx) => {
                return <Square value={cell} key={colIdx} handleClick={() => placeMarker(rowIdx, colIdx)}/>
              })}
            </div>
            );
          })}
        </div>
      </div>

      <div className="min-w-[500px] min-h-[500px] relative left-10">
          <div className="m-2 p-2 flex justify-end">
            <button onClick={resetBoard} className="border bg-black text-white p-2 rounded-md reset-btn">Reset</button>
          </div>
          <div className="border m-2 px-10 py-3 min-h-[200px]">
            <h1 className="text-2xl font-bold text-white underline">Step Ladder</h1>
            <div className="my-5">
              {gameSteps.map((step, idx) => {
                return <p key={idx} onClick={()=> jumpToStep(idx)} className={"cursor-pointer text-lg text-white underline" + ` ml-${idx+1}`}>Step {idx + 1}</p>
              })}
            </div>
          </div>
      </div>
    </div>
  </>;
}


function Square({value, handleClick} : SquareProps) {
  return <button className="square" onClick={handleClick}>
    <span className={value?"opacity-100":"opacity-0"}>{value ?value: 'H'}</span>
  </button>
}
