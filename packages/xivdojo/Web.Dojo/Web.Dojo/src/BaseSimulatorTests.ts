import { BaseSimulator } from './BaseSimulator';
import { SimEvent } from './SimEvent';
export class BaseSimulatorTests {
    constructor() {
        QUnit.test("PPS: true thrust", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var skill = simulatorViewModel.dragoon.TrueThrust;
            simulatorViewModel.activateSkill(skill);

            assert.equal(simulatorViewModel.time, 1300);
            assert.equal(simulatorViewModel.totalPotency, 150);
            assert.equal(simulatorViewModel.pps, 115.38);
        });

        QUnit.test("PPS: true thrust x3", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var skill = simulatorViewModel.dragoon.TrueThrust;
            simulatorViewModel.activateSkill(skill);
            simulatorViewModel.activateSkill(skill);
            simulatorViewModel.activateSkill(skill);

            assert.equal(simulatorViewModel.time, 1300 + 2500 + 2500);
            assert.equal(simulatorViewModel.totalPotency, 450);
            assert.equal(simulatorViewModel.pps, 71.42);
        });

        QUnit.test("PPS: true thrust, vorpal thrust. full thrust", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.FullThrust);

            assert.equal(simulatorViewModel.time, 1300 + 2500 + 2500);
            assert.equal(simulatorViewModel.totalPotency, 150 + 200 + 360);
            assert.equal(simulatorViewModel.pps, 112.69);
        });

        QUnit.test("Opening with: true thrust ", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var skill = simulatorViewModel.dragoon.TrueThrust;
            simulatorViewModel.events.push(new SimEvent(simulatorViewModel.time + skill.animationDuration, skill, SimEventType.AnimationFinished));

            var expectedTimestamp = simulatorViewModel.dragoon.TrueThrust.animationDuration;
            var expectedSimEventType = SimEventType.AnimationFinished;

            assert.equal(simulatorViewModel.events[0].timestamp, expectedTimestamp);
            assert.equal(simulatorViewModel.events[0].eventType, expectedSimEventType);
            assert.equal(simulatorViewModel.events.length, 1);
        });

        QUnit.test("determinePositionInSimEvents - 0 events in the list ", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var skill = simulatorViewModel.dragoon.TrueThrust;

            var actual = simulatorViewModel.determinePositionInSimEvents(new SimEvent(simulatorViewModel.time + skill.animationDuration, skill, SimEventType.AnimationFinished));

            assert.equal(actual, 0);
        });

        QUnit.test("determinePositionInSimEvents - 4 DoT tick events in the list - add animation event at index = 1 ", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var skill = simulatorViewModel.dragoon.TrueThrust;

            simulatorViewModel.events.push(new SimEvent(500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
            simulatorViewModel.events.push(new SimEvent(3500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
            simulatorViewModel.events.push(new SimEvent(6500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
            simulatorViewModel.events.push(new SimEvent(9500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));


            var actual = simulatorViewModel.determinePositionInSimEvents(new SimEvent(1300, skill, SimEventType.AnimationFinished));

            assert.equal(actual, 1);
        });

        QUnit.test("determinePositionInSimEvents - 8 DoT tick events in the list - add animation event at index = 7 ", function (assert) {
            // Realistically, the animation event would never happen after 7 dot events, but this is just for testing purposes.
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var skill = simulatorViewModel.dragoon.TrueThrust;

            simulatorViewModel.events.push(new SimEvent(500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
            simulatorViewModel.events.push(new SimEvent(3500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
            simulatorViewModel.events.push(new SimEvent(6500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
            simulatorViewModel.events.push(new SimEvent(9500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
            simulatorViewModel.events.push(new SimEvent(12500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
            simulatorViewModel.events.push(new SimEvent(15500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
            simulatorViewModel.events.push(new SimEvent(18500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
            simulatorViewModel.events.push(new SimEvent(21500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));

            var actual = simulatorViewModel.determinePositionInSimEvents(new SimEvent(19300, skill, SimEventType.AnimationFinished));

            assert.equal(actual, 7);
        });

        QUnit.test("determinePositionInSimEvents - testing the splice method ", function (assert) {
            // Realistically, the animation event would never happen after 7 dot events, but this is just for testing purposes.
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var skill = simulatorViewModel.dragoon.TrueThrust;

            simulatorViewModel.events.push(new SimEvent(500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
            simulatorViewModel.events.push(new SimEvent(1500, simulatorViewModel.dragoon.TrueThrust, SimEventType.AnimationFinished));
            simulatorViewModel.events.push(new SimEvent(7500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));

            var mockEvent: ISimEvent = new SimEvent(4500, skill, SimEventType.AnimationFinished);

            simulatorViewModel.events.splice(2, 0, mockEvent);

            var actual: number = 0;
            simulatorViewModel.events.forEach((value, index) => {
                if (value.timestamp === 4500) {
                    actual = index;
                }
            });

            assert.equal(actual, 2);

        });

        QUnit.test("determinePositionInSimEvents - Call the method 3 times with 1 animation event and 3 dot tick events preexisting in collection ", function (assert) {
            // Realistically, the animation event would never happen after 7 dot events, but this is just for testing purposes.
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var skill = simulatorViewModel.dragoon.TrueThrust;

            simulatorViewModel.events.push(new SimEvent(500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
            simulatorViewModel.events.push(new SimEvent(1500, simulatorViewModel.dragoon.TrueThrust, SimEventType.AnimationFinished));
            simulatorViewModel.events.push(new SimEvent(3500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
            simulatorViewModel.events.push(new SimEvent(9500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));

            var mockEvent5: ISimEvent = new SimEvent(6500, skill, SimEventType.AnimationFinished);
            var mockEvent6: ISimEvent = new SimEvent(12500, skill, SimEventType.AnimationFinished);
            var mockEvent7: ISimEvent = new SimEvent(15500, skill, SimEventType.AnimationFinished);

            var actual1 = simulatorViewModel.determinePositionInSimEvents(mockEvent5);
            simulatorViewModel.events.splice(3, 0, mockEvent5);

            var actual2 = simulatorViewModel.determinePositionInSimEvents(mockEvent6);
            simulatorViewModel.events.push(mockEvent6);

            var actual3 = simulatorViewModel.determinePositionInSimEvents(mockEvent7);
            simulatorViewModel.events.push(mockEvent7);

            assert.equal(actual1, 3);
            assert.equal(actual2, 5);
            assert.equal(actual3, 6);

        });

        QUnit.test("determinePositionInSimEvents - 4 DoT tick events in the list - add animation event at many different indexes ", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var skill = simulatorViewModel.dragoon.TrueThrust;

            simulatorViewModel.events.push(new SimEvent(500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
            simulatorViewModel.events.push(new SimEvent(3500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
            simulatorViewModel.events.push(new SimEvent(6500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));
            simulatorViewModel.events.push(new SimEvent(9500, simulatorViewModel.dragoon.Phlebotomize, SimEventType.DotTick));


            var actual1 = simulatorViewModel.determinePositionInSimEvents(new SimEvent(0, skill, SimEventType.AnimationFinished));
            var actual2 = simulatorViewModel.determinePositionInSimEvents(new SimEvent(200, skill, SimEventType.AnimationFinished));
            var actual3 = simulatorViewModel.determinePositionInSimEvents(new SimEvent(1300, skill, SimEventType.AnimationFinished));
            var actual4 = simulatorViewModel.determinePositionInSimEvents(new SimEvent(3500, skill, SimEventType.AnimationFinished));
            var actual5 = simulatorViewModel.determinePositionInSimEvents(new SimEvent(6000, skill, SimEventType.AnimationFinished));
            var actual6 = simulatorViewModel.determinePositionInSimEvents(new SimEvent(10000, skill, SimEventType.AnimationFinished));


            assert.equal(actual1, 0);
            assert.equal(actual2, 0);
            assert.equal(actual3, 1);
            assert.equal(actual4, 2);
            assert.equal(actual5, 2);
            assert.equal(actual6, 4);
        });

        // THIS NEEDS TO BE REVISED. I WAS TOLD THAT THERE IS A GLOBAL DOT TICK. TICKS DONT START AFTER ANIMATION ENDS
        //QUnit.test("DoTs start after animation finishes: phlebotomoze ", function (assert) {
        //    var simulatorViewModel: BaseSimulator = new BaseSimulator();
        //    var skill = simulatorViewModel.dragoon.Phlebotomize;
        //    simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Phlebotomize);

        //    simulatorViewModel.advanceTime(3000);

        //    assert.equal(simulatorViewModel.damageLog.length, 2);
        //    assert.equal(simulatorViewModel.damageLog[1].time, 4300);

        //    assert.equal(simulatorViewModel.events.length, 7);
        //    assert.equal(simulatorViewModel.events[0].timestamp, 4300 + 3000);
        //    assert.equal(simulatorViewModel.events[6].timestamp, 4300 + 21000);

        //});

        QUnit.test("Opening with: phlebotomoze ", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var skill = simulatorViewModel.dragoon.Phlebotomize;
            simulatorViewModel.events.push(new SimEvent(simulatorViewModel.time + skill.animationDuration, skill, SimEventType.AnimationFinished));

            var expectedSimEventType = SimEventType.AnimationFinished;

            assert.equal(simulatorViewModel.events[0].timestamp, 1300);
            assert.equal(simulatorViewModel.events[0].eventType, expectedSimEventType);
            assert.equal(simulatorViewModel.events.length, 1);
        });

        QUnit.test("Activate phlebotomize and true thrust", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var phlebotomize = simulatorViewModel.dragoon.Phlebotomize;
            var vorpalThrust = simulatorViewModel.dragoon.VorpalThrust;

            simulatorViewModel.activateSkill(phlebotomize);
            simulatorViewModel.activateSkill(vorpalThrust);

            assert.equal(simulatorViewModel.time, 3800);

            assert.equal(simulatorViewModel.events[0].timestamp, 5000);
            assert.equal(simulatorViewModel.events[1].timestamp, 6000);
            assert.equal(simulatorViewModel.events[2].timestamp, 9000);
            assert.equal(simulatorViewModel.events[3].timestamp, 12000);
            assert.equal(simulatorViewModel.events[4].timestamp, 15000);
            assert.equal(simulatorViewModel.events[5].timestamp, 18000);
            assert.equal(simulatorViewModel.events[6].timestamp, 21000);
            assert.equal(simulatorViewModel.events[7].timestamp, 24000);
            assert.equal(simulatorViewModel.events[8].timestamp, 25300);

            assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
            assert.equal(simulatorViewModel.events[1].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[2].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[3].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[4].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[5].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[6].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[7].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[8].eventType, SimEventType.DotEnd);
        });

        QUnit.test("Activate True Thrust, phlebotomize, and true thrust again ", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var phlebotomize = simulatorViewModel.dragoon.Phlebotomize;
            var vorpalThrust = simulatorViewModel.dragoon.VorpalThrust;

            simulatorViewModel.activateSkill(vorpalThrust);
            simulatorViewModel.activateSkill(phlebotomize);
            simulatorViewModel.activateSkill(vorpalThrust);

            assert.equal(simulatorViewModel.time, 6300);

            assert.equal(simulatorViewModel.events[0].timestamp, 7500);
            assert.equal(simulatorViewModel.events[1].timestamp, 9000);
            assert.equal(simulatorViewModel.events[2].timestamp, 12000);
            assert.equal(simulatorViewModel.events[3].timestamp, 15000);
            assert.equal(simulatorViewModel.events[4].timestamp, 18000);
            assert.equal(simulatorViewModel.events[5].timestamp, 21000);
            assert.equal(simulatorViewModel.events[6].timestamp, 24000);
            assert.equal(simulatorViewModel.events[7].timestamp, 27000);
            assert.equal(simulatorViewModel.events[8].timestamp, 27800);

            assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
            assert.equal(simulatorViewModel.events[1].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[2].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[3].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[4].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[5].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[6].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[7].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[8].eventType, SimEventType.DotEnd);
        });

        QUnit.test("Activate True Thrust, Vorpal Thrust, and Full Thrust", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var vorpalThrust = simulatorViewModel.dragoon.VorpalThrust;
            var fullThrust = simulatorViewModel.dragoon.FullThrust;

            simulatorViewModel.activateSkill(vorpalThrust);
            simulatorViewModel.activateSkill(vorpalThrust);
            simulatorViewModel.activateSkill(fullThrust);

            assert.equal(simulatorViewModel.time, 6300);

            assert.equal(simulatorViewModel.events[0].timestamp, 7500);

            assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
        });

        QUnit.test("Activate phlebotomize twice in a row", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var phlebotomize = simulatorViewModel.dragoon.Phlebotomize;

            simulatorViewModel.activateSkill(phlebotomize);

            assert.equal(simulatorViewModel.time, 1300);

            // Phlebotomize #1
            assert.equal(simulatorViewModel.events[0].timestamp, 2500);
            assert.equal(simulatorViewModel.events[1].timestamp, 3000);
            assert.equal(simulatorViewModel.events[2].timestamp, 6000);
            assert.equal(simulatorViewModel.events[3].timestamp, 9000);
            assert.equal(simulatorViewModel.events[4].timestamp, 12000);
            assert.equal(simulatorViewModel.events[5].timestamp, 15000);
            assert.equal(simulatorViewModel.events[6].timestamp, 18000);
            assert.equal(simulatorViewModel.events[7].timestamp, 21000);
            assert.equal(simulatorViewModel.events[8].timestamp, 24000);
            assert.equal(simulatorViewModel.events[9].timestamp, 25300);

            assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
            assert.equal(simulatorViewModel.events[1].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[2].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[3].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[4].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[5].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[6].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[7].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[8].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[9].eventType, SimEventType.DotEnd);

            // phlebotomize #2
            simulatorViewModel.activateSkill(phlebotomize);

            assert.equal(simulatorViewModel.time, 3800);

            assert.equal(simulatorViewModel.events[0].timestamp, 5000);
            assert.equal(simulatorViewModel.events[1].timestamp, 6000);
            assert.equal(simulatorViewModel.events[2].timestamp, 9000);
            assert.equal(simulatorViewModel.events[3].timestamp, 12000);
            assert.equal(simulatorViewModel.events[4].timestamp, 15000);
            assert.equal(simulatorViewModel.events[5].timestamp, 18000);
            assert.equal(simulatorViewModel.events[6].timestamp, 21000);
            assert.equal(simulatorViewModel.events[7].timestamp, 24000);
            assert.equal(simulatorViewModel.events[8].timestamp, 27000);
            assert.equal(simulatorViewModel.events[9].timestamp, 27800);

            assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
            assert.equal(simulatorViewModel.events[1].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[2].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[3].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[4].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[5].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[6].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[7].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[8].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[9].eventType, SimEventType.DotEnd);
        });

        QUnit.test("Creating all necessary events - phlebotomoze - 8 DoT ticks, 1 DoT end, 1 global cooldown", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var skill: ISkill = simulatorViewModel.dragoon.Phlebotomize;
            var phlebotomizeAnimationEndEvent = new SimEvent(skill.animationDuration, skill, SimEventType.AnimationFinished);
            simulatorViewModel.time = simulatorViewModel.dragoon.Phlebotomize.animationDuration;
            simulatorViewModel.events.push(phlebotomizeAnimationEndEvent);

            // This next call will destroy the animation event, and should create 10 events: 8 DoT ticks, 1 dot end, 1 global cooldown. 
            simulatorViewModel.processNextSimEvent();


            assert.equal(simulatorViewModel.events[0].timestamp, 2500);
            assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
            // Dot tick timestamps and event types
            assert.equal(simulatorViewModel.events[1].timestamp, 3000);
            assert.equal(simulatorViewModel.events[1].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[2].timestamp, 6000);
            assert.equal(simulatorViewModel.events[2].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[3].timestamp, 9000);
            assert.equal(simulatorViewModel.events[3].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[4].timestamp, 12000);
            assert.equal(simulatorViewModel.events[4].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[5].timestamp, 15000);
            assert.equal(simulatorViewModel.events[5].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[6].timestamp, 18000);
            assert.equal(simulatorViewModel.events[6].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[7].timestamp, 21000);
            assert.equal(simulatorViewModel.events[7].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[8].timestamp, 24000);
            assert.equal(simulatorViewModel.events[8].eventType, SimEventType.DotTick);

            // DoT end event timestamp
            assert.equal(simulatorViewModel.events[9].timestamp, 25300);
            assert.equal(simulatorViewModel.events[9].eventType, SimEventType.DotEnd);

            assert.equal(simulatorViewModel.events.length, 10);
        });

        QUnit.test("Calculating the next dot timestamp for multiple values", function (assert) {

            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var actual: number = 0;

            simulatorViewModel.time = 1200;
            actual = simulatorViewModel.calculateNextDotEventTimestamp();

            assert.equal(actual, 3000);

            simulatorViewModel.time = 2400;
            actual = simulatorViewModel.calculateNextDotEventTimestamp();

            assert.equal(actual, 3000);

            simulatorViewModel.time = 11000;
            actual = simulatorViewModel.calculateNextDotEventTimestamp();

            assert.equal(actual, 12000);

            simulatorViewModel.time = 31000;
            actual = simulatorViewModel.calculateNextDotEventTimestamp();

            assert.equal(actual, 33000);

            simulatorViewModel.time = 40000;
            actual = simulatorViewModel.calculateNextDotEventTimestamp();

            assert.equal(actual, 42000);

            simulatorViewModel.time = 44000;
            actual = simulatorViewModel.calculateNextDotEventTimestamp();

            assert.equal(actual, 45000);
        });

        QUnit.test("Opening with: Jump ", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var skill = simulatorViewModel.dragoon.Jump;

            simulatorViewModel.activateSkill(skill);

            assert.equal(simulatorViewModel.events[0].timestamp, 30000);
            assert.equal(simulatorViewModel.events[0].eventType, SimEventType.Cooldown);
            assert.equal(simulatorViewModel.events.length, 1);
        });

        QUnit.test("Cant activate Jump twice in a row ", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var skill = simulatorViewModel.dragoon.Jump;

            simulatorViewModel.activateSkill(skill);
            simulatorViewModel.activateSkill(skill);

            assert.equal(simulatorViewModel.events[0].timestamp, 30000);
            assert.equal(simulatorViewModel.events[0].eventType, SimEventType.Cooldown);
            assert.equal(simulatorViewModel.events.length, 1);
        });

        QUnit.test("Cant activate Jump twice in a row - advancing time 29 seconds", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var skill = simulatorViewModel.dragoon.Jump;

            simulatorViewModel.activateSkill(skill);
            simulatorViewModel.time = 29000;
            simulatorViewModel.activateSkill(skill);

            assert.equal(simulatorViewModel.events[0].timestamp, 30000);
            assert.equal(simulatorViewModel.events[0].eventType, SimEventType.Cooldown);
            assert.equal(simulatorViewModel.events.length, 1);
        });

        QUnit.test("Activate Jump, True Thrust", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var jump = simulatorViewModel.dragoon.Jump;
            var vorpalThrust = simulatorViewModel.dragoon.VorpalThrust;


            simulatorViewModel.activateSkill(jump);
            simulatorViewModel.activateSkill(vorpalThrust);

            assert.equal(simulatorViewModel.events[0].timestamp, 3800);
            assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
            assert.equal(simulatorViewModel.events[1].timestamp, 30000);
            assert.equal(simulatorViewModel.events[1].eventType, SimEventType.Cooldown);
            assert.equal(simulatorViewModel.events.length, 2);
        });

        QUnit.test("Activate Jump, True Thrust, then Jump again", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var jump = simulatorViewModel.dragoon.Jump;
            var vorpalThrust = simulatorViewModel.dragoon.VorpalThrust;

            simulatorViewModel.activateSkill(jump);
            simulatorViewModel.activateSkill(vorpalThrust);

            assert.equal(simulatorViewModel.events[0].timestamp, 3800);
            assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
            assert.equal(simulatorViewModel.events[1].timestamp, 30000);
            assert.equal(simulatorViewModel.events[1].eventType, SimEventType.Cooldown);
            assert.equal(simulatorViewModel.events.length, 2);
        });

        QUnit.test("Activate Jump, Phlebotomize", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var jump = simulatorViewModel.dragoon.Jump;
            var phlebotomize = simulatorViewModel.dragoon.Phlebotomize;

            simulatorViewModel.activateSkill(jump);
            simulatorViewModel.activateSkill(phlebotomize);

            assert.equal(simulatorViewModel.events[0].timestamp, 3000);
            assert.equal(simulatorViewModel.events[1].timestamp, 3800);
            assert.equal(simulatorViewModel.events[2].timestamp, 6000);
            assert.equal(simulatorViewModel.events[3].timestamp, 9000);
            assert.equal(simulatorViewModel.events[4].timestamp, 12000);
            assert.equal(simulatorViewModel.events[5].timestamp, 15000);
            assert.equal(simulatorViewModel.events[6].timestamp, 18000);
            assert.equal(simulatorViewModel.events[7].timestamp, 21000);
            assert.equal(simulatorViewModel.events[8].timestamp, 24000);
            assert.equal(simulatorViewModel.events[9].timestamp, 26600);
            assert.equal(simulatorViewModel.events[10].timestamp, 30000);

            assert.equal(simulatorViewModel.events[0].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[1].eventType, SimEventType.GlobalCooldown);
            assert.equal(simulatorViewModel.events[2].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[3].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[4].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[5].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[6].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[7].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[8].eventType, SimEventType.DotTick);
            assert.equal(simulatorViewModel.events[9].eventType, SimEventType.DotEnd);
            assert.equal(simulatorViewModel.events[10].eventType, SimEventType.Cooldown);

            assert.equal(simulatorViewModel.time, 2600);
            assert.equal(simulatorViewModel.events.length, 11);
        });

        QUnit.test("Test timing of GCD, ability, CGD - Activate True Thrust, Jump, True Thrust", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();

            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Jump);

            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);

            assert.equal(simulatorViewModel.events[0].timestamp, 5100);
            assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
            assert.equal(simulatorViewModel.events[1].timestamp, 31300);
            assert.equal(simulatorViewModel.events[1].eventType, SimEventType.Cooldown);
            assert.equal(simulatorViewModel.time, 3900);
            assert.equal(simulatorViewModel.events.length, 2);
        });

        QUnit.test("skillsOnCooldown contains jump after activating skill", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var jump = simulatorViewModel.dragoon.Jump;

            simulatorViewModel.activateSkill(jump);

            assert.equal(simulatorViewModel.skillsOnCooldown[0].name, "Jump");
            assert.equal(simulatorViewModel.skillsOnCooldown[0].endTime, 31300);
        });

        QUnit.test("skillsOnCooldown contains DragonFireDive after activating skill", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var dfd = simulatorViewModel.dragoon.DragonfireDive;

            simulatorViewModel.activateSkill(dfd);

            assert.equal(simulatorViewModel.skillsOnCooldown[0].name, "DragonfireDive");
            assert.equal(simulatorViewModel.skillsOnCooldown[0].endTime, 121300);
        });

        QUnit.test("skillsOnCooldown contains jump only once after activating skill twice", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var jump = simulatorViewModel.dragoon.Jump;

            simulatorViewModel.activateSkill(jump);
            simulatorViewModel.activateSkill(jump);

            assert.equal(simulatorViewModel.skillsOnCooldown[0].name, "Jump");
            assert.equal(simulatorViewModel.skillsOnCooldown[0].endTime, 31300);
            assert.equal(simulatorViewModel.skillsOnCooldown.length, 1);
        });

        QUnit.test("activeDots contains phlebotomize after activating skill", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var phlebotomize = simulatorViewModel.dragoon.Phlebotomize;

            simulatorViewModel.activateSkill(phlebotomize);

            assert.equal(simulatorViewModel.activeDots[0].skill.id, "Phlebotomize");
            assert.equal(simulatorViewModel.activeDots.length, 1);
        });

        QUnit.test("activeBuffs contains life surge after activating skill", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var lifeSurge = simulatorViewModel.dragoon.LifeSurge;

            simulatorViewModel.activateSkill(lifeSurge);

            assert.equal(simulatorViewModel.activeBuffs[0].skill.id, "LifeSurge");
            assert.equal(simulatorViewModel.activeBuffs.length, 1);
        });

        QUnit.test("skillsOnCooldown is empty after advancing time", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var jump = simulatorViewModel.dragoon.Jump;

            simulatorViewModel.activateSkill(jump);
            simulatorViewModel.advanceTime(500000);

            assert.equal(simulatorViewModel.skillsOnCooldown.length, 0);
        });

        QUnit.test("activeDots is empty after advancing time", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var phlebotomize = simulatorViewModel.dragoon.Phlebotomize;

            simulatorViewModel.activateSkill(phlebotomize);
            simulatorViewModel.advanceTime(500000);

            assert.equal(simulatorViewModel.activeDots.length, 0);
        });

        QUnit.test("activeBuffs is empty after advancing time", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            var lifeSurge = simulatorViewModel.dragoon.LifeSurge;

            simulatorViewModel.activateSkill(lifeSurge);
            simulatorViewModel.advanceTime(500000);

            assert.equal(simulatorViewModel.activeBuffs.length, 0);
        });

        //QUnit.test("activeSkills has 2 skills after advancing short time - phlebotomize, heavy thrust", function (assert) {
        //    var simulatorViewModel: BaseSimulator = new BaseSimulator();

        //    simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Phlebotomize);
        //    simulatorViewModel.activateSkill(simulatorViewModel.dragoon.HeavyThrust);

        //    simulatorViewModel.advanceTime(5000);

        //    assert.equal(simulatorViewModel.activeSkills.length, 2);
        //});

        //QUnit.test("activeSkills has 2 skills after advancing short time - jump, spineshatter dive", function (assert) {
        //    var simulatorViewModel: BaseSimulator = new BaseSimulator();

        //    simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Jump);
        //    simulatorViewModel.activateSkill(simulatorViewModel.dragoon.SpineshatterDive);

        //    simulatorViewModel.advanceTime(5000);

        //    assert.equal(simulatorViewModel.skillsOnCooldown.length, 2);
        //});

        QUnit.test("Testing damage: True Thrust", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);

            assert.equal(simulatorViewModel.damageLog.length, 1);
            assert.equal(simulatorViewModel.damageLog[0].totalDamage, 150);
        });

        QUnit.test("Testing damage: True Thrust x5", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);

            assert.equal(simulatorViewModel.damageLog.length, 5);
            assert.equal(simulatorViewModel.damageLog[0].totalDamage, 150);
            assert.equal(simulatorViewModel.damageLog[1].totalDamage, 150);
            assert.equal(simulatorViewModel.damageLog[2].totalDamage, 150);
            assert.equal(simulatorViewModel.damageLog[3].totalDamage, 150);
            assert.equal(simulatorViewModel.damageLog[4].totalDamage, 150);

            assert.equal(simulatorViewModel.totalPotency, 750);
        });

        QUnit.test("Testing damage: Phlebotomize", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Phlebotomize);
            simulatorViewModel.advanceTime(50000);

            assert.equal(simulatorViewModel.damageLog.length, 9);
            assert.equal(simulatorViewModel.damageLog[0].totalDamage, 170);
            assert.equal(simulatorViewModel.damageLog[1].totalDamage, 30);
            assert.equal(simulatorViewModel.damageLog[2].totalDamage, 30);
            assert.equal(simulatorViewModel.damageLog[3].totalDamage, 30);
            assert.equal(simulatorViewModel.damageLog[4].totalDamage, 30);
            assert.equal(simulatorViewModel.damageLog[5].totalDamage, 30);
            assert.equal(simulatorViewModel.damageLog[6].totalDamage, 30);
            assert.equal(simulatorViewModel.damageLog[7].totalDamage, 30);
            assert.equal(simulatorViewModel.damageLog[8].totalDamage, 30);

            assert.equal(simulatorViewModel.totalPotency, 410);
        });

        QUnit.test("Testing damage: Phlebotomize, true thrust", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Phlebotomize);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
            simulatorViewModel.advanceTime(50000);

            assert.equal(simulatorViewModel.damageLog.length, 10);
            assert.equal(simulatorViewModel.damageLog[0].totalDamage, 170);
            assert.equal(simulatorViewModel.damageLog[1].totalDamage, 30);
            assert.equal(simulatorViewModel.damageLog[2].totalDamage, 150);
            assert.equal(simulatorViewModel.damageLog[3].totalDamage, 30);
            assert.equal(simulatorViewModel.damageLog[4].totalDamage, 30);
            assert.equal(simulatorViewModel.damageLog[5].totalDamage, 30);
            assert.equal(simulatorViewModel.damageLog[6].totalDamage, 30);
            assert.equal(simulatorViewModel.damageLog[7].totalDamage, 30);
            assert.equal(simulatorViewModel.damageLog[8].totalDamage, 30);
            assert.equal(simulatorViewModel.damageLog[9].totalDamage, 30);


            assert.equal(simulatorViewModel.totalPotency, 560);
        });

        QUnit.test("Testing damage: true thrust, Phlebotomize", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Phlebotomize);
            simulatorViewModel.advanceTime(50000);

            assert.equal(simulatorViewModel.damageLog.length, 10);
            assert.equal(simulatorViewModel.damageLog[0].totalDamage, 150);
            assert.equal(simulatorViewModel.damageLog[1].totalDamage, 170);
            assert.equal(simulatorViewModel.damageLog[2].totalDamage, 30);
            assert.equal(simulatorViewModel.damageLog[3].totalDamage, 30);
            assert.equal(simulatorViewModel.damageLog[4].totalDamage, 30);
            assert.equal(simulatorViewModel.damageLog[5].totalDamage, 30);
            assert.equal(simulatorViewModel.damageLog[6].totalDamage, 30);
            assert.equal(simulatorViewModel.damageLog[7].totalDamage, 30);
            assert.equal(simulatorViewModel.damageLog[8].totalDamage, 30);
            assert.equal(simulatorViewModel.damageLog[9].totalDamage, 30);

            assert.equal(simulatorViewModel.totalPotency, 560);
        });

        QUnit.test("Testing damage: Phlebotomize, true thrust, jump", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Phlebotomize);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Jump);

            simulatorViewModel.advanceTime(50000);

            assert.equal(simulatorViewModel.damageLog.length, 11);

            assert.equal(simulatorViewModel.damageLog[0].totalDamage, 170);
            assert.equal(simulatorViewModel.damageLog[1].totalDamage, 30);
            assert.equal(simulatorViewModel.damageLog[2].totalDamage, 150);
            assert.equal(simulatorViewModel.damageLog[3].totalDamage, 200);
            assert.equal(simulatorViewModel.damageLog[4].totalDamage, 30);
            assert.equal(simulatorViewModel.damageLog[5].totalDamage, 30);
            assert.equal(simulatorViewModel.damageLog[6].totalDamage, 30);
            assert.equal(simulatorViewModel.damageLog[7].totalDamage, 30);
            assert.equal(simulatorViewModel.damageLog[8].totalDamage, 30);
            assert.equal(simulatorViewModel.damageLog[9].totalDamage, 30);
            assert.equal(simulatorViewModel.damageLog[10].totalDamage, 30);

            assert.equal(simulatorViewModel.totalPotency, 760);
        });

        QUnit.test("Testing buffed damage: blood for blood, true thrust", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.BloodForBlood);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);

            simulatorViewModel.advanceTime(50000);

            assert.equal(simulatorViewModel.damageLog.length, 1);

            assert.equal(simulatorViewModel.damageLog[0].totalDamage, 195);

            assert.equal(simulatorViewModel.totalPotency, 195);
        });

        QUnit.test("Testing buffed damage: blood for blood, phlebotomize", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.BloodForBlood);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Phlebotomize);

            simulatorViewModel.advanceTime(50000);

            assert.equal(simulatorViewModel.damageLog.length, 9);

            assert.equal(simulatorViewModel.damageLog[0].totalDamage, 221);
            assert.equal(simulatorViewModel.damageLog[1].totalDamage, 39);
            assert.equal(simulatorViewModel.damageLog[2].totalDamage, 39);
            assert.equal(simulatorViewModel.damageLog[3].totalDamage, 39);
            assert.equal(simulatorViewModel.damageLog[4].totalDamage, 39);
            assert.equal(simulatorViewModel.damageLog[5].totalDamage, 39);
            assert.equal(simulatorViewModel.damageLog[6].totalDamage, 39);
            assert.equal(simulatorViewModel.damageLog[7].totalDamage, 39);
            assert.equal(simulatorViewModel.damageLog[8].totalDamage, 39);

            assert.equal(simulatorViewModel.totalPotency, 533);
        });

        QUnit.test("Testing buffed damage (total only): blood for blood, phlebotomize, true thrust, jump, spineshatter dive, true thrust", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.BloodForBlood);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Phlebotomize);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Jump);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.SpineshatterDive);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);

            simulatorViewModel.advanceTime(50000);

            assert.equal(simulatorViewModel.damageLog.length, 13);

            assert.equal(simulatorViewModel.totalPotency, 1404);
        });

        QUnit.test("Testing buffed damage (total only): blood for blood, heavy thrust, true thrust, jump", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.BloodForBlood);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.HeavyThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Jump);

            simulatorViewModel.advanceTime(50000);

            assert.equal(simulatorViewModel.damageLog.length, 3);

            assert.equal(simulatorViewModel.totalPotency, 728.5);
        });

        QUnit.test("Testing damage after buff runs out: blood for blood, true thrust, (buff end) true thrust", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.BloodForBlood);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);

            simulatorViewModel.advanceTime(50000);

            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);


            assert.equal(simulatorViewModel.damageLog.length, 2);

            assert.equal(simulatorViewModel.totalPotency, 345);
        });

        QUnit.test("Testing damage after buff runs out, and buff activates again: blood for blood, true thrust, (buff end), (cooldown end), blood for blood true thrust", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.BloodForBlood);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);

            simulatorViewModel.advanceTime(500000);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.BloodForBlood);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);


            assert.equal(simulatorViewModel.damageLog.length, 2);

            assert.equal(simulatorViewModel.totalPotency, 390);
        });

        QUnit.test("Testing chain end event creation: True Thrust", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);

            assert.equal(simulatorViewModel.events.length, 2);

            assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
            assert.equal(simulatorViewModel.events[1].eventType, SimEventType.ChainEnd);

            assert.equal(simulatorViewModel.events[1].timestamp, 6300);
        });

        QUnit.test("Testing chain end event creation: True Thrust, Vorpal Thrust", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);

            assert.equal(simulatorViewModel.events.length, 2);

            assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
            assert.equal(simulatorViewModel.events[1].eventType, SimEventType.ChainEnd);

            assert.equal(simulatorViewModel.events[1].timestamp, 8800);
        });

        QUnit.test("Testing chain end event creation: True Thrust, Vorpal Thrust, Full Thrust", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.FullThrust);

            assert.equal(simulatorViewModel.events.length, 2);

            assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
            assert.equal(simulatorViewModel.events[1].eventType, SimEventType.ChainEnd);

            assert.equal(simulatorViewModel.events[1].timestamp, 11300);
        });

        QUnit.test("Testing breaking a chain does not continue chain: True Thrust, Full Thrust, Vorpal Thrust", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.FullThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);

            assert.equal(simulatorViewModel.events.length, 1);

            assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);

            assert.equal(simulatorViewModel.events[0].timestamp, 7500);
        });

        QUnit.test("Testing breaking and restarting a chain : True Thrust, Full Thrust, True Thrust, Vorpal Thrust", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.FullThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);

            assert.equal(simulatorViewModel.events.length, 2);

            assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
            assert.equal(simulatorViewModel.events[1].eventType, SimEventType.ChainEnd);

            assert.equal(simulatorViewModel.events[1].timestamp, 13800);
        });

        QUnit.test("Testing starting a chain twice: True Thrust, True Thrust", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);

            assert.equal(simulatorViewModel.events.length, 2);

            assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);
            assert.equal(simulatorViewModel.events[1].eventType, SimEventType.ChainEnd);

            assert.equal(simulatorViewModel.events[1].timestamp, 8800);
        });

        QUnit.test("Testing chain: True Thrust, Vorpal Thrust, Vorpal Thurst", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);

            assert.equal(simulatorViewModel.events.length, 1);

            assert.equal(simulatorViewModel.events[0].eventType, SimEventType.GlobalCooldown);

            assert.equal(simulatorViewModel.events[0].timestamp, 7500);
        });

        QUnit.test("Testing chain damage: True Thrust, Vorpal Thrust", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);

            assert.equal(simulatorViewModel.damageLog.length, 2);
            assert.equal(simulatorViewModel.damageLog[1].totalDamage, 200);
            assert.equal(simulatorViewModel.totalPotency, 350);
        });

        QUnit.test("Testing chain damage: True Thrust, Vorpal Thrust, Full Thrust", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.FullThrust);

            assert.equal(simulatorViewModel.damageLog.length, 3);
            assert.equal(simulatorViewModel.damageLog[2].totalDamage, 360);
            assert.equal(simulatorViewModel.totalPotency, 710);
        });

        QUnit.test("Testing chain damage (WITHOUT DOTS): Impulse Drive, Disembowel, Chaos Thrust", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.ImpulseDrive);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Disembowel);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.ChaosThrust);

            assert.equal(simulatorViewModel.damageLog.length, 3);
            assert.equal(simulatorViewModel.damageLog[2].totalDamage, 275);
            assert.equal(simulatorViewModel.totalPotency, 180 + 220 + 275);
        });

        QUnit.test("Testing chain damage (WITH DOTS): Impulse Drive, Disembowel, Chaos Thrust", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.ImpulseDrive);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Disembowel);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.ChaosThrust);

            simulatorViewModel.advanceTime(50000);

            assert.equal(simulatorViewModel.damageLog.length, 13);
            assert.equal(simulatorViewModel.totalPotency, 180 + 220 + 275 + 385);
        });

        QUnit.test("Testing buffed chain damage (WITH DOTS): Impulse Drive, Disembowel, Blood for Blood, Chaos Thrust", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.ImpulseDrive);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Disembowel);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.BloodForBlood);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.ChaosThrust);

            simulatorViewModel.advanceTime(50000);

            assert.equal(simulatorViewModel.damageLog.length, 13);
            assert.equal(simulatorViewModel.totalPotency, 180 + 220 + 250 + 25 + 75 + 350 + 35 + 105);
        });

        QUnit.test("Testing buffed chain damage (WITH DOTS):  Blood for Blood, Impulse Drive, Disembowel, Chaos Thrust", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.BloodForBlood);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.ImpulseDrive);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Disembowel);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.ChaosThrust);

            simulatorViewModel.advanceTime(50000);

            assert.equal(simulatorViewModel.damageLog.length, 13);
            assert.equal(simulatorViewModel.totalPotency, 180 + 54 + 220 + 66 + 250 + 25 + 75 + 350 + 35 + 105);
        });

        QUnit.test("Testing multiple buffs on chain damage: Blood for blood, Heavy Thrust, True Thrust, Vorpal Thrust, Full Thrust", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.BloodForBlood);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.HeavyThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.FullThrust);

            assert.equal(simulatorViewModel.damageLog.length, 4);
            assert.equal(simulatorViewModel.totalPotency, 170 + 51 + 150 + 67.5 + 200 + 90 + 360 + 162);
        });

        QUnit.test("Chaos Thrust should have no dots unless it followed chain", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.ChaosThrust);

            simulatorViewModel.advanceTime(50000);

            assert.equal(simulatorViewModel.damageLog.length, 1);
            assert.equal(simulatorViewModel.totalPotency, 150);
        });

        QUnit.test("Dots should not be created: Disembowel, Chaos Thrust", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Disembowel);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.ChaosThrust);

            simulatorViewModel.advanceTime(50000);

            assert.equal(simulatorViewModel.damageLog.length, 2);
            assert.equal(simulatorViewModel.totalPotency, 100 + 150);
        });

        QUnit.test("PPSLog: True Thrust x3", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);

            assert.equal(simulatorViewModel.ppsLog.length, 3);
            assert.equal(simulatorViewModel.ppsLog[0].pps, 115.38);
            assert.equal(simulatorViewModel.ppsLog[0].time, 1300);
            assert.equal(simulatorViewModel.ppsLog[1].pps, 78.94);
            assert.equal(simulatorViewModel.ppsLog[1].time, 3800);
            assert.equal(simulatorViewModel.ppsLog[2].pps, 71.42);
            assert.equal(simulatorViewModel.ppsLog[2].time, 6300);
        });

        QUnit.test("PPSLog: True Thrust Combo", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.FullThrust);

            assert.equal(simulatorViewModel.ppsLog.length, 3);
            assert.equal(simulatorViewModel.ppsLog[0].pps, 115.38);
            assert.equal(simulatorViewModel.ppsLog[0].time, 1300);
            assert.equal(simulatorViewModel.ppsLog[1].pps, 92.10);
            assert.equal(simulatorViewModel.ppsLog[1].time, 3800);
            assert.equal(simulatorViewModel.ppsLog[2].pps, 112.69);
            assert.equal(simulatorViewModel.ppsLog[2].time, 6300);
        });

        // THIS IS ODD BECAUSE OF THE GLOBAL DOT TICKS
        QUnit.test("PPSLog: Phlebotomize full dot", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Phlebotomize);
            simulatorViewModel.advanceTime(25300);

            assert.equal(simulatorViewModel.ppsLog.length, 9);
            assert.equal(simulatorViewModel.ppsLog[0].pps, 130.76);
            assert.equal(simulatorViewModel.ppsLog[0].time, 1300);
            assert.equal(simulatorViewModel.ppsLog[8].pps, 17.08);
            assert.equal(simulatorViewModel.ppsLog[8].time, 24000);
        });

        // THIS IS ODD BECAUSE OF THE GLOBAL DOT TICKS
        QUnit.test("PPSLog: Phlebotomize, True Thrust x2", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Phlebotomize);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);

            assert.equal(simulatorViewModel.ppsLog.length, 5);
            assert.equal(simulatorViewModel.ppsLog[0].pps, 130.76);
            assert.equal(simulatorViewModel.ppsLog[0].time, 1300);
            assert.equal(simulatorViewModel.ppsLog[2].pps, 92.10);
            assert.equal(simulatorViewModel.ppsLog[2].time, 3800);
            assert.equal(simulatorViewModel.ppsLog[4].pps, 84.12);
            assert.equal(simulatorViewModel.ppsLog[4].time, 6300);
        });

        // START - Reset tests
        QUnit.test("Reset - PPSLog: True Thrust x3", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.FullThrust);

            simulatorViewModel.reset();

            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);

            assert.equal(simulatorViewModel.ppsLog.length, 3);
            assert.equal(simulatorViewModel.ppsLog[0].pps, 115.38);
            assert.equal(simulatorViewModel.ppsLog[0].time, 1300);
            assert.equal(simulatorViewModel.ppsLog[1].pps, 78.94);
            assert.equal(simulatorViewModel.ppsLog[1].time, 3800);
            assert.equal(simulatorViewModel.ppsLog[2].pps, 71.42);
            assert.equal(simulatorViewModel.ppsLog[2].time, 6300);
        });
        // END - Reset tests

        QUnit.test("Bug where CT dot damage happens WAY in the future", function (assert) {
            var simulatorViewModel: BaseSimulator = new BaseSimulator();
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.VorpalThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.FullThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.ImpulseDrive);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.Disembowel);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.ChaosThrust);
            simulatorViewModel.activateSkill(simulatorViewModel.dragoon.TrueThrust);

            // True Thrust Combo
            assert.equal(simulatorViewModel.ppsLog[0].pps, 115.38);
            assert.equal(simulatorViewModel.ppsLog[0].time, 1300);
            assert.equal(simulatorViewModel.ppsLog[1].pps, 92.10);
            assert.equal(simulatorViewModel.ppsLog[1].time, 3800);
            assert.equal(simulatorViewModel.ppsLog[2].pps, 112.69);
            assert.equal(simulatorViewModel.ppsLog[2].time, 6300);

            assert.equal(simulatorViewModel.ppsLog[3].pps, 101.13);
            assert.equal(simulatorViewModel.ppsLog[3].time, 8800);
            assert.equal(simulatorViewModel.ppsLog[4].pps, 98.23);
            assert.equal(simulatorViewModel.ppsLog[4].time, 11300);
            assert.equal(simulatorViewModel.ppsLog[5].pps, 100.36);
            assert.equal(simulatorViewModel.ppsLog[5].time, 13800);


            assert.equal(simulatorViewModel.ppsLog[6].pps, 94.9); 
            assert.equal(simulatorViewModel.ppsLog[6].time, 15000);

            assert.equal(simulatorViewModel.ppsLog[7].pps, 97.45); 
            assert.equal(simulatorViewModel.ppsLog[7].time, 16300);
        });
    }
}

// write unit tests for import and export features. 