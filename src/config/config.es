//引用path路径
import path from 'path';
const config = new Map();

//端口
config.set('port',3000);
//引用静态资源文件路径
config.set('staticDir',path.join(__dirname,'..'));
//引用html模板文件路径
config.set('viewDir',path.join(__dirname,'..','views'));

export default config