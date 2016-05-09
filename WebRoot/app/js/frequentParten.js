

$(function () {

    /*------------------------------------------
                    生成图表
     ------------------------------------------*/

    var colors = Highcharts.getOptions().colors,
        data = [0, 0, 0];

    var chart = $('#lineChart').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: '关联规则挖掘算法时间比较'
            },
            credits: {
                enabled: false  // 隐藏公司名称
            },
            xAxis: {
                categories: ['Apriori', 'FPGrowth', 'Eclat']
            },
            yAxis: {
            	min: 0,
                title: {
                    text: 'time (ms)',
                    align: 'high'
                },
	            labels: {
	                overflow: 'justify'
	            }
            },
            plotOptions: {
                bar: {
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
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: true
            },
            tooltip: {
                formatter: function() {
                    var point = this.point,
                        s = this.x +' : <b>耗时'+ this.y +'ms</b><br/>';
                    return s;
                }
            },
            // 正常图表
            series: [{
            	name: 'accidents 数据集',
            	data: data
            }, {
            	name: 'mushroom 数据集',
            	data: data
            }, {
            	name: 'T10I4D100K 数据集',
                data: data
            }],
            // 下钻图表
            drilldown: {
                series: [{
                    id: 'animals',
                    data: [
	                    ['Cats', 4],
	                    ['Dogs', 2],
	                    ['Cows', 1],
	                    ['Sheep', 2],
	                    ['Pigs', 1]
                    ]
                }, {
                    id: 'fruits',
                    data: [
					    ['Cats', 4],
					    ['Dogs', 2],
					    ['Cows', 1],
					    ['Sheep', 2],
					    ['Pigs', 1]
                    ]
                }, {
                    id: 'cars',
                    data: [
                        ['Cats', 4],
                        ['Dogs', 2],
                        ['Cows', 1],
                        ['Sheep', 2],
                        ['Pigs', 1]
                    ]
                }]
            },
            exporting: {
                enabled: false
            }
        })
        .highcharts(); // return chart

    /*------------------------------------------
                    获取数据
     ------------------------------------------*/
    var basePath = window.location.href, 
    	algorithm = 'apriori',
    	algorithmLib = {
    		apriori: 0,
    		fpgrow: 1,
    		eclat: 2
    	},
    	datasets = 'accidents',
    	datasetsLib = {
    		accidents: 0,
    		mushroom: 1,
    		T10I4D100K: 2
    	}
    ;
    function getData(algorithm, datasets) {
        return $.ajax({
            url: basePath + algorithm + '?fileName=' + datasets,
            type: 'get',
            dataType: 'json'
        });
    }
    
    /*------------------------------------------
    		计时器
	------------------------------------------*/
    var timeInit = 0, 
    	interval;
    function timer() {
    	return setInterval(function() {
    		$('#time').text(++timeInit);
    	}, 1);
    }

    /*------------------------------------------
			事件绑定
	------------------------------------------*/
    $('.algorithmType').click(function(e) {
    	algorithm = this.id;
    	$('#algorithmType').text(this.text);
    });
    
    $('#startBtn').click(function(e) {
    	$('.fp-state').toggle();
    	$('.fp-progress').toggle();

    	datasets = $("#datasets").val();
    	var promise = getData(algorithm, datasets);
    	
    	// 完成之后
    	promise.done(function (res) {
    		console.log(res);
    		var time = res.time || 0,
    			data = [0, 0, 0];
    		
    		data[algorithmLib[algorithm]] = time;
    		
    		chart.series[datasetsLib[datasets]].setData(data);
    		$('.fp-time').text(time);
    		$('.fp-state').toggle();
    		$('.fp-progress').toggle();
    	});
    	
    });
    
    $('#cancelBtn').click(function(e) {
    	$('.fp-state').toggle();
    	$('.fp-progress').toggle();
    });
    
    
});