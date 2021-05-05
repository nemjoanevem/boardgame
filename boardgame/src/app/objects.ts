export class user{
    id: number;
    name: string;
    email: string;
    password: string;
    city: string;
    gender: string;
    reg_date: string;
    last_login: string;
    played_parties: number;
    created_parties: number;
    status: boolean; //true online, false offline
    games: string[];
}

export class event{
    id: number;
    organizer: string;
    langauge: string;
    password: string;
    game: string;
    img_url: string;
    place: string;
    time: string; // time-start
    maxPlayer: number;
    currentPlayer: number;
    joinedPlayers: string[];
}

export class game{
    id: number;
    name: string;
    img_url: string;
    release_date: string;
    age_limit: number;
    time: number;
    bgg_score: number;
    bgg_link: string;
}