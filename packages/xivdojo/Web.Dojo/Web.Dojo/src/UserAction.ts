﻿export class UserAction implements IUserAction {
    name: string;
    time: number;

    constructor(name: string, time: number) {
        this.name = name;
        this.time = time;
    }
}