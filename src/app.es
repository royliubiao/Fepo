import Koa from 'koa';
//路由
import router from 'koa-simple-router';
//引用html模板
import render from 'koa-swig';
//引用co
import co from 'co';
//引用静态资源
import serve from 'koa-static';
//引用路由
import initController from './controllers/initController';
//引用babel-register
import babel_co from 'babel-core/register';
//引用babel-polyfill
import babel_po from 'babel-polyfill';
//引用config
import config from './config/config';
const app = new Koa();
//执行路由
initController.init(app, router);
//koa-swig模板配置
app.context.render = co.wrap(render({
    root: config.get('viewDir'),
    autoescape: true,
    cache: 'memory', // disable, set to false 
    ext: 'html',
    writeBody: false
}));
// 静态资源引用路径
app.use(serve(config.get('staticDir')));

app.listen(config.get('port'),()=>{
	console.log('server started');
});
export default app;