export interface Note {
    id: string;
    content: string;
}

export interface Trip {
    id: string;
    destination: string;
    startDate: string;
    endDate: string;
    notes: Note[];
}

export interface User {
    id: string;
    email: string;
    name: string;
}
