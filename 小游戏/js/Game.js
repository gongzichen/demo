(function(){
   window.Game = Class.extend({
       init:function(option){
           option = option || {};
            // 备份指针
           var self = this;
           // 1.fps  60帧数
           this.fps = option.fps|| 50;
           // 实例化帧工具对象
           this.frameUtil = new FrameUtil();
          // 获取canvas上下文
           this.canvas = document.getElementById(option.canvasId);
           this.ctx = this.canvas.getContext('2d');
           // 保存返回的数据
           this.sallImageObj = {};
           /*  ---------------加载本地数据--------------  */
           this.staticSource = new StaticSource();
           // 加载图片资源 返回所有的dom 对象 所有的图片个数  传入json地址 和回调函数
           this.staticSource.loadImage('r.json', function (allImageObj, allImageCount, loadImageCount) {
               if(allImageCount == loadImageCount){
                   self.sallImageObj =  allImageObj;
                   //运行游戏
                   console.log(self.sallImageObj  + '*****-****');
                   self.run();
               }
           });
           // 记录游戏是否在运行
           this.isGameOver = false;
       },
       /*------------- 游戏开始-------------*/
       //游戏开始
       run:function () {
           var self = this;
           //定时器
           setInterval(function () {
               self.runloop();
           }, 1000 / self.fps ); //每一帧的时间

           //创建房子
           this.fangzi = new Background({
               img:self.sallImageObj['fangzi'],
               x:0,
               y:self.canvas.height - 256 -100,
               width:300,
               height:256,
               speed : 2
           });

           //创建树
           this.shu = new Background({
               img:self.sallImageObj['shu'],
               x:0,
               y:self.canvas.height - 216 - 48,
               width:300,
               height:216,
               speed:3
           });

           //创建地板
           this.diban= new Background({
               img:self.sallImageObj['diban'],
               x:0,
               y:self.canvas.height - 48,
               width:48,
               height:48,
               speed:4
           });

           // 创建水管道数组
           this.pipeArr = [new Pipe()];

           //创建小鸟
           this.bird = new Brid();
       },
       //运行循环
       runloop : function(){
           // 绘制文字
           this.ctx.clearRect(0,0,this.canvas.width,
               this.canvas.height);
           // 计算真是的帧数
           this.frameUtil.countFps();

           this.ctx.fillText('FPS /' + this.frameUtil.realFps, 15, 15);
           this.ctx.fillText('FNO /' + this.frameUtil.currentFrame, 15, 30);
           // 绘制和更细树
           this.fangzi.update();
           this.fangzi.render();

           //创建树
           this.shu.update();
           this.shu.render();

           //更新和绘制地板
           this.diban.update();
           this.diban.render();

           // 创建水管
           if(this.frameUtil.currentFrame %100 == 0){
               //创建一个水管
               this.pipeArr.push(new Pipe());
           }
           // 更新和绘制水管
           for(var i =0; i < this.pipeArr.length ;i++){
               this.pipeArr[i].update();
               this.pipeArr[i].render()
           }
           //更新和绘制小鸟
            this.bird.update();
            this.bird.render();
       },
       //游戏停止
       pause:function(){
       },

       //游戏结束
       gameOver :function(){
           //停止背景
           this.fangzi.pause();
           this.shu.pause();
           this.diban.pause();
           //停止管道
           for (var i=0; i< this.pipeArr; i++){
               this.pipeArr[i].pause();
           }


           //更改记录游戏是否运行属性
           this.isGameOver = true;
           //通知小鸟死亡
           this.bird.die = true;
       }

   });
})();
