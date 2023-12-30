"use client";

import React, { useState } from "react";
import { Chess, Move, Square, Piece } from "chess.js";
import { Chessboard } from "react-chessboard";

import { Puzzle, MoveInput, PuzzleMoveOutcome } from '@/app/lib/definitions';

interface PuzzleBoardProps {
    puzzle: Puzzle;
    loadNextPuzzle: () => void;
};

export default function PuzzleBoard(props: PuzzleBoardProps) {
    const [game, setGame] = useState(new Chess(props.puzzle.fen));
    const [playedMoves, setPlayedMoves] = useState<MoveInput[]>([]);
    const [notPlayedMoves, setNotPlayedMoves] = useState<MoveInput[]>(uciMovesToMoveStack(props.puzzle.moves));
    const [triggerSolutionMove, setTriggerSolutionMove] = useState<boolean>(false);
    const [showCorrectIcon, setShowCorrectIcon] = useState(false);
    const [showIncorrectIcon, setShowIncorrectIcon] = useState(false);
    
    React.useEffect(() => {
        console.log("LOADING NEW PUZZLE.");
        if (props.puzzle.fen) {
            // Initialize puzzle when props.puzzleFen changes.
            setGame(new Chess(props.puzzle.fen));
            setPlayedMoves([]);
            setNotPlayedMoves(uciMovesToMoveStack(props.puzzle.moves));
            setTriggerSolutionMove(true);
        }
    }, [props.puzzle]);

    React.useEffect(() => {
        if (triggerSolutionMove) {
            makeNextSolutionMove();
            setTriggerSolutionMove(false);
        }
    }, [triggerSolutionMove]);

    function makeAMove(move: MoveInput): PuzzleMoveOutcome {
        if (notPlayedMoves.length > 0) {
            // Check if move is legal.
            const gameCopy = new Chess(game.fen());
            const result = gameCopy.move(move);
            if (result === null) {
                return 'illegal';
            }
            
            // Check if the played move matches the solution move.
            const solutionMove = notPlayedMoves[0];
            const isMoveCorrect = move.from === solutionMove.from
                && move.to === solutionMove.to;

            // Log the move.
            console.log("Move: " + move.from + move.to);
            console.log("Expected: " + notPlayedMoves[0]);
            console.log("Move correctness: " + isMoveCorrect);

            if (isMoveCorrect) {
                setGame(gameCopy);

                // Push the top solution move onto the played stack.
                setPlayedMoves([notPlayedMoves[0], ...playedMoves]);
                
                // Pop the top solution move off of the unplayed stack.
                setNotPlayedMoves(notPlayedMoves.slice(1));
                return 'correct';
            }
            else {
                return 'incorrect';
            }
        }
        return 'error';
    }


    function onDrop(sourceSquare: string, targetSquare: string) {
        console.log("Source: " + sourceSquare);
        console.log("Target: " + targetSquare);

        const move : MoveInput = {
            from: sourceSquare,
            to: targetSquare,
            promotion: "q", // always promote to a queen for example simplicity
          };

        const moveResult = makeAMove(move);
          
        switch (moveResult) {
            case 'correct':
                // Display correct move icon.
                setShowCorrectIcon(true);
                setTimeout(() => setShowCorrectIcon(false), 1000); // Hide the icon after a delay

                // Make the next solution move.
                setTimeout(() => setTriggerSolutionMove(true), 500);
                break;
            case 'incorrect':
                // Display the incorrect move icon.
                setShowIncorrectIcon(true);
                setTimeout(() => setShowIncorrectIcon(false), 1000); // Hide the icon after a delay
                break;
                
            case ('illegal'):
                // Handle illegal move
                break;
            case ('error'):
                break;
        }

          // illegal move
          if (moveResult === 'illegal') return false;

          return true;
    };

    function uciToMove(uci: string): MoveInput {
        return {
            from: uci.substring(0, 2),
            to: uci.substring(2, 4),
            promotion: "q", // always promote to a queen for example simplicity
          };
    }

    function handleNextMoveClick() {
        if (notPlayedMoves.length === 0) {
            props.loadNextPuzzle();
        }
        else {
            makeNextSolutionMove();
        }
    }

    function uciMovesToMoveStack(uciList: string): MoveInput[] {
        return uciList.split(" ").map(uciToMove);
    }

    function makeNextSolutionMove() {
        if (notPlayedMoves.length === 0) {
            props.loadNextPuzzle();
        }
        else{
            makeAMove(notPlayedMoves[0]);
        }
    }

  return (
    <div>
      <div style={{display: "flex", flexDirection: "column"}}>
        <Chessboard boardWidth={400} position={game.fen()} onPieceDrop={onDrop}/>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
            <button onClick={handleNextMoveClick}>Next Move</button>
            <div style={{marginTop: "5px", width: "24px", height: "24px", display: "flex"}}>
                {showCorrectIcon && (<p>Correct, keep going!</p>)}
                {showIncorrectIcon && (<p>Incorrect, try again.</p>)}
            </div>
            <button onClick={props.loadNextPuzzle}>Next Puzzle</button>
        </div>
      </div>
      {/*
      <Typography sx={{ p: 2, color: 'text.secondary' }}>Played moves: {playedMoves.join(", ")}</Typography>
      <Typography sx={{ p: 2, color: 'text.secondary' }}>Not played moves: {notPlayedMoves.join(", ")}</Typography>
      */}
    </div>
  );
}