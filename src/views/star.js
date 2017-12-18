module.exports = function(templateParams) {
    var _cssList = ['vendor']; //获取css
    var webAssetsHelp = require('./webAssetsHelp.js')(templateParams, _cssList );
    //以字符串的形式拼写html模板
    var _html = "{% extends './layout.html' %}" +
        "{% block title %}{{title}}{% endblock %}" +
        "{% block styles %}" +
        webAssetsHelp.styles +
        "{% endblock %}" +
        "{% block content %}{% include '../widget/star.html' %}{% endblock %}" +
        "{% block script %}" +
        webAssetsHelp.scripts +
        "{% endblock %}" ;
        return _html;
}