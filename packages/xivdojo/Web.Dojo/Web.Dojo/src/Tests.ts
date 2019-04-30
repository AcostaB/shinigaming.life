import { DragoonSimulator } from './DragoonSimulator';
import { BaseSimulatorTests } from './BaseSimulatorTests';
import { DragoonTests } from './DragoonTests';
import { DragoonSimulatorTests } from './DragoonSimulatorTests';

export class Tests {
    constructor() {
        var vm: DragoonSimulator = new DragoonSimulator();
        var dragoonModelTests = new DragoonTests();
        var baseSimulatorTests = new BaseSimulatorTests();
        var dragoonSimulatorTests = new DragoonSimulatorTests();
        QUnit.start();
    }
}