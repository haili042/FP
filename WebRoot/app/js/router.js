/**
 * router
 * */
var Router = (function($, Tool) {
	var basePath = window.location.href;
	
	// 发起请求
    function pagePromise(page) {
        var url = basePath + 'app/tpl/' + page,
            params = {

            };

        return $.ajax({
            url: Tool.addUrlParams(url, params),
            type: 'get',
            dataType: 'html'
        });
    }

    // 跳转
    function go(page) {
//    	window.location.href += "#page1";
//        var promise = pagePromise(page);
//        promise.then(function(res) {
//            var router = $('div[data-router=router]');
//            router.empty();
//            router.append(res);
//        });
        
        var hash = location.hash, route, matchResult;
        for (var routeIndex in this.routemap){
          route = this.routemap[routeIndex];
          matchResult = hash.match(route.rule);
          if (matchResult){
            route.func.apply(window, matchResult.slice(1));
            return; 
          }
        }
        this.defaultFunc();
    }

    // 配置路由
    function config(routemap, defaultFunc) {
        var that = this, rule, func;
        this.routemap = [];
        this.defaultFunc = defaultFunc;
        for (var rule in routemap) {
          if (!routemap.hasOwnProperty(rule)) continue;
          that.routemap.push({
            rule: new RegExp(rule, 'i'),
            func: routemap[rule]
          });       
        }
    }

    
    return {
    	config: config,
        go: go
    };
})($, Tool);

