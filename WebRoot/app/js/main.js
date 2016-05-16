
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
    
    minSups.forEach(function(val, k) {
    	addMinSup(val);
    });
    
    
    /*------------------------------------------
			生成表格
	------------------------------------------*/
    
    function addTableRow(dataSet) {
        
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
        
        html = tpl(finalData);
        
        $('#tableTplWrap').append(html);
    }
    addTableRow();
    
    function addTableCol(minSup) {
    	var source   = $("#entry-template").html();
    	var template = Handlebars.compile(source);
    	var context = {title: "My New Post", body: "This is my first post!"};
    	var html    = template(context);
    }
    
    /*------------------------------------------
			事件绑定
	------------------------------------------*/
    // 选择类型
//    $('.algorithmType').click(function(e) {
//    	algorithm = this.id;
//    	$('#algorithmType').text(this.text);
//    });
    
    // 开始按钮
    $('#startBtn').click(function(e) {
    	var totalTime = 0, // 计算总时间
    		cbArr = [], // 回调函数队列
    		chartDatas = ChartDatas.getData();
    	
    	$('.fp-state').toggle();
    	$('.fp-progress').toggle();

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
									trElem = $('#minSupWraper').find('[minsup="'+minSup+'"]');

								totalTime += time;

								ChartDatas.setData(algorithm, dataSet, minSup, time);

								trElem.find('.fp-time').text(time);
								trElem.find('.fp-state').toggle();
								trElem.find('.fp-progress').toggle();

							}
						});
					}
				}
    		}
    	}

    	var cur= cbArr[0],
    		promise = getData(cur.algorithm, cur.dataSet, cur.minSup).then(cur.cb);
    	
    	
    	// 遍历回调函数队列
        for (var i = 0, len = cbArr.length - 1; i < len; i++) {
        	var cur = cbArr[i],
        		next = cbArr[i+1];
        	
        	promise = promise.then(function(res) {
    			getData(next.algorithm, next.dataSet, next.minSup)
				.then(next.cb);
        	});
        }
        

    });
    
    // 添加支持度按钮
    $('#addMinSupBtn').click(function(e) {
    	var elem = $('#addMinSupInp');
    	var val = elem.val().trim();
    	
    	if (val != '' && val >= 0.25 && val <= 0.8) {
    		addMinSup(val);
    		ChartDatas.addMinSup(val); // 更新数据
    	} else {
    		elem.focus();
    	}
    	elem.val('');
    });

//    var p1 = {
//    	url: basePath + 'app/css/1',
//        cb: function(res) {
//        	alert(1);
//        }
//    };
//    
//    var p2 = {
//		url: basePath + 'app/css/2',
//		cb: function(res) {
//			alert(2);
//		}
//	};
//    
//    function prom(url) {
//    	return $.ajax(url);
//    }
//    var cbArr = [p1, p2];
//    
//	var cur= cbArr[0],
//		promise = prom(cur.url).then(cur.cb);
//
//
//	// 遍历回调函数队列
//	for (var i = 0, len = cbArr.length - 1; i < len; i++) {
//		var cur = cbArr[i],
//			next = cbArr[i+1];
//		
//		promise = promise.then(function(res) {
//			prom(next.url)
//				.then(next.cb);
//		});
//	}

})(Tool, Router, ChartDatas, Handlebars);