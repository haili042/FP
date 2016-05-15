
(function (Tool, Router, ChartDatas) {

    /*------------------------------------------
                    生成图表
     ------------------------------------------*/
    var basePath = window.location.origin + window.location.pathname, 
		algorithm = 'apriori',
		algorithmLib = {
			apriori: 0,
			fpgrowth: 1,
			eclat: 2
		},
		datasets = 'accidents',
		datasetsLib = {
			accidents: 0,
			mushroom: 1,
			T10I4D100K: 2
		},
		minSups = [],
		cbArr = [] // 回调函数队列
	;
    
    var colors = Highcharts.getOptions().colors,
    	chartData = {
	    	'apriori': [{
	            name: 'apriori',
	            y: 0,
	            drilldown: 'accidents'
	        }, {
	            name: 'fpgrowth',
	            y: 0,
	            drilldown: 'mushroom'
	        }, {
	            name: 'eclat',
	            y: 0,
	            drilldown: 'T10I4D100K'
	        }],
			'fpgrowth': [{
	            name: 'apriori',
	            y: 0,
	            drilldown: 'accidents'
	        }, {
	            name: 'fpgrowth',
	            y: 0,
	            drilldown: 'mushroom'
	        }, {
	            name: 'eclat',
	            y: 0,
	            drilldown: 'T10I4D100K'
	        }],
			'eclat': [{
	            name: 'apriori',
	            y: 0,
	            drilldown: 'accidents'
	        }, {
	            name: 'fpgrowth',
	            y: 0,
	            drilldown: 'mushroom'
	        }, {
	            name: 'eclat',
	            y: 0,
	            drilldown: 'T10I4D100K'
	        }]
    	},
    	subChartData = {
	    	'apriori': [{
                name: 'accidents',
                data: []
            }, {
                name: 'mushroom',
                data: []
            }, {
                name: 'T10I4D100K',
                data: []
            }],
			'fpgrowth': [{
                name: 'accidents',
                data: []
            }, {
                name: 'mushroom',
                data: []
            }, {
                name: 'T10I4D100K',
                data: []
            }],
			'eclat': [{
                name: 'accidents',
                data: []
            }, {
                name: 'mushroom',
                data: []
            }, {
                name: 'T10I4D100K',
                data: []
            }]
    	}
    ;
    

    /*------------------------------------------
                    总表
     ------------------------------------------*/
    var chart = $('#lineChart').highcharts({
            chart: {
                type: 'bar',
                events: {
                	drilldown: function (e) {
                        var chart = this;
                        series = subChartData[e.point.name][datasetsLib[e.point.series.name]];
                        chart.addSeriesAsDrilldown(e.point, series);
                	}
                }
            },
            title: {
                text: 'Apriori'
            },
            credits: {
                enabled: false  // 隐藏公司名称
            },
            xAxis: {
            	type: 'category'
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
                        s = point.name + '算法, ' + point.drilldown + '数据集 : <b>共耗时'+ this.y +'ms</b><br/>';
                    return s;
                }
            },
            // 正常图表
            series: [{
            	name: 'accidents',
            	data: chartData["apriori"],
        		drilldown: 'accidents'
            }, {
            	name: 'mushroom',
            	data: chartData["fpgrowth"],
            	drilldown: 'mushroom'
            }, {
            	name: 'T10I4D100K',
            	data: chartData["eclat"],
        		drilldown: 'T10I4D100K'
            }],
            // 下钻图表
            drilldown: {
                series: []
            }
        })
        .highcharts(); // return chart
    
    
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
    	series: ChartDatas.getSeries('apriori')
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
    	series: ChartDatas.getSeries('fpgrowth')
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
        series: ChartDatas.getSeries('eclat')
    });
    var eclatChart = $('#eclatChart').highcharts(eclatChartCfg);

})(Tool, Router, ChartDatas);