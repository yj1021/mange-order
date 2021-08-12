export const commonOption = {
    title: '',
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
    legend: {
        show: true,
    },
    xAxis: {
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        data: []
    },
    tooltip: {
        trigger: 'item'
    },
    yAxis: {
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        }
    },
    series: []
}

export const pieOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: { 
            type: 'shadow'
        }
    },
}

export const lineOption = {
    tooltip: {
        trigger: 'item'
    },
}

export const barOption = {
    tooltip: {
        trigger: 'item'
    },
}