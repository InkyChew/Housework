export class Task {
    id: number = 0;
    name: string = "";
    description: string = "";
    tasker: string = "";
    date: Date = new Date();
    priority: number = 0;
    period: Period = 0;
    state: State = 0;
}

enum Period {
    None,
    Day,
    Week,
    Month,
    Year
}

enum State {
    Incomplete,
    Complete
}

export class WorkSearchParam {
    tasker: string | null = null;
    startDate: Date | null = null;
    endDate: Date | null = null;
    state: State | null = null;
}