

/// <reference path="../scripts/typings/chartist/index.d.ts" />

export class PPSChart {
    data: Chartist.IChartistData = {
        labels: [1, 2, 3],
        series: [[4, 5, 6]]
    };

    chart: Chartist.IChartistLineChart;

    constructor() {
        this.loadGraph();
    } 

    loadGraph() {
        var element: any = $(".ct-chart");
        setTimeout(() => {
            if (element.length > 0) {
                this.chart = new Chartist.Line('.ct-chart', {
                    series: [
                        {
                            name: 'series-1',
                            data: [
                                { x: 1000, y: 100 }
                            ]
                        }
                    ]
                }, {
                    axisX: {
                        type: Chartist.FixedScaleAxis,
                        divisor: 5,
                        labelInterpolationFnc: function (value) {
                            var minutes: number = Math.floor(value / 60000);
                            var seconds: number = (value % 60000) / 1000;
                            if (minutes > 0) {
                                return minutes + "m " + seconds + "s";
                            }
                            return seconds + "s";
                        }
                    }
                });
            } else {
                this.loadGraph();
            }
        }, 1000);         
    }

    updateData(seriesData: Array<Chartist.IChartistXYSeriesData>) {
        this.chart.update({ series: seriesData });
    };
}