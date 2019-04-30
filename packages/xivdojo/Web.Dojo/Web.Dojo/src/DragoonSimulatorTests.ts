import { DragoonSimulator } from './DragoonSimulator';

export class DragoonSimulatorTests {
    constructor() {
        //#region DRAGOON SPECIFIC LOGIC
        QUnit.test("Buff drops after single use: Life Surge", function (assert) {
            var dragoonSimulator: DragoonSimulator = new DragoonSimulator();
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.LifeSurge);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.TrueThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.TrueThrust);

            assert.equal(dragoonSimulator.damageLog.length, 2);
            assert.equal(dragoonSimulator.totalPotency, 150 + 75 + 150);
        });

        QUnit.test("Life Surge only works on weaponskills: Jump", function (assert) {
            var dragoonSimulator: DragoonSimulator = new DragoonSimulator();
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.LifeSurge);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.Jump);

            assert.equal(dragoonSimulator.damageLog.length, 1);
            assert.equal(dragoonSimulator.totalPotency, 200);
        });

        QUnit.test("Life Surge only works on weaponskills: Leg Sweep, True Thrust", function (assert) {
            var dragoonSimulator: DragoonSimulator = new DragoonSimulator();
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.LifeSurge);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.LegSweep);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.TrueThrust);

            assert.equal(dragoonSimulator.damageLog.length, 2);
            assert.equal(dragoonSimulator.totalPotency, 130 + 150 + 75);
        });

        QUnit.test("Life Surge doesnt drop from activeBuffs array when using abilities", function (assert) {
            var dragoonSimulator: DragoonSimulator = new DragoonSimulator();
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.LifeSurge);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.Jump);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.SpineshatterDive);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.DragonfireDive);

            assert.equal(dragoonSimulator.activeBuffs[0].skill.id, "LifeSurge");
        });

        QUnit.test("Power Surge works on: Jump", function (assert) {
            var dragoonSimulator: DragoonSimulator = new DragoonSimulator();
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.PowerSurge);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.Jump);

            assert.equal(dragoonSimulator.damageLog.length, 1);
            assert.equal(dragoonSimulator.totalPotency, 200 + 100);
        });

        QUnit.test("Power Surge works on: Spineshatter Dive", function (assert) {
            var dragoonSimulator: DragoonSimulator = new DragoonSimulator();
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.PowerSurge);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.SpineshatterDive);

            assert.equal(dragoonSimulator.damageLog.length, 1);
            assert.equal(dragoonSimulator.totalPotency, 170 + 85);
        });

        QUnit.test("Buff drops after single use: Power Surge", function (assert) {
            var dragoonSimulator: DragoonSimulator = new DragoonSimulator();
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.PowerSurge);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.Jump);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.SpineshatterDive);

            assert.equal(dragoonSimulator.damageLog.length, 2);
            assert.equal(dragoonSimulator.totalPotency, 200 + 100 + 170);
        });

        QUnit.test("Power Surge doesnt work on anything other than jump/spineshatter dive", function (assert) {
            var dragoonSimulator: DragoonSimulator = new DragoonSimulator();
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.PowerSurge);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.TrueThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.VorpalThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FullThrust);


            assert.equal(dragoonSimulator.damageLog.length, 3);
            assert.equal(dragoonSimulator.totalPotency, 150 + 200 + 360);
        });

        QUnit.test("Power Surge doesnt drop from activeBuffs array when using weaponskills", function (assert) {
            var dragoonSimulator: DragoonSimulator = new DragoonSimulator();
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.PowerSurge);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.TrueThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.VorpalThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FullThrust);

            assert.equal(dragoonSimulator.activeBuffs[0].skill.id, "PowerSurge");
        });

        QUnit.test("Fang and claw doesnt activate without the blood of dragon buff", function (assert) {
            var dragoonSimulator: DragoonSimulator = new DragoonSimulator();
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FangAndClaw);

            assert.equal(dragoonSimulator.activeBuffs.length, 0);
            assert.equal(dragoonSimulator.time, 0);
            assert.equal(dragoonSimulator.damageLog.length, 0);
        });

        QUnit.test("Wheeling Thrust doesnt activate without the blood of dragon buff", function (assert) {
            var dragoonSimulator: DragoonSimulator = new DragoonSimulator();
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.WheelingThrust);

            assert.equal(dragoonSimulator.activeBuffs.length, 0);
            assert.equal(dragoonSimulator.time, 0);
            assert.equal(dragoonSimulator.damageLog.length, 0);
        });

        QUnit.test("Fang and claw doesnt activate without the correct chain", function (assert) {
            var dragoonSimulator: DragoonSimulator = new DragoonSimulator();
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FangAndClaw);

            assert.equal(dragoonSimulator.activeBuffs.length, 0);
            assert.equal(dragoonSimulator.time, 0);
            assert.equal(dragoonSimulator.damageLog.length, 0);
        });

        QUnit.test("Wheeling Thrust doesnt activate without the correct chain", function (assert) {
            var dragoonSimulator: DragoonSimulator = new DragoonSimulator();
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.WheelingThrust);

            assert.equal(dragoonSimulator.activeBuffs.length, 0);
            assert.equal(dragoonSimulator.time, 0);
            assert.equal(dragoonSimulator.damageLog.length, 0);
        });

        QUnit.test("Fang and claw doesnt activates on proper chain without buff", function (assert) {
            var dragoonSimulator: DragoonSimulator = new DragoonSimulator();
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.TrueThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.VorpalThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FullThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FangAndClaw);

            assert.equal(dragoonSimulator.activeBuffs.length, 0);
            assert.equal(dragoonSimulator.time, 6300);
            assert.equal(dragoonSimulator.damageLog.length, 3);
        });

        QUnit.test("Wheeling Thrust doesnt activates on proper chain without buff", function (assert) {
            var dragoonSimulator: DragoonSimulator = new DragoonSimulator();
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.TrueThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.VorpalThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FullThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.WheelingThrust);

            assert.equal(dragoonSimulator.activeBuffs.length, 0);
            assert.equal(dragoonSimulator.time, 6300);
            assert.equal(dragoonSimulator.damageLog.length, 3);
        });

        QUnit.test("Fang and claw doesnt activate without proper chain with buff", function (assert) {
            var dragoonSimulator: DragoonSimulator = new DragoonSimulator();
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.BloodOfTheDragon);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FangAndClaw);

            assert.equal(dragoonSimulator.activeBuffs.length, 1);
            assert.equal(dragoonSimulator.time, 1300);
            assert.equal(dragoonSimulator.damageLog.length, 0);
        });

        QUnit.test("wheeling thrust doesnt activate without proper chain with buff", function (assert) {
            var dragoonSimulator: DragoonSimulator = new DragoonSimulator();
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.BloodOfTheDragon);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.WheelingThrust);

            assert.equal(dragoonSimulator.activeBuffs.length, 1);
            assert.equal(dragoonSimulator.time, 1300);
            assert.equal(dragoonSimulator.damageLog.length, 0);
        });

        QUnit.test("Fang and claw activates on proper chain and buff", function (assert) {
            var dragoonSimulator: DragoonSimulator = new DragoonSimulator();
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.TrueThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.VorpalThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FullThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.BloodOfTheDragon);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FangAndClaw);

            assert.equal(dragoonSimulator.activeBuffs.length, 1);
            assert.equal(dragoonSimulator.time, 8900);
            assert.equal(dragoonSimulator.damageLog.length, 4);
        });

        QUnit.test("Wheeling Thrust activates on proper chain and buff", function (assert) {
            var dragoonSimulator: DragoonSimulator = new DragoonSimulator();
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.TrueThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.VorpalThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FullThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.BloodOfTheDragon);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.WheelingThrust);

            assert.equal(dragoonSimulator.activeBuffs.length, 1);
            assert.equal(dragoonSimulator.time, 8900);
            assert.equal(dragoonSimulator.damageLog.length, 4);
        });

        QUnit.test("Damage calculation: fang and claw", function (assert) {
            var dragoonSimulator: DragoonSimulator = new DragoonSimulator();
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.TrueThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.VorpalThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FullThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.BloodOfTheDragon);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FangAndClaw);

            assert.equal(dragoonSimulator.damageLog[3].totalDamage, 290);
        });

        QUnit.test("Damage calculation: wheeling thrust", function (assert) {
            var dragoonSimulator: DragoonSimulator = new DragoonSimulator();
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.TrueThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.VorpalThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FullThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.BloodOfTheDragon);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.WheelingThrust);

            assert.equal(dragoonSimulator.damageLog[3].totalDamage, 290);
        });

        QUnit.test("Damage calculation: fang and claw chain with buff at beginning", function (assert) {
            var dragoonSimulator: DragoonSimulator = new DragoonSimulator();
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.BloodOfTheDragon);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.TrueThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.VorpalThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FullThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FangAndClaw);

            assert.equal(dragoonSimulator.totalPotency, 150 + 200 + 360 + 290);
        });

        QUnit.test("Damage calculation: wheeling thrust chain with buff at beginning", function (assert) {
            var dragoonSimulator: DragoonSimulator = new DragoonSimulator();
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.BloodOfTheDragon);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.TrueThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.VorpalThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FullThrust);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.WheelingThrust);

            assert.equal(dragoonSimulator.totalPotency, 150 + 200 + 360 + 290);
        });

        QUnit.test("Damage calculation: blood of the dragon + jump", function (assert) {
            var dragoonSimulator: DragoonSimulator = new DragoonSimulator();
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.BloodOfTheDragon);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.Jump);

            assert.equal(dragoonSimulator.totalPotency, 200 + 60);
        });

        QUnit.test("Damage calculation: blood of the dragon + spineshatter", function (assert) {
            var dragoonSimulator: DragoonSimulator = new DragoonSimulator();
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.BloodOfTheDragon);
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.SpineshatterDive);

            assert.equal(dragoonSimulator.totalPotency, 170 + 51);
        });

        QUnit.test("BotD time increase when less then 15 seconds - Wheeling Thrust", function (assert) {
            var dragoonSimulator: DragoonSimulator = new DragoonSimulator();
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.TrueThrust); //1300
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.VorpalThrust); //3800
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.BloodOfTheDragon); //5100 - buff 15000 : 20100
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.FullThrust); //6400 - buff 12500 : 18900
            dragoonSimulator.activateSkill(dragoonSimulator.dragoon.WheelingThrust); // 8900  - buff 10000 + 15000 : 33900

            var actual = dragoonSimulator.activeBuffs[0].skill.id;
            var actual2 = dragoonSimulator.time;
            var actual3 = dragoonSimulator.activeBuffs[0].endTime;

            assert.equal(actual, "BloodOfTheDragon");
            assert.equal(actual2, 8900);
            assert.equal(actual3, 33900);
        });
    }
}

// test what happens when WT activates and BotD has dropped. 

// write unit test about buff end time relative to skill being used. it should start after animation has finished.

// geirskogul didnt lower the timer by the correct amount.

// im not sure the buff end event was being updated correctly when using WT. need to test against this. 