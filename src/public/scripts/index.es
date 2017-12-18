require('../styles/index.less');
/*父类*/
class Praise {
    constructor() {}
    clickBtn() {
        // Make a request for a user with a given ID 
        axios.get('/index/update')
            .then(function(response) {
                console.log(response);
            })
            .catch(function(response) {
                console.log(response);
            });
    }
}
/*Thumb继承父类*/
class Thumb extends Praise{
    constructor(){
        super();
    }
}
/*star继承父类*/
class Star extends Praise{
    constructor(){
        super();
    }
}
export {Thumb,Star ,Praise};