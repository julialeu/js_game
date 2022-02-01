$(document).ready(function(){
    var x = 0;
    var gameLoop = window.setInterval(doStuff, 1000);
    function doStuff(){
        if(x < 10) {
            document.write('x = ' + x + "</br>");
            x++;
        }else{
            clearInterval(gameLoop);
            document.write("Stop!");
        }
    }

})

