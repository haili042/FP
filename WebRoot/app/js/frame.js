(function(Router) {
	
	// 配置路由
	Router.config({
		'#/aprioriInfo' : {
			templateURL: 'app/tpl/aprioriInfo.html',
			success: function() {
				console.log('list', cate, id);
			}
		},
		'#/fpgrowthInfo' : {
			templateURL: 'app/tpl/fpgrowthInfo.html',
			success: function() {
				console.log('list', cate, id);
			}
		},
		'#/eclatInfo' : {
			templateURL: 'app/tpl/eclatInfo.html',
			success: function() {
				console.log('list', cate, id);
			}
		},
		'#/result' : {
			templateURL: 'app/tpl/result.html',
			success: function() {
				console.log('list', cate, id);
			}
		}
	}, {
		// 默认路由
		hash: '#/',
		templateURL: 'app/tpl/main.html',
		success: function() {
			console.log('main', cate, id);
		}
	});
	
	Router.go('#/');

})(Router);