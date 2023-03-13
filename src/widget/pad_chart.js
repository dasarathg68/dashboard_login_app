import React, { useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import ChartComponent, { Chart } from 'react-chartjs-2';

PadChart.propTypes = {
    name: PropTypes.string.isRequired,
    onSelected: PropTypes.func, // (selected, index)
    refresh: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
}

const findActivityMax = (labels) => {
    let max = 0;
    labels.forEach((label) => {
        if (label.activity > max) {
            max = label.activity;
        }
    });
    if (max < 20) {
        max = 20;
    }
    return max;
};

const chartDisplay = chartName => {
    return chartName === 'activity' || chartName === 'weekPosture';

};

export default function PadChart(props) {

    const isWeb = useMediaQuery('(min-width: 768px)');
    const [init, setInit] = useState(false);
    const mChart = useRef(undefined);

    useEffect(() => {
        const helpers = Chart.helpers;
        Chart.defaults[`${props.name}Chart`] = {
            title: {
                display: false,
            },
            layout: {
                padding: {
                    top: 20,
                    left: 10,
                    right: 5,
                }
            },
            legend: {
                display: false,
            },
            hover: {
                mode: props.name === 'weekPosture' ? 'null' : 'label'
            },
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    type: 'category',
                    categoryPercentage: 1,
                    barPercentage: 1,
                    labels: isWeb ?
                        ['8', '10', '12', '14', '16', '18', '20', '22', '0', '2', '4', '6', '8'] :
                        ['8', '12', '16', '20', '0', '4', '8'],
                    gridLines: {
                        display: true,
                        drawBorder: true,
                        drawOnChartArea: false,
                        drawTicks: false,
                    },
                    ticks: {
                        padding: 5,
                        fontColor: '#00000050',
                    }
                }],
                yAxes: [{
                    type: 'linear',
                    gridLines: {
                        display: chartDisplay(props.name),
                        drawBorder: true,
                        drawOnChartArea: false,
                    },
                    ticks: {
                        display: chartDisplay(props.name),
                        fontColor: '#00000050',
                        callback: function (value, index) {
                            if (index === 0) {
                                if (props.name === 'weekPosture') return 100;
                                return value + '%';
                            }
                            else return '';
                        }
                    }
                }]
            },
            tooltips: {
                enabled: false,
                custom: function (tooltipModel) {
                    console.log(tooltipModel);
                    console.log(props.onSelected);
                    if (props.onSelected === undefined) return;
                    if (tooltipModel.hasOwnProperty('dataPoints') && tooltipModel.dataPoints.length > 0) {
                        props.onSelected(true, tooltipModel.dataPoints[0].index);
                    } else {
                        props.onSelected(false, -1);
                    }
                }
            }
        };
        if (props.name === 'activity') {
            Chart.defaults[`${props.name}Chart`]['scales']['yAxes'][0]['ticks']['max'] = findActivityMax(props.data.labels);
        } else if (props.max !== undefined) {
            Chart.defaults[`${props.name}Chart`]['scales']['yAxes'][0]['ticks']['max'] = props.max;
        }
        if (props.min !== undefined) {
            Chart.defaults[`${props.name}Chart`]['scales']['yAxes'][0]['ticks']['min'] = props.min;
        }

        Chart.controllers[`${props.name}Chart`] = Chart.controllers.bar.extend({
            /**
             * @private
             */
            getRuler: function () {
                const me = this;
                console.log(me);
                const scale = me._getIndexScale();
                const options = scale.options;
                const stackCount = me.getStackCount();
                const fullSize = scale.isHorizontal() ? scale.width : scale.height;
                const tickSize = fullSize / scale.ticks.length;
                const categorySize = tickSize * options.categoryPercentage;
                const fullBarSize = categorySize / stackCount;
                let barSize = fullBarSize * options.barPercentage;

                barSize = Math.min(
                    helpers.getValueOrDefault(options.barThickness, barSize),
                    helpers.getValueOrDefault(options.maxBarThickness, Infinity));

                return {
                    fullSize: fullSize,
                    stackCount: stackCount,
                    tickSize: tickSize,
                    categorySize: categorySize,
                    categorySpacing: tickSize - categorySize,
                    fullBarSize: fullBarSize,
                    barSize: barSize,
                    barSpacing: fullBarSize - barSize,
                    scale: scale
                };
            },


            /**
             * @private
             */
            calculateBarIndexPixels: function (datasetIndex, index, ruler) {
                const me = this;
                const scale = ruler.scale;
                const isCombo = me.chart.isCombo;
                const stackIndex = me.getStackIndex(datasetIndex);
                let base = scale.getPixelForValue(null, index, datasetIndex, isCombo);
                let size = ruler.barSize;

                const dataset = me.chart.data.datasets[datasetIndex];
                if (dataset.weights) {
                    const total = dataset.weights.reduce((m, x) => m + x, 0);
                    // create by Hui-yuan
                    const widens = props.name === 'weekPosture' ? 0.1 : 0;
                    const perc = (dataset.weights[index] + widens) / total;
                    let offset = 0;
                    for (let i = 0; i < index; i++) {
                        offset += dataset.weights[i] / total;
                    }
                    // var pixelOffset = Math.round(ruler.fullSize * offset);
                    const pixelOffset = ruler.fullSize * offset;
                    base = scale.isHorizontal() ? scale.left : scale.top;
                    base += pixelOffset;

                    // size = Math.round(ruler.fullSize * perc);
                    size = ruler.fullSize * perc;
                    size -= ruler.categorySpacing;
                    size -= ruler.barSpacing;
                }

                base -= isCombo ? ruler.tickSize / 2 : 0;
                base += ruler.fullBarSize * stackIndex;
                base += ruler.categorySpacing / 2;
                base += ruler.barSpacing / 2;

                return {
                    size: size,
                    base: base,
                    head: base + size,
                    center: base + size / 2
                };
            },
        });
        setInit(true);
        return () => {
            setInit(false);
        }
    }, []);

    return (!init ? null :
        <ChartComponent
            {...props}
            ref={mChart}
            type={`${props.name}Chart`}
            plugins={[
                {
                    beforeDraw: function (chart) {
                        const ctx = chart.chart.ctx;
                        const chartArea = chart.chartArea;

                        ctx.save();

                        const width = chartArea.right - chartArea.left;
                        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                        ctx.fillRect(chartArea.left + width / 2, 0, width / 2, chartArea.bottom);
                        ctx.restore();
                    }
                }
            ]} />
    );
}