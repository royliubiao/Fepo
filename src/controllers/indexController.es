//引入indexModel文件 链接php的方法
import indexModel from '../models/indexModel'
const indexController = {
    index() {
        return async(ctx, next) => {
            ctx.body = await ctx.render('index.html', {
                title: '大拇指点赞'
            })
        }
    },
    update() {
        return async(ctx, next) => {
            const indexM = new indexModel(ctx);
            ctx.body = await indexM.updateNum();
        }
    },
    star() {
        return async(ctx, next) => {
            if (ctx.header['x-pjax']) {
                ctx.body = "<x-star></x-star>";
            } else {
                ctx.body = await ctx.render('star.html', {
                    title: '星星组件'
                })
            }
        }
    },
    thumb() {
        return async(ctx, next) => {
            if (ctx.header['x-pjax']) {
                ctx.body = "<x-praise></x-praise>";
            } else {
                ctx.body = await ctx.render('index.html', {
                    title: '大拇指组件'
                })
            }
        }
    },
    advertising() {
        return async(ctx, next) => {
            ctx.body = '<div style="background:#3da0e0; height:150px;color:#fff;text-align:center;line-height:150px">这是大幅广告.......</div>'
        }
    }
}
export default indexController;