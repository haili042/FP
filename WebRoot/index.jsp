<!DOCTYPE html>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<html lang="en">
<head>
  <base href="<%=basePath%>">

  <meta charset="UTF-8">
  <!--支持响应式布局-->
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <!--描述-->
  <meta name="description" content="数据挖掘算法">

  <title>数据挖掘算法</title>

  <link rel="shortcut icon" type="image/x-icon" href="<%=request.getContextPath()%>/app/img/a.ico"/>

  <!--引入样式库-->
  <link type="text/css" rel="stylesheet" href="app/lib/bootstrap.min.css">
  <link type="text/css" rel="stylesheet" href="app/lib/fontawesome/css/font-awesome.min.css">

  <!--引入样式-->
  <link type="text/css" rel="stylesheet" href="./app/css/base.css">

</head>

<body>


<!--导航栏-->
<nav class="nav navbar-fixed-top">
  <div class="container">

    <div class="navbar-collapse collapse">
      <ul class="nav navbar-nav">
        <li><a href="#">主页</a></li>
        <li><a href="#/aprioriInfo">apriori介绍</a></li>
        <li><a href="#/fpgrowthInfo">fpgrowth介绍</a></li>
        <li><a href="#/eclatInfo">eclat介绍</a></li>
        <li><a href="#/result">结论</a></li>
      </ul>
    </div>
  </div>
</nav>

<!--引入js库-->
<script src="app/lib/jquery.min.js"></script>
<script src="app/lib/handlebars-1.0.0.beta.6.js"></script>
<script src="app/lib/highcharts.js"></script>
<script src="app/lib/exporting.js"></script>

<!--引入脚本-->
<script src="app/js/tool.js"></script>
<script src="app/js/router.js"></script>
<script src="app/js/frame.js"></script>

<!--内容-->
<div class="container">
  <div class="row no-gutter" data-router="router"></div>
</div>

</body>
</html>