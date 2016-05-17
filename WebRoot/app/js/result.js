
(function (Tool, Router, ChartDatas) {

    /*------------------------------------------
                    生成图表
     ------------------------------------------*/
    var basePath = window.location.origin + window.location.pathname
	;
    
    var aprioriData = ChartDatas.getSeries('apriori'),
    	fpgrowthData = ChartDatas.getSeries('fpgrowth'),
    	eclatData = ChartDatas.getSeries('eclat')
    ;

    /*------------------------------------------
                    总表
     ------------------------------------------*/
    // 都一样的配置
    var compareCfg = {
        chart: {
            type: 'bar'
        },
        credits: {
            enabled: false  // 隐藏公司名称
        },
        xAxis: {
        	categories: [ 'apriori', 'fpgrowth', 'eclat' ]
        },
        yAxis: {
        	min: 0,
            title: {
                text: 'time (ms)'
            },
            labels: {
                overflow: 'justify'
            }
        },
        plotOptions: {
        	series: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 150,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        tooltip: {
            formatter: function() {
                var point = this.point,
                    s = point.category + '算法, ' + point.series.name+ '数据集 : <b>共耗时'+ this.y +'ms</b><br/>';
                return s;
            }
        }
    };
    
    var chartCfg1 = $.extend({}, compareCfg, {
    	title: {
    		text: '3种算法在最小支持度为0.5下的比较'
    	},
    	series: ChartDatas.getSeriesAll(0.5)
    });
    
    var chart1 = $('#lineChart1').highcharts(chartCfg1).highcharts();
    
    
    var chartCfg2 = $.extend({}, compareCfg, {
    	title: {
    		text: '3种算法在最小支持度为0.45下的比较'
    	},
    	series: ChartDatas.getSeriesAll(0.45)
    });
    var chart2 = $('#lineChart2').highcharts(chartCfg2).highcharts();
    
    
    // 都一样的配置
    var algorithmCfg = {
		chart: {
            type: 'line'
        },
        yAxis: {
        	min: 0,
            title: {
                text: 'time (ms)'
            },
            labels: {
                overflow: 'justify'
            }
        },
        credits: {
            enabled: false  // 隐藏公司名称
        },
    	legend: {
    		layout: 'vertical',
    		floating: true,
    		align: 'right',
    		verticalAlign: 'top',
    		y: 32,
    		x: 32
    	},
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '数据集</b><br/>' +
                    '支持度:' + this.x + ': 耗时' + this.y + 'ms';
            }
        }
    };
    
    /*------------------------------------------
                    apriroi表
     ------------------------------------------*/
    // aprioriChart 配置
    var aprioriChartCfg = $.extend({}, algorithmCfg, {
    	xAxis: {
    		categories: ChartDatas.getCatagories('apriori')
    	},
    	title: {
    		text: 'Apirori 算法'
    	},
    	series: aprioriData
    });
    var aprioriChart = $('#aprioriChart').highcharts(aprioriChartCfg);

    /*------------------------------------------
                    fp growth表
     ------------------------------------------*/
    // fpgrowthChart 配置
    var fpgrowthChartCfg = $.extend({}, algorithmCfg, {
    	xAxis: {
    		categories: ChartDatas.getCatagories('fpgrowth')
    	},
    	title: {
    		text: 'Fp-growth 算法'
    	},
    	series: fpgrowthData
    });
    var fpgrowthChart = $('#fpgrowthChart').highcharts(fpgrowthChartCfg);
    
    
    /*------------------------------------------
                    eclat表
     ------------------------------------------*/
    // eclatChart 配置
    var eclatChartCfg = $.extend({}, algorithmCfg, {
    	xAxis: {
    		categories: ChartDatas.getCatagories('eclat')
    	},
    	title: {
    		text: 'Eclat 算法'
    	},
        series: eclatData
    });
    var eclatChart = $('#eclatChart').highcharts(eclatChartCfg);

})(Tool, Router, ChartDatas);