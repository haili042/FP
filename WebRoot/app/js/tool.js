/*------------------------------------------
                工具类
 ------------------------------------------*/

var Tool = (function () {

    /*------------------------------------------
                    参数 get 请求
     ------------------------------------------*/
	function addUrlParams(url, params) {
		
		var result = url.replace(/(^\s*)|(\s*$)/g, "");
		symbol = result.indexOf("?") == -1 ? "?" : "&";
		
		for (var key in params) {
			if (params.hasOwnProperty(key)) {
				var val = params[key];
				val = JSON.stringify(val);
				
				result += symbol + encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
				symbol = "&";
			}
		}
		return result;
	}
	
	// 返回接口
	return {
		addUrlParams: addUrlParams
	};

})();