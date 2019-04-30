export class PPSEntry implements IPPSEntry {
    pps: number;
    time: number;

    constructor(pps: number, time: number) {
        this.pps = pps;
        this.time = time;
    }
}