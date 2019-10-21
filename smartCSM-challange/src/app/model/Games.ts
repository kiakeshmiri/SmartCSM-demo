export interface GameScores {
    id: number;
    winner_score: number;
    looser_id: number;
    looser_score: number;
}

export interface Participant {
    id: number;
    "First Name": string;
    "Last Name": string;
    Banned: boolean
}

export class Person {
    id: number;
    Name: string;
    banned: boolean;
    winnerScore: number;
    looserScore: number;
}

export class GameTable {
    id: number;
    winner: Person;
    loosers: Person[];
    totalGames: number;
    won: number;    
}

export interface Stats{
    name1: string;
    name2: string;
    winnerScore: number;
    looserScore: number;
}