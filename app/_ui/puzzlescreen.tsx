"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { fetchUserPuzzle } from "@/app/_lib/data-service";
import { Puzzle } from "@/app/_lib/definitions";
import PuzzleBoard from "./puzzleboard";

export default function PuzzleScreen() {
    const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | undefined>(undefined);
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.user?.id) {
            loadNextPuzzle(session.user.id);
        }
        else {
            loadNextPuzzle("");
        }
    }, []);

    const loadNextPuzzle = async (userId: string) => {
        try {
            const nextPuzzle = await fetchUserPuzzle(session?.user?.email);
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
            loadNextPuzzle={() => session?.user?.id && loadNextPuzzle(session.user.id)}
        />
    );
}
