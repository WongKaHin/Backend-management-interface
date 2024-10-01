import React, {useEffect, useRef} from "react";
import * as echarts from 'echarts';

const axisOption = {
    textStyle: {
        color:"#333",
    },
    tooltip: {
        trigger: "axis",
    },
    xAxis: {
        type: "category",
        data:[],
        axisLine: {
            lineStyle: {
                color: "#17b3a3",
            },
        },
        axisLabel: {
            interval: 0,
            color: "#333",
        },
    },
    yAxis:[
        {
            type: "value",
            axisLine: {
                lineStyle: {
                    color: "#17b3a3",
                },
            },
        },
    ],
    color:["#2ec7c9","#b6a2de","#5ablef","#ffb988","#d87a80","#8d98b3"],
    series: [],
}

const normalOption = {
    tooltip: {
        trigger: "item",
    },
    color: [
        "#0f78f4",
        "#dd546b",
        "#9426e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
    ],
    series: [],
}

const Echarts = ({ style, chartData, isAxisChart = true }) => {
    //獲取dom實例
    const echartRef = useRef()
    let  echartObj = useRef(null)
    useEffect(() => {
        let options
        echartObj.current = echarts.init(echartRef.current)
        //設置option
        if (isAxisChart) {
            axisOption.xAxis.data = chartData.xData
            axisOption.series = chartData.series
            options = axisOption
        } else {
            normalOption.series = chartData.series
            options = normalOption
        }
        echartObj.current.setOption(options)
    }, [chartData])
    return (
        <div style={style} ref={echartRef}></div>
    )
}

export default Echarts