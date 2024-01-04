"use client";

import { fetchPuzzle } from "@/app/_lib/dataService";
import { Puzzle } from "@/app/_lib/definitions";
import PuzzleBoard from "./puzzleboard";

export default async function PuzzleScreen() {
    const puzzle: Puzzle = await fetchPuzzle();

    return (<PuzzleBoard
        puzzle={{
            fen: puzzle.fen,
            moves: puzzle.moves,
            rating: puzzle.rating,
            popularity: puzzle.popularity
        }}
        loadNextPuzzle={() => (undefined)}
        />);
}   
