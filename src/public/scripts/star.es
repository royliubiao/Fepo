// 应用index.es
import {Star} from './index.es';
//new Praise
const hand = new Star();
//自定义x-tag
xtag.register('x-star', {
    content: '<div class="warp">' +
        '<div class="hand-outer" id="starOut">' +
         '<div  id="star"></div>' +
        '</div>' +
        '<div  class="love-content">' +
        '<div id="animation" class="love"></div>' +
        '</div>' +
        '</div>',
    methods: {
        Praise: function() {
            let _this = this; //这里this指的是xtag.register
            hand.clickBtn(); //axios后端数据进行请求
            let animation = _this.querySelector("#animation");
            animation.className = "love love-show";
            setTimeout(function() {
                animation.className = "love";
            }, 800)
        }
    },
    events: {
        //点击
        click: function(e) {
            let _this = this;
            //事件稀释
            if (e.target.id == "starOut" || e.target.id == "star" ) {
                let t = "";
                if (t) {
                    clearTimeout(t)
                };
                t = setTimeout(() => {
                    _this.Praise()
                }, 500)
            }
        }
    }
});