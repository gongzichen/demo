/**
 * Created by asus on 2017/3/11.
 */
(function(){
    window.Pipe = Class.extend({
        init:function(){
            //方向 0口 往下  1 口往上
            this.dir = _.random(0,1);
            //水管的宽度  与高度
            this.width = 148;
            this.height = _.random(80,game.canvas.height * 0.5);
            this.x = game.canvas.width;
            this.y = this.dir == 0 ? 0 : game.canvas.height -  48 - this.height;
            //速度
            this.speed = 4;
        },
        //绘制函数
        render:function(){
            // 根据口方向
            if(this.dir == 0){
                // 口在下面
                game.ctx.drawImage( game.sallImageObj['pipe1'],0 ,1664 - this.height,this.width , this.height,this.x,
                this.y,this.width,this.height);
            }else if(this.dir == 1){
                game.ctx.drawImage( game.sallImageObj['pipe0'],0,0,this.width , this.height , this.x  , this.y ,this.width,
                this.height);
            }
        },

        // 函数更新
        update:function(){
            this.x -= this.speed;
            if(this.x < -this.width){
                //销毁管道
                game.pipeArr = _.without(game.pipeArr , this);
            }
            //碰撞检测
            if( (game.bird.x > this.x - game.bird.width) && (game.bird.x < this.x + this.width)){
                //判断方向  向下
                if(this.dir == 0){
                    if(game.bird.y < this.height){
                        game.gameOver();
                    }
                }else if(this.dir == 1){
                    if(game.bird.y > game.canvas.height - this.height -48 - game.bird.height){
                        game.gameOver();
                    }
                }
            }
        },

        pause:function(){
            this.speed = 0;
        }

    })
})();