"use client";

import PuzzleBoard from "./puzzleboard";

export default function PuzzleScreen() {
    return (<PuzzleBoard
        puzzle={{
            fen: "q3k1nr/1pp1nQpp/3p4/1P2p3/4P3/B1PP1b2/B5PP/5K2 b k - 0 17",
            moves: "e8d7 a2e6 d7d8 f7f8",
            rating: 0,
            popularity: 0
        }}
        loadNextPuzzle={() => (undefined)}
        />);
}   
