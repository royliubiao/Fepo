module.exports = function(templateParams) {
    var _cssList = ['vendor']; //获取css
    var webAssetsHelp = require('./webAssetsHelp.js')(templateParams, _cssList);
    //以字符串的形式拼写html模板
    var _html = "{% extends './layout.html' %}" +
        "{% block title %}My Praise{% endblock %}" +
        "{% block styles %}" +
        webAssetsHelp.styles +
        "{% endblock %}" +
        "{% block content %}{% include '../widget/index.html' %}{% endblock %}" +
        "{% block script %}" +
        // webAssetsHelp.scripts +
        "<script>" +
        "(()=>{var flag = false;" +
        "var jsStorages = [" + webAssetsHelp.storages + "];" +
        "for (var i = 0; i <jsStorages.length; i++) {" +
        "let num = jsStorages[i];" +
        "if (localStorage.getItem(num)) {" +
        //如果localStorage中有就拿出来加到head中去
        "$('<scr'+'ipt> '+localStorage.getItem(num)+'</scr'+'ipt>').attr({type:'text/javascript',id:i}).appendTo($('head').remove('#'+i));" +
        "}else{" +
        //如果localStorage中没有就webpack中去拿
        //    "$.getScript({"+
        //     "url:num,"+
        //     "success:function(data){"+
        //         "localStorage.setItem(num,data)"+
        //     "}"+
        // "});"+
        //lazyload
        "localStorage.clear();flag=true;" +//如果没有则清楚localStorage 并设置哨兵为true
        "for (let q = 0 ;q < jsStorages.length; q++) {"+
            "let jsArr = jsStorages[q];"+
            "axios.get(jsArr).then((data) => {"+
                "localStorage.setItem(jsArr, data.data)"+
            "})"+
       "}break;"+
    "}" +
    "}" +
    "if (flag) {"+//当没有且通过axios拿到全部今天文件后启用LazyLoad来加载
        "LazyLoad.js(jsStorages, function() {});"+
    "}"+
    "})()" +
    "</script>" +
    "{% endblock %}";
    return _html;
}