export declare class Day {
    date: Date;
    isWorkingDay: boolean;
    notes: string;
    dayModifierId: number;
    userId: number;
    startedAt: number;
    endedAt: number;
    constructor(notes: string, dayModifierId: number, userId: number, startedAt: number, endedAt: number);
}
