<template>
<div>
    <div class="progress">
        <!-- CPU -->
    <el-card shadow="never" style="background-color: rgb(103, 194, 58);" class="progress-item">
           <el-progress type="dashboard" :percentage="10" color="rgb(245, 108, 108)"></el-progress>
           <el-tag type="success">CPU使用率</el-tag>
    </el-card>
    <!-- 内存 -->
      <el-card shadow="never" style="background-color: rgb(230, 162, 60);" class="progress-item">
            <el-progress type="dashboard" :percentage="25" color="rgb(230, 162, 60)"></el-progress>
            <el-tag type="success">内存使用率</el-tag>
    </el-card>
    <!-- 虚拟机 -->
      <el-card shadow="never" style="background-color: rgb(245, 108, 108);" class="progress-item">
            <el-progress type="dashboard" :percentage="80"></el-progress>
            <el-tag type="success">虚拟机使用率</el-tag>
    </el-card>
    <!-- 硬盘 -->
      <el-card shadow="never" style="background-color: rgb(144, 147, 153);" class="progress-item">
            <el-progress type="dashboard" :percentage="15" color="rgb(245, 108, 108)"></el-progress>
            <el-tag type="success">磁盘使用率</el-tag>
    </el-card>
    
    </div>
    <div id="main" style="width: 100%;height:500px;margin-top:30px;"></div>
   </div>
</template>

<script>
export default {


  mounted() {
    this.drow();
  },
  methods: {
    drow() {
      var echarts = require("echarts");

      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));
setTimeout(function () {
        var option = {
        legend: {},
        tooltip: {
            trigger: 'axis',
            showContent: false
        },
        dataset: {
            source: [
                ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
                ['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
                ['Milk Tea', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
                ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
                ['Walnut Brownie', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
            ]
        },
        xAxis: {type: 'category'},
        yAxis: {gridIndex: 0},
        grid: {top: '55%'},
        series: [
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {
                type: 'pie',
                id: 'pie',
                radius: '30%',
                center: ['50%', '25%'],
                label: {
                    formatter: '{b}: {@2012} ({d}%)'
                },
                encode: {
                    itemName: 'product',
                    value: '2012',
                    tooltip: '2012'
                }
            }
        ]
    };

    myChart.on('updateAxisPointer', function (event) {
        var xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1;
            myChart.setOption({
                series: {
                    id: 'pie',
                    label: {
                        formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                    },
                    encode: {
                        value: dimension,
                        tooltip: dimension
                    }
                }
            });
        }
    });

      // 绘制图表
      myChart.setOption(option);

});
    }
  }
};

</script>

<style lang="less">
.progress{
    display: flex;
    justify-content: space-between;
    padding:20px;
}
.progress-item{
    padding:0 30px;
}
.progress .el-card__body{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>