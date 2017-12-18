//引用request-promise
import rpA from 'request-promise';
//创建父类方法
class indexModel{
		constructor(ctx){
			this.ctx = ctx;
		}
		//创建requset方法
		updateNum(){
			const options = {
				url:'http://localhost/praise.php',
				method:'GET'
			}
			//promise发起请求 并判断返回结果
			return new Promise((resolve,reject)=>{
				rpA(options).then(function (result) {
					const info =JSON.parse(result);
					if (info) {
						resolve({data:info.result})
					}else{
						reject({});
					}
				})
			});
		}
}
export default indexModel;