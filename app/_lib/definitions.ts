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
};

export type PuzzleMoveOutcome = 'correct' | 'incorrect' | 'illegal' | 'error';


export type Theme = 'dark' | 'light';
export type Language = 'en' | 'es' | 'fr';

export interface Settings {
  theme: Theme;
  language: Language;
};

export type SettingsContextType = {
    settings: Settings;
    toggleTheme: () => void;
    setLanguage: (language: Language) => void;
};

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export interface SolveAttempt {
    id?: string;
    user: User;
    puzzle: Puzzle;
    attemptTime: string; // ISO 8601 format
    success: boolean;
};
