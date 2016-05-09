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
        <li><a href="javascript:void(0)">重新开始</a></li>
        <li><a href="javascript:void(0)">全部运行</a></li>
        <li><a href="javascript:void(0)">算法介绍</a></li>
        <li><a href="javascript:void(0)">结论</a></li>
      </ul>
    </div>
  </div>
</nav>

<!--标题-->
<header>
  <div class="container">
    <h1>频繁项集挖掘算法</h1>
  </div>
</header>

<!--内容-->
<div class="container">

  <div class="row no-gutter">

    <!--第1栏-->
    <div class="col-md-2">
      <div class="panel panel-default" id="sidebar">
        <div class="panel-heading">
          算法类型
        </div>

        <div class="panel-body">
          <ul class="nav">
            <li><a href="javascript:void(0)" id="apriori" class="algorithmType">Apriori 算法</a></li>
            <li><a href="javascript:void(0)" id="fpgrow" class="algorithmType">FP-Grow 算法</a></li>
            <li><a href="javascript:void(0)" id="eclat" class="algorithmType">Eclat 算法</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!--第2栏-->
    <div class="col-md-3">
      <div class="panel panel-default" id="midCol">
        <div class="panel-heading">
          操作
        </div>

        <div class="panel-body">

          <!--第1行-->
          <div class="row">
            <div class="col-xs-12">

			  <h4 id="algorithmType">Apriori 算法</h4>
			  
			  <span>支持度: 0.05, 0.10, 0.15, 0.20, 0.25</span>
              <select class="form-control" id="datasets">
                <option value="accidents">accidents 数据集(2125条事务)</option>
                <option value="mushroom">mushroom 数据集(8142条事务)</option>
                <option value="T10I4D100K">T10I4D100K 数据集(100000条事务)</option>
              </select>
              <button class="btn btn-default" id="startBtn">开始</button>
              <button class="btn btn-default" id="cancelBtn">取消</button>
            </div>
          </div>
          <hr/>

          <!--第2行-->
          <div class="row">
            <div class="col-xs-12">
            
              <div class="col-xs-3">
                <h4>0.05</h4>
              </div>
              <div class="col-xs-9">
                <div class="fp-state pull-right h4">
                  <span>耗时:</span>
                  <span class="fp-time">0(ms)</span>
                </div>
                <div class="h4 fp-progress" style="display: none;">
                  <div class="progress progress-striped active">
                    <div class="progress-bar progress-bar-success" style="width: 100%;">
                    </div>
                  </div>  
                </div>
              </div>
            
              <div class="col-xs-3">
                <h4>0.10</h4>
              </div>
              <div class="col-xs-9">
                <div class="fp-state pull-right h4">
                  <span>耗时:</span>
                  <span class="fp-time">0(ms)</span>
                </div>
                <div class="h4 fp-progress" style="display: none;">
                  <div class="progress progress-striped active">
                    <div class="progress-bar progress-bar-success" style="width: 100%;">
                    </div>
                  </div>  
                </div>
              </div>
            
              <div class="col-xs-3">
                <h4>0.15</h4>
              </div>
              <div class="col-xs-9">
                <div class="fp-state pull-right h4">
                  <span>耗时:</span>
                  <span class="fp-time">0(ms)</span>
                </div>
                <div class="h4 fp-progress" style="display: none;">
                  <div class="progress progress-striped active">
                    <div class="progress-bar progress-bar-success" style="width: 100%;">
                    </div>
                  </div>  
                </div>
              </div>
            
              <div class="col-xs-3">
                <h4>0.20</h4>
              </div>
              <div class="col-xs-9">
                <div class="fp-state pull-right h4">
                  <span>耗时:</span>
                  <span class="fp-time">0(ms)</span>
                </div>
                <div class="h4 fp-progress" style="display: none;">
                  <div class="progress progress-striped active">
                    <div class="progress-bar progress-bar-success" style="width: 100%;">
                    </div>
                  </div>  
                </div>
              </div>
            
              <div class="col-xs-3">
                <h4>0.25</h4>
              </div>
              <div class="col-xs-9">
                <div class="fp-state pull-right h4">
                  <span>耗时:</span>
                  <span class="fp-time">0(ms)</span>
                </div>
                <div class="h4 fp-progress" style="display: none;">
                  <div class="progress progress-striped active">
                    <div class="progress-bar progress-bar-success" style="width: 100%;">
                    </div>
                  </div>  
                </div>
              </div>
              
            </div>
          </div>

          <!--第3行-->
          <div class="row">
            <div class="col-xs-12">

              <!--                 <code>
                                data data data data
                                data data data data
                                data data data data
                                data data data data

                                data data data data
                              </code> -->
            </div>
          </div>

        </div>
      </div>
    </div>

    <!--第3栏-->
    <div class="col-md-7">
      <div class="panel panel-default" id="content">
        <div class="panel-heading">
          结果分析
        </div>

        <div class="panel-body">

          <!--第1行-->
          <div class="row">
            <div id="lineChart"></div>
          </div>

        </div>

      </div>
    </div>
  </div>
</div>

<!--引入js库-->
<script src="app/lib/jquery.min.js"></script>
<script src="app/lib/highcharts.js"></script>

<!--引入脚本-->
<script src="./app/js/frequentParten.js"></script>

</body>
</html>