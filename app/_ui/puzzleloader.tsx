"use client";

import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { fetchUserPuzzle, postSolveAttempt } from "@/app/_lib/data-service";
import { Puzzle } from "@/app/_lib/definitions";
import PuzzleBoard from "./puzzleboard";
import { Session } from "next-auth";

interface PuzzleLoaderProps {
    session: Session;
};

export default function PuzzleLoader(props: PuzzleLoaderProps) {
    const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | undefined>(undefined);

    useEffect(() => {
        async function load() {
            if (props.session?.user?.email) {
                loadNextPuzzle(props.session.user.email);
            }
        }

        load();
    }, []);

    const loadNextPuzzle = async (email: string) => {
        try {
            const nextPuzzle = await fetchUserPuzzle(email);
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
                fen: currentPuzzle.fen,
                moves: currentPuzzle.moves,
                rating: currentPuzzle.rating,
                popularity: currentPuzzle.popularity
            }}
            loadNextPuzzle={() => props.session?.user?.email && loadNextPuzzle(props.session.user.email)}
            logSolveAttempt = {(isCorrect: boolean) => logSolveAttempt(isCorrect)}
        />
    );
}
