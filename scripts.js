$(document).ready(function(){
    var canvas = $('#canvas')[0];
    var cWidth = $('#canvas').width();
    var cHeight = $('#canvas').height();
    var ctx = canvas.getContext("2d");

    var score = 0;
    var timer = 0;
    var player = {direction: "stay", positionX: (cWidth/2)-7, positionY: (cHeight/2)-7, width: 15, height: 15};
    var coin = {draw: false, positionX: 0, positionY: 0, width: 10, height: 10};

    var enemy = new Array(2);
    var numberOfEnemies = 1;

    for(var i = 0; i < enemy.length; i++){
        enemy[i] = {direction: "down", positionX: 0, positionY: 0, width: 30, height: 20};
    }

    function init(){
        if(typeof gameLoop != "undefined"){
            clearInterval(gameLoop);
        }
        gameLoop = setInterval(main, 30);
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
        coinTimer();
        coinProbability();
        borderCollision();
        coinCollision();
        movePlayer();
        moveEnemies();
        drawPlayer();
        drawEnemies(numberOfEnemies);
        drawCoin();
        drawScore();
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

    function drawScore(){
        var text = "Score: " + score;
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(text, 10, 30);
    }

    function drawPlayer(){
        ctx.save();
        ctx.fillStyle = "blue";
        ctx.fillRect(player.positionX, player.positionY, player.width, player.height);
        ctx.restore();
    }

    function drawEnemies(number){
        ctx.save();
        for(var i = 0; i < number; i++){
            ctx.fillStyle = "red";
            ctx.fillRect(enemy[i].positionX, enemy[i].positionY, enemy[i].width, enemy[i].height);
        }
        ctx.restore();
    }

    function drawCoin(){
        if(coin.draw){
            ctx.save();
            ctx.fillStyle = "yellow";
            ctx.fillRect(coin.positionX, coin.positionY, coin.width, coin.height);
            ctx.strokeStyle = "black";
            ctx.strokeRect(coin.positionX, coin.positionY, coin.width, coin.height);
            ctx.restore();

            if(timer > 300){
                coin.draw = false;
            }
        }
    }

    function movePlayer(){
        switch (player.direction){

            case "right":
                player.positionX += 3;
                break;

            case "left":
                player.positionX -= 3;
                break;

            case "top":
                player.positionY -= 3;
                break;

            case "down":
                player.positionY += 3;
                break;

            case "stay":
                player.positionX = player.positionX;
                player.positionY = player.positionY;
                break;
        }
    }

    function moveEnemies(){

        for(var i = 0; i < numberOfEnemies; i++){
            switch (enemy[i].direction){
                case "top":
                    enemy[i].positionY -= 2;
                    break;

                case "down":
                    enemy[i].positionY += 2;
                    break;

                case "stay":
                    enemy[i].positionX = enemy[i].positionX;
                    enemy[i].positionY = enemy[i].positionY;
                    break;
            }
        }

    }

    function borderCollision(){

        //Collision for player
        if(player.positionY <= 5 && player.direction == "top"){
            player.positionY = 0;
            player.direction = "stay";
        }
        else if(player.positionX <= 5 && player.direction == "left"){
            player.positionX = 0;
            player.direction = "stay";
        }
        else if(player.positionY + player.height >= cHeight-5 && player.direction == "down"){
            player.positionY = cHeight - player.height;
            player.direction = "stay";
        }
        else if(player.positionX + player.height >= cHeight-5 && player.direction == "right"){
            player.positionX = cWidth - player.width;
            player.direction = "stay";
        }

        //collision for enemies

        for(var i = 0; i < numberOfEnemies; i++){
            if(enemy[i].positionY <= 5 && enemy[i].direction == "top"){
                enemy[i].positionY = 0;
                enemy[i].direction = "down";
            }
            else if(enemy[i].positionY + enemy[i].height >= cHeight-5 && enemy[i].direction == "down") {
                enemy[i].positionY = cHeight - enemy[i].height;
                enemy[i].direction = "top";
            }
        }

    }

    function coinCollision(){
        if(coin.draw &&
            player.positionX + player.width > coin.positionX &&
            player.positionX < coin.positionX + coin.width &&
            player.positionY < coin.positionY + coin.height &&
            player.positionY + player.height > coin.positionY
        ){
            coin.draw = false;
            score += 10;
        }
    }

    function coinProbability(){
        if(!coin.draw && Math.floor((Math.random()*400)+1) <4){
            coin.positionX = Math.floor(Math.random()*(cWidth-coin.width));
            coin.positionY = Math.floor(Math.random()*(cHeight-coin.height));
            coin.draw = true;
        }
    }
    function coinTimer(){
        if(coin.draw){
            timer++;
        }else{
            timer = 0;
        }
    }

    init();

})