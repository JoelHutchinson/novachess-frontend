"use client";

import { fetchPuzzle } from "@/app/_lib/data-service";
import { Puzzle } from "@/app/_lib/definitions";
import PuzzleBoard from "./puzzleboard";

export default async function PuzzleScreen() {
    const puzzle: Puzzle | undefined = await fetchPuzzle();

    return (puzzle ? <PuzzleBoard
        puzzle={{
            fen: puzzle.fen,
            moves: puzzle.moves,
            rating: puzzle.rating,
            popularity: puzzle.popularity
        }}
        loadNextPuzzle={() => (undefined)}
        /> : null);
}   
