//构造函数

function ColorBall(option){
    this._init(option);
}

ColorBall.prototype = {
     _init: function (option){
         option = option|| {};
         // 属性
         this.parentId = option.parentId;
         this.x = option.x || 0;
         this.y = option.y || 0;
         this.r = 50;
         this.bgColor = option.bgColor || 'red';

        //三个变化的属性
         this.dX = _.random(-5,5);
         this.dY = _.random(-5,5);
         this.dR = _.random(1,3);
         console.log(this.dR, this.dX, this.dY);
     },

    render:function(){
        //添加元素
        var parenNode = document.getElementById(this.parentId);
        var childNode = document.createElement('div');
        parenNode.appendChild(childNode);
        //设置位置
        parenNode.style.position = 'relative';
        childNode.style.position = 'absolute';

        childNode.style.left = this.x +'px';
        childNode.style.top = this.y +'px';
        childNode.style.width = this.r +'px';
        childNode.style.height = this.r +'px';
        childNode.style.borderRadius = '50%';
        childNode.style.backgroundColor = this.bgColor;
    },

    update:function(){
        this.x +=this.dX;
        this.y +=this.dY;
        this.r -=this.dR;

        if(this.r < 0){
            this.r = 0;
            // 在数组中移除
            ballArr = _.without(ballArr,this);
        }
    }
}