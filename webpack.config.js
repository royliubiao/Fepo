const Dev = require('./config/webpack.dev.js');
const Prod = require('./config/webpack.prod.js');

//webpack 判断用哪个版本进行编译
switch (process.env.NODE_ENV) {
    case 'dev'://开发版本时
    module.exports = Dev;
    break;
    case 'prod'://上线版本
    module.exports = Prod;
    break;
    default:
    module.exports = Dev;
    
}