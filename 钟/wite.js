/**
 * Created by asus on 2017/3/9.
 */
function Wire(option){
    this._init(option);
}
Wire.prototype ={
    constructor: Wire,
    _init: function (option) {
        option = option || {};
        this.color = option.color;
        this.w = option.w;
        this.x0 = option.x0;
        this.y0 = option.y0;
        this.deg = option.deg;
        this.mT = option.mT;
        this.lT = option.lT;
    },

    draw: function (ctx) {
        ctx.beginPath();
        ctx.save();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.w;
        ctx.translate(this.x0, this.y0);
        ctx.rotate(this.deg * Math.PI / 180);
        ctx.moveTo(0, this.mT);
        ctx.lineTo(0, this.lT);
        ctx.stroke();
        //ctx.closePath();
        ctx.restore();
    },
    update:function(test){
        this.deg = test;
    }
}

/************画圆************/
function  Round(option){
    this._init(option);
}
Round.prototype={
    constructor:Round,
    _init:function(option){
        option = option||{},
            this.x0 = option.x0 || 5,
            this.y0 = option.y0 || 5,
            this.r = option.r || 5,
            this.color = option.color || 'black',
            this.w = option.w

    },
    drawRound:function(ctx){
        ctx.beginPath();
        ctx.arc(this.x0,this.y0,this.r,0,2*Math.PI);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.w;
        ctx.stroke();
    }
}
