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

export const baseLineChartLabels = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00'
];