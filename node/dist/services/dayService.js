class Day {
    // Normal signature with defaults
    constructor(notes, dayModifierId, userId, workedHours) {
        this.date = new Date();
        this.isWorkingDay = [0, 6].includes(new Date().getDay());
        this.notes = notes;
        this.dayModifierId = dayModifierId;
        this.userId = userId;
        this.workedHours = workedHours;
    }
}
export const getCurrentDay = (notes, dayModifierId, userId) => {
    const day = new Day(notes, dayModifierId, userId, 8);
    return day;
};
//# sourceMappingURL=dayService.js.map