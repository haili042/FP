(function(Router) {

	// 配置路由
	Router.config(
	{
		'#/list/' : function(cate, id) {
			console.log('list', cate, id);
		},
		'#/show/' : function(id) {
			console.log('show', id);
		}
	}, 
	// 默认路由
	function() {
		console.log('default router');
	});
	Router.go();

	$('#page2').click(function(e) {
		Router.go('algorithmInfo.html');
	});

})(Router);