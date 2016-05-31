/**
 * router
 */
var Router = (function($, Tool) {
	var routerConfig, 
		defaultRouter,
		lastHash = ''; // 上次访问的路由
	
	// 路由事件
	window.addEventListener('hashchange', function(e) {
		var hash = window.location.hash;
		go(hash);
	}, false);

	// 发起请求
	function pagePromise(url) {
		return $.ajax({
			url : url,
			type : 'get'
		});
	}

	// 跳转
	function go(hash) {
		var promise,
			func;

		if (hash === lastHash) {
			return false;
		}
		for (var cfg in routerConfig) {
			if (routerConfig.hasOwnProperty(cfg)) {
				var reg = new RegExp(cfg + '\/?$');

				// 匹配上url
				if (reg.test(hash)) {
					func = routerConfig[cfg].success;
					promise = pagePromise(routerConfig[cfg].templateURL);
					break;
				}
			}
		}
		
		// 默认路由
		if(!promise) {
			lastHash = location.hash = defaultRouter.hash;
			promise = pagePromise(defaultRouter.templateURL);
		}
		
		promise.then(function(res) {
			var router = $('div[data-router=router]'),
				view = $(res);
			
			view.css({
				'opacity': '0',
			});
			router.empty(); // 清空
			router.append(view);
			view.animate({
				'opacity': '1'
			});
		});
	}

	// 配置路由
	function config(rcfg, dfr) {
		routerConfig = rcfg;
		defaultRouter = dfr;
	}

	return {
		config : config,
		go: go
	};
})($, Tool);
