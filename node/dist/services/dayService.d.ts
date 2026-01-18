declare class Day {
    date: Date;
    isWorkingDay: boolean;
    notes: string;
    dayModifierId: number;
    userId: number;
    workedHours: number;
    constructor(notes: string, dayModifierId: number, userId: number, workedHours: number);
}
export declare const getCurrentDay: (notes: string, dayModifierId: number, userId: number) => Day;
export {};
