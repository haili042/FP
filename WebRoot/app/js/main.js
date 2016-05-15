
(function (Tool, Router, ChartDatas) {

    /*------------------------------------------
                    生成图表
     ------------------------------------------*/
    var basePath = window.location.origin + window.location.pathname, 
		cbArr = []// 回调函数队列,
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

		ChartDatas.addMinSups(data); // 更新数据

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
    
    addMinSup(0.6);
    addMinSup(0.5);
    
    
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
    	var totalTime = 0; // 计算总时间
    	
    	$('.fp-state').toggle();
    	$('.fp-progress').toggle();

    	var chartDatas = ChartDatas.getData();
    	
    	// 封装回调函数队列
    	for (var algorithm in chartDatas) {

    		if (chartDatas.hasOwnProperty(algorithm)) {

				var dataSets = chartDatas[algorithm];
    			for (var dataSet in dataSets) {

					if (dataSets.hasOwnProperty(dataSet)) {

						var minSups = dataSets[dataSet];
						for (var minSup in minSups) {

							if (minSups.hasOwnProperty(minSup)) {

								var dtd = $.Deferred();
								debugger
								(function(algorithm, dataSet, minSup) {

									getData(algorithm, dataSet, minSup).then(function (res) {
										console.log(res);
										var time = res.time,
											dataSet = res.dataset,
											algorithm = res.algorithm,
											minSup = res.minSup,
											trElem = $('#minSupWraper').find('[minsup="'+v+'"]');

										totalTime += time;

										ChartDatas.setData(algorithm, dataSet, minSup, time);

										trElem.find('.fp-time').text(time);
										trElem.find('.fp-state').toggle();
										trElem.find('.fp-progress').toggle();

										dtd.resolve(res);
									});
								})(algorithm, dataSet, minSup);

								// 回调队列
								cbArr.push(dtd.promise());
							}
						}
					}
				}
    		}
    	}

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


})(Tool, Router, ChartDatas);