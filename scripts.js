$(document).ready(function(){
    var canvas = $('#canvas')[0];
    var cWidth = $('#canvas').width();
    var cHeight = $('#canvas').height();
    var ctx = canvas.getContext("2d");

    var player = {direction: "down", positionX: 100, positionY: 100, width: 15, height: 15};

    function init(){
        if(typeof gameLoop != "undefined"){
            clearInterval(gameLoop);
        }
        gameLoop = setInterval(main, 500);
    }
    $(document).keydown(function (event){
        var key = event.which;

        switch (key){
            case 39:
                player.direction = "right";
                break;
            case 37:
                player.direction = "left";
                break;
            case 38:
                player.direction = "top";
                break;
            case 40:
                player.direction = "down";
                break;



        }
    })

    function main(){
        setBackground();
        movePlayer();
        drawPlayer();
    }

    function setBackground(){
        ctx.save();
        ctx.fillStyle = "white";
        ctx.fillRect(0,0, cWidth, cHeight);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0,0, cWidth, cHeight);
        ctx.restore();
    }
    setBackground();

    function drawPlayer(){
        ctx.save();
        ctx.fillStyle = "blue";
        ctx.fillRect(player.positionX, player.positionY, player.width, player.height);
        ctx.restore();
    }

    function movePlayer(){
        switch (player.direction){

            case "right":
                player.positionX += 10;
                break;

            case "left":
                player.positionX -= 10;
                break;

            case "top":
                player.positionY -= 10;
                break;

            case "down":
                player.positionY += 10;
                break;

            default:
                player.positionX = player.positionX;
                player.positionY = player.positionY;
        }
    }

    init();

})