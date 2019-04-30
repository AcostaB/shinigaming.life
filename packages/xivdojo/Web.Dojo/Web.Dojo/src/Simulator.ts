import { PPSChart } from './PPSChart';
import { DragoonSimulator } from './DragoonSimulator';
import { BindingEngine, inject } from 'aurelia-framework';

@inject(BindingEngine)
export class Simulator {
    ppsChart: PPSChart = window['ppsChart'] = new PPSChart();
    dragoonSimulator: DragoonSimulator = window['dragoonSimulator'] = new DragoonSimulator();
    currentRotationIndex: number = -1;
    chartData: Array<Chartist.IChartistXYSeriesData> = [];

    bindingEngine: BindingEngine;

    constructor(bindingEngine) {
        window['simulator'] = this;

        this.startNewRotation();

        this.bindingEngine = bindingEngine;
        let subscription = this.bindingEngine
            .collectionObserver(this.dragoonSimulator.ppsLog)
            .subscribe(this.ppsLogSubscriptionCallback);
    }

    startNewRotation() {
        if (this.currentRotationIndex == -1 || this.dragoonSimulator.ppsLog.length > 0) {
            this.currentRotationIndex++;
            this.dragoonSimulator.reset();
            console.log("new rotation");
        }
    }

    ppsLogSubscriptionCallback(splices) {
        // REALLY NEED TO ADDRESS THIS. HOW DO I GET REFERENCE TO VIEWMODEL INSIDE THE CALLBACK?
        var vm: Simulator = window['simulator'];

        vm.chartData[vm.currentRotationIndex] = vm.updateRotationSeries(vm.dragoonSimulator.ppsLog);
        
        vm.updateChart();
    }; 

    updateChart() {
        this.ppsChart.updateData(this.chartData);
    };

    updateRotationSeries(ppsLog: Array<IPPSEntry>): Chartist.IChartistXYSeriesData {
        var seriesObject: Chartist.IChartistXYSeriesData = { name: 'series-' + this.currentRotationIndex, data: [] };
        ppsLog.forEach((item, index) => {
            seriesObject.data.push({x: item.time, y: item.pps});
        });

        return seriesObject;
    }
}