/**
 * Created by asus on 2017/3/11.
 */
(function(){
    window.StaticSource = Class.extend({
        init: function(){
            //保存所有的dom节点
            this.allImageObj = {};
        },
        // 获取本地资源方法, 返回所有的DOM 对象  ch
        loadImage : function(jsonUrl,callBck){
            // 备份指针
            var self = this;
            //请求对象
            var xhr  = new XMLHttpRequest();
            // AJAX 三步
            xhr.open('get',jsonUrl);
            xhr.send(null);
            // 判断影响状态
            // 当 readyState 等于 4 状态未2000 代表就绪
            xhr.onreadystatechange = function(){
                // 请求完成  响应准备就绪
                if(xhr.readyState == 4 && xhr.status == 200){
                    //已经加载的图片个数
                    var loadImageCount = 0;
                    // 获取请求的数据
                    var  responseText = xhr.responseText;
                    // json 解析  JSON 需要大写
                    var responseJson = JSON.parse(responseText);
                    //获取数组
                    var dataArr = responseJson.images;
                    //遍历数组
                    for(var i=0;i<dataArr.length;i++){

                        //创建image对象i
                        var image = new Image();
                        image.src = dataArr[i].src;
                        image.index = i;
                        //图片加载完成后 保存对象
                        image.onload = function(){
                            var name = dataArr[this.index].name;
                            loadImageCount++;
                            // 保存对象
                            self.allImageObj[name] = this;
                            //回调
                            callBck(self.allImageObj, dataArr.length, loadImageCount);
                        }
                    }
                }
            }
        }
    });
})();