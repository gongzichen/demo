/**
 * Created by asus on 2017/3/11.
 */

//小鸟类别
(function(){
    window.Brid = Class.extend({
        init :function() {
            this.x = game.canvas.width * 0.5;
            this.y = 100;
            this.width = 85;
            this.height = 60;
            //小鸟的状态
            this.state =0;
            // 煽翅膀的频率
            this.sinRate = 5;
            //下落的增加量
            this.dy=0;
            // 下落的帧数
            this.dropFrame =  game.frameUtil.currentFrame;
            // 旋转的角度
            this.rotateAngle = 0;
            // 鸟的状态  0 往下落地  1 往上飞
            this.birdState = 0;
            // 空气阻力
            this.datleY = 1 ;
            // 监听点击
            this.bindLinstenClick();
            // 记录鸟是否死亡
            this.die = false;
            this.animationIndex = 0;

        },

        //绘制  增加角度
        render:function(){
            if(this.die){
                // 死亡后 动画
                var sWidth = 325;
                var sHeight = 138;

                //计算行和列
                var row = parseInt(this.animationIndex / 5);
                var col = this.animationIndex % 5;
                //绘制洒热血
                game.ctx.drawImage(game.allImageObj['blood'], col * sWidth, row * sHeight, sWidth,
                    sHeight, this.x -100, this.y,sWidth,sHeight);
                //绘制游戏结束
                game.ctx.drawImage(game.allImageObj['gameover'], (game.canvas.width - 626) * 0.5,
                    (game.canvas.height - 144) * 0.5 );

            }


            game.ctx.save();
            game.ctx.translate(this.x + this.width * 0.5 ,this.y + this.height * 0.5);
            game.ctx.rotate(this.rotateAngle * Math.PI/180);
            game.ctx.translate(-(this.x + this.width * 0.5) ,-(this.y + this.height * 0.5));
            game.ctx.drawImage(game.sallImageObj['bird'],this.state * this.width ,
                0,this.width,this.height,this.x,this.y,this.width,this.height);
            game.ctx.restore();
        },
        //更新
        update:function(){
            //每5S 煽动一次  翅膀动画
            if( game.frameUtil.currentFrame % this.sinRate == 0 ){
                this.state++;
                if(this.state == 2){
                    this.state = 0;
                }
            }

            //判定鸟的状态
            if(this.birdState ==  0 ) {
                // 自由落体 下落高度: h= 1/2 *g*Math.pow(t, 2)
                this.dy = 0.5 * 0.01 * 9.8 * Math.pow(game.frameUtil.currentFrame - this.dropFrame, 2);
                this.rotateAngle +=1;
            }else if(this.birdState == 1){
                //往上飞
                this.datleY++; // 空气阻力
                this.dy = -15 + this.datleY;
                if(this.dy >= 0){
                    this.birdState = 0; // 更改鸟的状态
                    // 同一帧数
                    this.dropFrame = game.frameUtil.currentFrame;
                }
            }

            //更新
            this.y +=this.dy;

            //上空限定
            if(this.y <=0 ){
                this.y = 0;
            }

            //撞到地板 ,结束游戏
            if(this.y >= game.canvas.height - this.height - 48){
                game.gameOver();
            }
        },

            //监听点击
            bindLinstenClick:function(){
                var self = this;
                game.canvas.addEventListener('mousedown',function(){
                    // 更改状态
                    self.birdState = 1;
                    // 添加仰角
                    self.rotateAngle = -25;
                    // 空气阻力
                    self.datleY =1;
                })
            }
        })
})();