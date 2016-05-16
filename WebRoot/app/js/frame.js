var ChartDatas = (function (Router) {
/*
    var data = {
		'apriori': {
            dataSets: [ 'accidents', 'mushroom', 'T10I4D100K' ],
            minSups: [ 0.3, 0.4, 0.5 ],
            data: {
                'accidents': {
                    0.3: 123,
                    0.4: 456,
                    0.5: 234
                },
                'mushroom': {
                    0.3: 533,
                    0.4: 446,
                    0.5: 165
                },
                'T10I4D100K': {
                    0.3: 143,
                    0.4: 532,
                    0.5: 187
                }
            }
        },
        fpgrowth: {
            dataSets: [ 'accidents', 'mushroom', 'T10I4D100K' ],
            minSups: [ 0.3, 0.4, 0.5 ],
            data: {
                'accidents': {
                    0.3: 123,
                    0.4: 456,
                    0.5: 234
                },
                'mushroom': {
                    0.3: 533,
                    0.4: 446,
                    0.5: 165
                },
                'T10I4D100K': {
                    0.3: 143,
                    0.4: 532,
                    0.5: 187
                }
            }
        },
        eclat: {
            dataSets: [ 'accidents', 'mushroom', 'T10I4D100K' ],
            minSups: [ 0.3, 0.4, 0.5 ],
            data: {
                'accidents': {
                    0.3: 123,
                    0.4: 456,
                    0.5: 234
                },
                'mushroom': {
                    0.3: 533,
                    0.4: 446,
                    0.5: 165
                },
                'T10I4D100K': {
                    0.3: 143,
                    0.4: 532,
                    0.5: 187
                }
            }
        }
    };
*/
    /*------------------------------------------
        结果数据
     ------------------------------------------*/
    var data = {
	        apriori: {
	            dataSets: [],
	            minSups: [],
	            data: {}
	        },
	        fpgrowth: {
	            dataSets: [],
	            minSups: [],
	            data: {}
	        },
	        eclat: {
	            dataSets: [],
	            minSups: [],
	            data: {}
	        }
	    },
	    minSups = [],
	    dataSets = []
    ;

    // 获取数据
    var getData = function () {
        return data;
    };
    
    // 设置数据
    var setData = function (algorithm, dataSet, minSup, time) {
    	data[algorithm].data[dataSet][minSup] = time;
    };
    
    // 获取支持度
    var getMinSups = function () {
    	return minSups;
    };
    
    // 增加支持度
    var addMinSup = function (sup) {
    	minSups.push(sup);
        for (var k in data) {
            if (data.hasOwnProperty(k)) {
                data[k].minSups.push(sup);
                
                var dataSets = data[k].dataSets;
                for (var sk in dataSets) {
                	data[k].data[dataSets[sk]][sup] = 0; // 要先执行addDataSets
                }
            }
        }
    };
    
    // 获取数据集
    var getDataSets = function () {
    	return dataSets;
    };
    
    // 增加数据集
    var addDataSet = function (dataset) {
    	dataSets.push(dataset);
    	for (var k in data) {
    		if (data.hasOwnProperty(k)) {
    			data[k].dataSets.push(dataset);
    			data[k].data[dataset] = {};
    		}
    	}
    };

    // 生成highchart 需要的格式
    var getSeries = function (algorithm) {
        var result = [],
            dataSets = data[algorithm].dataSets,
            minSups = data[algorithm].minSups,
            agrmData = data[algorithm].data
            ;

        for (var k in dataSets) {
            if (dataSets.hasOwnProperty(k)) {
                var arr = [];
                for (var sk in minSups) {
                    if (minSups.hasOwnProperty(sk)) {
                        arr.push(agrmData[dataSets[k]][minSups[sk]]);
                    }
                }
                var o = {
                    name: dataSets[k],
                    data: arr
                };
                result.push(o);
            }
        }

        return result;
    };
    
    // 生成highchart 需要的格式
    var getCatagories = function (algorithm) {
        return data[algorithm].minSups;
    };

    // 初始化
    [ 'accidents', 'mushroom', 'T10I4D100K' ].forEach(function(val, k) {
    	addDataSet(val);
    });
    
    // 初始化
    [ 0.4, 0.5, 0.6 ].forEach(function(val, k) {
    	addMinSup(val);
    });
    
    
    /*------------------------------------------
     配置路由
     ------------------------------------------*/
    Router.config({
        '#/aprioriInfo': {
            templateURL: 'app/tpl/aprioriInfo.html',
            success: function () {
                console.log('list', cate, id);
            }
        },
        '#/fpgrowthInfo': {
            templateURL: 'app/tpl/fpgrowthInfo.html',
            success: function () {
                console.log('list', cate, id);
            }
        },
        '#/eclatInfo': {
            templateURL: 'app/tpl/eclatInfo.html',
            success: function () {
                console.log('list', cate, id);
            }
        },
        '#/result': {
            templateURL: 'app/tpl/result.html',
            success: function () {
                console.log('list', cate, id);
            }
        }
    }, {
        // 默认路由
        hash: '#/',
        templateURL: 'app/tpl/main.html',
        success: function () {
            console.log('main', cate, id);
        }
    });

    Router.go('#/');

    return {
        getData: getData,
        setData: setData,
        getDataSets: getDataSets,
        addDataSet: addDataSet,
        getMinSups: getMinSups,
        addMinSup: addMinSup,
        getSeries: getSeries,
        getCatagories: getCatagories
    };

})(Router);