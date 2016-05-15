

(function () {

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
    
    var colors/* = Highcharts.getOptions().colors,
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
                text: '关联规则挖掘算法时间比较'
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
                    text: 'time (ms)',
                    align: 'high'
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
//            exporting: {
//                enabled: false
//            }
        })
        .highcharts(); // return chart

    */
    /*------------------------------------------
                    获取数据
     ------------------------------------------*/
    
    function getData(algorithm, datasets, minSup) {
    	var url = basePath + algorithm,
    		params = { 
    			algorithm: algorithm,
    			fileName: datasets,
                minSup: minSup
    		};
    	
        return $.ajax({
            url: Tool.addUrlParams(url, params),
            type: 'get',
            dataType: 'json'
        });
    }
    
    
    /*------------------------------------------
    		支持度
	------------------------------------------*/
    var minSupTemplate = $('#minSup').text();
    
    function addMinSup(data) {
    	var html = minSupTemplate.replace(/{{minSup}}/g, data),
    		elem = $(html)
		;
    	
    	minSups.push(data);
    	$('#minSupWraper').append(elem);
    	
        // 下载按钮
        elem.find('.fp-res-download').click(function(e) {
        	var minsup = $(this).attr('minsup'),
        		url = basePath = 'download',
        		params = {
		    		'algorithm': algorithm,
		    		'fileName': datasets,
		    		'minSup': minsup
    	    	};
        	
        	window.open(Tool.addUrlParams(url, params));
        });
    }
    
    addMinSup(0.3);
    addMinSup(0.5);
    
    
    /*------------------------------------------
			事件绑定
	------------------------------------------*/
    // 选择类型
    $('.algorithmType').click(function(e) {
    	algorithm = this.id;
    	$('#algorithmType').text(this.text);
    });
    
    // 开始按钮
    $('#startBtn').click(function(e) {
    	var totalTime = 0;
    	$('.fp-state').toggle();
    	$('.fp-progress').toggle();

    	datasets = $("#datasets").val();

    	// 回到第一层
    	try {
    		chart.drillUp();
    	} catch(e) {}
    	
    	// 封装回调函数队列
    	minSups.forEach(function(v, k) {
			var dtd = $.Deferred();
    		
			
			(function(algorithm, datasets, v, k) {
				getData(algorithm, datasets, v).then(function (res) {
					console.log(res);
		    		var time = res.time || 0,
		    			trElem = $('#minSupWraper').find('[minsup="'+v+'"]');
		    		
		    		var item = [ (v + ''), time ];
		    		subChartData[algorithm][datasetsLib[datasets]].data.push(item);
		    		
		    		totalTime += time;
		    		chartData[algorithm][algorithmLib[algorithm]].y = totalTime;
		    		chart.series[datasetsLib[datasets]].setData(chartData[algorithm]);
		    		
		    		
		    		trElem.find('.fp-time').text(time);
		    		trElem.find('.fp-state').toggle();
		    		trElem.find('.fp-progress').toggle();
					
					dtd.resolve(res);
				});
			})(algorithm, datasets, v, k);
    			
			setTimeout(function() {
				chart.redraw(); // 重绘
			}, 0);
    		cbArr.push(dtd.promise());
    	});
        
    	// 遍历回调函数队列
    	cbArr.reduce(function(cur, next) {
    		return cur.then(next);
    	});

    });
    
    // 取消按钮
    $('#cancelBtn').click(function(e) {
    	chartData;
    	debugger
    	$('.fp-state').toggle();
    	$('.fp-progress').toggle();
    });
    
    // 添加支持度按钮
    $('#addMinSupBtn').click(function(e) {
    	var elem = $('#addMinSupInp');
    	var val = elem.val().trim();
    	
    	if (val != '' && val >= 0.25 && val <= 0.8) {
    		addMinSup(val);
    	} else {
    		elem.focus();
    	}
    	elem.val('');
    });


})(Tool);