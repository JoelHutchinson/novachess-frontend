"use client";

import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { fetchUserPuzzle } from "@/app/_lib/data-service";
import { Puzzle } from "@/app/_lib/definitions";
import PuzzleBoard from "./puzzleboard";

export default function PuzzleScreen() {
    const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | undefined>(undefined);
    const [session, setSession] = useState<any | null>(null);

    useEffect(() => {
        async function loadSession() {
            const sessionData = await getSession();
            setSession(sessionData);
            if (sessionData?.user?.email) {
                loadNextPuzzle(sessionData.user.email);
            }
        }

        loadSession();
    }, []);

    const loadNextPuzzle = async (email: string) => {
        try {
            const nextPuzzle = await fetchUserPuzzle(email);
            setCurrentPuzzle(nextPuzzle);
        } catch (error) {
            console.error("Error fetching next puzzle:", error);
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
            loadNextPuzzle={() => session?.user?.email && loadNextPuzzle(session.user.email)}
        />
    );
}
