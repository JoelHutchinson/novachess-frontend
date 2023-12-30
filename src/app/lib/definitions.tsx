export interface Puzzle {
    id?: string;
    fen: string;
    moves: string;
    rating: number;
    popularity: number;
};

export type MoveInput = {
    from: string;
    to: string;
    promotion?: string;
};

export interface PuzzleApiResponse {
    entity: {
        _embedded: {
            puzzles: Puzzle[];
        };
    };
}

export type PuzzleMoveOutcome = 'correct' | 'incorrect' | 'illegal' | 'error';