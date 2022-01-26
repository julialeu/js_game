$(document).ready(function(){
    var canvas = $('#canvas')[0];
    var cWidth = $('#canvas').width();
    var cHeight = $('#canvas').height();

    var ctx = canvas.getContext("2d");

    function setBackground(){
        ctx.save();
        ctx.fillStyle = "white";
        ctx.fillRect(0,0, cWidth, cHeight);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0,0, cWidth, cHeight);
        ctx.restore();
    }

    function setPlayer(color, x, y, width, height){
        ctx.save();
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
        ctx.restore();
    }

    setBackground();

    setPlayer("red",10,160,20,20);

    setPlayer("blue", 470, 160, 20,20 );

    console.log(ctx);
})