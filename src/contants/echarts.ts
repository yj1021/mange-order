export const commonOption = {
    title: {
        text: '标题',
        // textAlign: 'center',
        textStyle: {
            color: '#f63'
        },
        top: 10
    },
    grid: {
        left: 20,
        right: 20,
        bottom: 20,
        containLabel: true
    },
    color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
    legend: {
        show: true,
        right: 20,
        top: 10
    },
    xAxis: {
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisPointer: { 
            type: 'shadow'
        },
        data: []
    },
    tooltip: {},
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

export const barOption = {
    tooltip: {
        trigger: 'axis'
    },
}

export const lineOption = {
    tooltip: {
        trigger: 'axis'
    },
}

export const pieOption = {
    tooltip: {
        trigger: 'item'
    },
}

export const initEchartsData = {
    options: {},
    configs: {
        noData: false
    }
}