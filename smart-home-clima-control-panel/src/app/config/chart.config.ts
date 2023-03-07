/**
 * Config file for temperature chart
 * 
 */
export const chartDatasetsTemperature = {
    data: [] = [],
    label: 'Temperature',
    borderColor: '#c94939',
    tension: 0.3,
    pointStyle: 'circle',
    pointRadius: 5,
    pointHoverRadius: 8
};

export const chartDatasetsMotion = {
    data: [] = [],
    label: 'Motion',
    borderColor: '#2b84e9',
    tension: 0.5,
    pointStyle: 'circle',
    pointRadius: 5,
    pointHoverRadius: 8,
    stepped: true,
    spanGaps: true
};

export const chartDatasetsPower = {
    data: [] = [],
    label: 'Power',
    borderColor: '#268139',
    backgroundColor: '#56e674',
    pointBackgroundColor: '#56e674',
    pointBorderColor: '#268139',
    tension: 0.5,
    fill: false,
    pointStyle: 'circle',
    pointRadius: 5,
    pointHoverRadius: 8,
    stepped: true,
    spanGaps: true
};
