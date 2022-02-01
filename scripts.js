$(document).ready(function(){
    var canvas = $('#canvas')[0];
    var ctx = canvas.getContext("2d");
    var cWidth = $('#canvas').width();
    var cHeight = $('#canvas').height();

    var open = true;

    if(typeof gameLoop != "undefined"){
        clearInterval(gameLoop);
    }
    gameLoop = setInterval(game, 650);

    function game(){
        setBackground();
        pacmanAnimation();
    }

    function setBackground(){
        ctx.save();
        ctx.fillStyle = "white";
        ctx.fillRect(0,0, cWidth, cHeight);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0,0, cWidth, cHeight);
        ctx.restore();
    }

    function degreesToRadian(dreg){
        return (dreg * Math.PI)/180;
    }

    function pacmanAnimation(){
        ctx.save();
        ctx.beginPath();
        if (!open){
            ctx.arc(250, 175, 60, degreesToRadian(40), degreesToRadian(320));
            ctx.lineTo(250, 175);
            ctx.lineTo(297, 214);
            open = true;
        }else{
            ctx.arc(250, 175, 60, degreesToRadian(0), degreesToRadian(360));
            ctx.lineTo(250, 175);
            open = false;
        }

        ctx.closePath();

        ctx.fillStyle = "yellow";
        ctx.fill();

        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(240, 135, 10, degreesToRadian(0), degreesToRadian(360));
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
})