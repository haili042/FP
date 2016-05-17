(function (Tool, Router, ChartDatas, Handlebars) {

    /*------------------------------------------
     	生成图表
     ------------------------------------------*/
    var basePath = window.location.origin + window.location.pathname,
        minSups = ChartDatas.getMinSups(),
	    dataSets = ChartDatas.getDataSets()
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
        var html = $('#minSupTpl').text().replace(/{{minSup}}/g, data),
            elem = $(html)
            ;
        $('#minSupWrapper').append(elem);
    }

    minSups.forEach(function (val, k) {
        addMinSup(val);
    });
    
    /*------------------------------------------
	 	设置数据集
	 ------------------------------------------*/
    function addDataSet(data) {
    	var html = $('#dataSetTpl').text().replace(/{{dataset}}/g, data),
	    	elem = $(html)
	    	;
    	$('#dataSetWrapper').append(elem);
    	
    	elem.find('.fp-res-download').click(function(e) {
	        var dataset = $(this).attr('dataset'),
	            url = basePath = 'download',
	            params = {
	                'fileName': dataset,
	            };

	        window.open(Tool.addUrlParams(url, params));
    	});
    }
    
    dataSets.forEach(function (val, k) {
    	addDataSet(val);
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
        
        // 运行状态
        $('#tableTplWrap').find('.fp-state').each(function(k, elem) {
        	var state = $(elem).attr('state')
        		tdElem = $(this);
        	if (state == '-1') {
        		tdElem.find('.fp-unstart').show();
        		tdElem.find('.fp-running').hide();
        		tdElem.find('.fp-finish').hide();
        	} else if (state == '0') {
        		tdElem.find('.fp-unstart').hide();
        		tdElem.find('.fp-running').show();
        		tdElem.find('.fp-finish').hide();
        	} else {
        		tdElem.find('.fp-unstart').hide();
        		tdElem.find('.fp-running').hide();
        		tdElem.find('.fp-finish').show();
        	}
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

        // 封装回调函数队列
        for (var algorithm in chartDatas) {

            if (chartDatas.hasOwnProperty(algorithm)) {

                var dataSets = chartDatas[algorithm].dataSets,
                    minSups = chartDatas[algorithm].minSups
                    ;

                for (var i = 0, len = dataSets.length; i < len; i++) {

                    for (var j = 0, len2 = minSups.length; j < len2; j++) {
                    	
                    	var tdElem = $('#tableTplWrap')
                 			.find('.' + algorithm + '-' + dataSets[i] + '[minsup="'+minSups[j]+'"]');

                    	ChartDatas.setData(algorithm, dataSets[i], minSups[j], 0);
                    	
                    	tdElem.find('.fp-unstart').hide();
                    	tdElem.find('.fp-running').show();
                    	
                        // 回调队列
                		cbArr.push({
                            algorithm: algorithm,
                            dataSet: dataSets[i],
                            minSup: minSups[j],
                            cb: function (res) {
                                var time = res.time,
	                                dataSet = res.dataSet,
	                                algorithm = res.algorithm,
	                                minSup = res.minSup,
	                                tdElem = $('#tableTplWrap')
	                     				.find('.' + algorithm + '-' + dataSet + '[minsup="'+minSup+'"]');
                                
                                ChartDatas.setData(algorithm, dataSet, minSup, time);
                                tdElem.find('.fp-time').text(time);
                                tdElem.find('.fp-unstart').hide(); // 隐藏和显示
                                tdElem.find('.fp-running').hide(); // 隐藏和显示
                                tdElem.find('.fp-finish').show(); // 隐藏和显示

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
        		}, 2000); // 延迟2ms
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


})(Tool, Router, ChartDatas, Handlebars);