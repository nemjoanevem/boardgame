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
}

export class event{
    id: number;
    organizer: string;
    place: string;
    langauge: string;
    max_players: number;
    min_players: number;
    time: string; // time-start
    time_end: string;
    time_created: string;
    game: string;
}

export class game{
    id: number;
    name: string;
    thumbnail: string;
    release_date: string;
    age_limit: number;
    time: number;
    bgg_score: number;
    bgg_link: string;
}