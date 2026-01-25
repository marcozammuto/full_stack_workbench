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
export declare const getAllDayModifiers: () => Promise<import("../types/interfaces.js").LookupInterface[]>;
export declare const getTodayHoliday: () => Promise<any>;
export declare const retrieveDayModifierId: (str: string) => Promise<number>;
