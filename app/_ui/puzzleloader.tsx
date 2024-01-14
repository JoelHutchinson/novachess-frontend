"use client";

import React, { useState, useEffect } from "react";

import { fetchUserPuzzle, postSolveAttempt } from "@/app/_lib/data-service";
import { Puzzle, User } from "@/app/_lib/definitions";
import PuzzleBoard from "./puzzleboard";
import { Session } from "next-auth";

interface PuzzleLoaderProps {
    user: User;
};

export default function PuzzleLoader(props: PuzzleLoaderProps) {
    const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | undefined>(undefined);

    useEffect(() => {
        async function load() {
            if (props.user) {
                loadNextPuzzle(props.user.username);
            }
        }

        load();
    }, []);

    const loadNextPuzzle = async (username: string) => {
        try {
            const nextPuzzle = await fetchUserPuzzle(username);
            setCurrentPuzzle(nextPuzzle);
        } catch (error) {
            console.error("Error fetching next puzzle:", error);
        }
    };

    const logSolveAttempt = async (isCorrect: boolean) => {
        try {
            isCorrect ? console.log("Correct solve!") : console.log("Incorrect solve!")
        } catch (error) {
            console.error("Error logging solve attempt:", error);
        }
    };

    if (!currentPuzzle) {
        return <div>Loading Puzzle...</div>;
    }

    return (
        <PuzzleBoard
            puzzle={{
                id: currentPuzzle.id,
                fen: currentPuzzle.fen,
                moves: currentPuzzle.moves,
                rating: currentPuzzle.rating,
                popularity: currentPuzzle.popularity
            }}
            loadNextPuzzle={() => props.user?.email && loadNextPuzzle(props.user.email)}
            logSolveAttempt = {(isCorrect: boolean) => logSolveAttempt(isCorrect)}
        />
    );
}
