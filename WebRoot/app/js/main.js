(function (Tool, Router, ChartDatas, Handlebars) {

    /*------------------------------------------
     	生成图表
     ------------------------------------------*/
    var basePath = window.location.origin + window.location.pathname,
        minSups = ChartDatas.getMinSups();
    ;

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
     	设置支持度
     ------------------------------------------*/

    function addMinSup(data) {
        var html = $('#minSup').text().replace(/{{minSup}}/g, data),
            elem = $(html)
            ;
        $('#minSupWraper').append(elem);
    }

    minSups.forEach(function (val, k) {
        addMinSup(val);
    });


    /*------------------------------------------
     生成表格
     ------------------------------------------*/

    // 重绘表格
    function repaintTable() {

        $('#tableTplWrap').empty(); // 清除原来的

        var src = $('#tableTpl').text(),
            tpl = Handlebars.compile(src),
            chartDatas = ChartDatas.getData(),
            finalData = {
                minSups: ChartDatas.getMinSups(),
                dataSets: ChartDatas.getDataSets(),
                data: []
            },
            html = ''
            
            ;

        // 拼成 handlebars 的傻逼格式, 马勒戈壁
        for (var k in chartDatas) {

            if (chartDatas.hasOwnProperty(k)) {
                var arr = [];
                for (var i in chartDatas[k].data) {

                    var innerArr = [];
                    if (chartDatas[k].data.hasOwnProperty(i)) {

                        for (var j in chartDatas[k].data[i]) {

                            if (chartDatas[k].data[i].hasOwnProperty(j)) {

                                innerArr.push({
                                    key: j,
                                    val: chartDatas[k].data[i][j]
                                });
                            }
                        }
                    }

                    arr.push({
                        key: i,
                        val: innerArr
                    });
                }

                finalData.data.push({
                    alogrithm: k,
                    dataSetsLen: chartDatas[k].dataSets.length + 1,
                    minSupsLen: chartDatas[k].minSups.length,
                    data: arr
                });
            }
        }

        html = $(tpl(finalData));
        $('#tableTplWrap').append(html);
        
        // 下载按钮
        html.find('.fp-res-download').click(function (e) {
            var minsup = $(this).attr('minsup'),
            	algorithm = $(this).attr('algorithm'),
            	dataset = $(this).attr('dataset'),
                url = basePath = 'download',
                params = {
                    'algorithm': algorithm,
                    'fileName': dataset,
                    'minSup': minsup
                };

            window.open(Tool.addUrlParams(url, params));
        });
    }

    repaintTable();


    /*------------------------------------------
     	事件绑定
     ------------------------------------------*/

    // 开始按钮
    $('#startBtn').click(function (e) {
        var totalTime = 0, // 计算总时间
            cbArr = [], // 回调函数队列
            chartDatas = ChartDatas.getData();

        $('.fp-state').toggle();

        // 封装回调函数队列
        for (var algorithm in chartDatas) {

            if (chartDatas.hasOwnProperty(algorithm)) {

                var dataSets = chartDatas[algorithm].dataSets,
                    minSups = chartDatas[algorithm].minSups
                    ;

                for (var i = 0, len = dataSets.length; i < len; i++) {

                    for (var j = 0, len2 = minSups.length; j < len2; j++) {

                        // 回调队列
                        cbArr.push({
                            algorithm: algorithm,
                            dataSet: dataSets[i],
                            minSup: minSups[j],
                            cb: function (res) {
                                console.log(res);
                                var time = res.time,
                                    dataSet = res.dataSet,
                                    algorithm = res.algorithm,
                                    minSup = res.minSup,
                                    tdElem = $('#tableTplWrap')
                                    		.find('.' + algorithm + '-' + dataSet + '[minsup="'+minSup+'"]');

                                totalTime += time;

                                ChartDatas.setData(algorithm, dataSet, minSup, time);

                                tdElem.find('.fp-time').text(time);
                                tdElem.find('.fp-state').toggle(); // 隐藏和显示

                            }
                        });
                    }
                }
            }
        }

        var cur = cbArr.shift(),
            promise = getData(cur.algorithm, cur.dataSet, cur.minSup).then(cur.cb);

        // 遍历回调函数队列
        cbArr.forEach(function(val, k) {
        	(function(val) {
        		setTimeout(function() {
            		promise = promise.then(function(res) {
            			return getData(val.algorithm, val.dataSet, val.minSup).then(val.cb);
            		});
        		}, 2000);
        	})(val);
    	});


    });

    // 添加支持度按钮
    $('#addMinSupBtn').click(function (e) {
        var elem = $('#addMinSupInp');
        var val = elem.val().trim();

        if (val != '' && val >= 0.40 && val <= 0.8) {
            addMinSup(val);
            ChartDatas.addMinSup(val); // 更新数据
            repaintTable();// 重绘
        } else {
            elem.focus();
        }
        elem.val('');
    });

    
//    function prom(url) {
//    	return $.ajax(url);
//    }
//    var cbArr = [{
//    	url: basePath + 'app/css/1',
//        cb: function(res) {
//        	alert(1);
//        }
//    }, {
//		url: basePath + 'app/css/2',
//		cb: function(res) {
//			alert(2);
//		}
//	}, {
//		url: basePath + 'app/css/3',
//		cb: function(res) {
//			alert(3);
//		}
//	}, {
//		url: basePath + 'app/css/4',
//		cb: function(res) {
//			alert(4);
//		}
//	}];
//    
//
//    function pp (o) {
//    	var dtd = $.Deferred();
//    	$.ajax(o.url).then(function(res) {
//    		o.cb();
//    		dtd.resolve(res);
//    	});
//    	return dtd.promise();
//    }
    
//    $.ajax("app/css/1").then(function() {alert(1);})
//    .then(function(data) {
//        return $.ajax("app/css/2").then(function() {alert(2);});
//    }).then(function(data) {
//        return $.ajax("app/css/3").then(function() {alert(3);});
//    }).then(function(data) {
//        return $.ajax("app/css/4").then(function() {alert(4);});
//    });
    
//    var pppp = cbArr.shift();
//    var ppr = $.ajax(pppp.url).then(pppp.cb);
//    
//    cbArr.forEach(function(val, k) {
//    	(function(val) {
//    		ppr = ppr.then(function(res) {
//    			return $.ajax(val.url).then(val.cb);
//    		});
//    	})(val);
//	});
    
    
//	ppr = ppr.then(function(res) {
//		var a = cbArr.shift();
//		return $.ajax(a.url).then(a.cb);
//	});
//	
//	ppr = ppr.then(function(res) {
//		var a = cbArr.shift();
//		return $.ajax(a.url).then(a.cb);
//	});
	

})(Tool, Router, ChartDatas, Handlebars);