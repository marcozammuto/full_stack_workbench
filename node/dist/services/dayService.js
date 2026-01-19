export class Day {
    // Normal signature with defaults
    constructor(notes, dayModifierId, userId, startedAt, endedAt) {
        this.date = new Date();
        this.isWorkingDay = ![0, 6].includes(new Date().getDay());
        this.notes = notes;
        this.dayModifierId = dayModifierId;
        this.userId = userId;
        this.startedAt = startedAt;
        this.endedAt = endedAt;
    }
}
//# sourceMappingURL=dayService.js.map