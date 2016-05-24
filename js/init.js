var levelGenGame,
    levelGenPainter;
(function(){
    function getMaps(){
        return JSON.parse("[[[0,-1,2,0,-1],[0,2,-1,2,0],[0,0,0,0,-1],[-1,0,2,-1,2],[0,-1,0,2,2],[0,2,-1,0,-1]],[[2,-1,0,0,2,-1],[-1,2,0,-1,2,0],[0,-1,2,0,0,0],[0,0,0,0,2,-1],[-1,2,2,-1,2,0]],[[2,-1,2,-1,2,-1,2],[2,0,2,0,0,0,-1],[2,0,-1,2,2,0,2],[-1,0,0,0,-1,0,-1],[0,0,0,2,2,0,2],[-1,2,2,-1,0,0,-1]],[[0,-1,2,-1,2],[2,0,0,0,0],[-1,2,-1,0,-1],[0,2,2,0,2],[-1,0,0,0,-1],[2,-1,2,0,0]],[[2,-1,2,0,0,-1],[-1,0,0,-1,2,0],[2,-1,2,0,2,0],[0,2,2,0,0,-1],[0,0,-1,0,2,0],[-1,2,2,0,2,-1]],[[-1,0,2,0,-1,0,2],[2,0,0,0,2,0,-1],[2,-1,2,0,2,2,0],[-1,2,0,0,0,0,0],[0,0,0,2,-1,0,2]],[[0,-1,0,-1,0],[-1,2,0,2,-1],[2,0,-1,0,2],[-1,2,0,2,-1],[0,-1,0,-1,0]],[[-1,0,2,-1,2,0],[2,0,0,0,0,-1],[2,2,0,2,2,2],[0,-1,0,0,0,0],[0,2,0,2,0,1],[-1,2,-1,0,2,1],[0,-1,2,0,-1,2]],[[-1,2,-1,0,0,0,-1],[0,0,0,0,2,0,0],[-1,2,0,2,0,0,2],[0,-1,0,2,2,-1,0],[0,2,0,-1,0,2,-1],[0,-1,2,2,0,-1,2]],[[-1,2,0,-1,0,2,-1,0,0,-1],[0,2,-1,2,0,2,2,0,0,0],[0,2,2,2,0,0,-1,0,2,2],[0,2,0,2,-1,0,0,2,2,0],[-1,2,-1,0,0,2,0,0,0,-1],[0,2,0,2,0,-1,2,0,2,0],[-1,2,2,2,0,2,2,-1,2,-1],[0,2,0,-1,0,2,0,0,0,0],[0,2,2,0,2,2,0,2,2,2],[-1,0,0,0,0,-1,0,0,0,-1]]]");
    }
    
    function loadImg(imgs, srcs, callback){    
        var cnt = 0;
        function onLoad(){
            cnt++;
            if(cnt===imgs.length){
                callback();
            }
        }
        
        for(var i = 0; i < imgs.length; i++){
            imgs[i].onload = onLoad;
            imgs[i].src = srcs[i];
        }    
    }
    
    function init(){
        var block = new Image(), wall = new Image();
        loadImg([block, wall], ['img/block.png', 'img/wall.jpg'], startGame);
        
        function startGame(){
            function control(code){
                switch (code){
                    case 37:{
                            game.OnLeft();
                            break;
                    }
                    case 38:{
                            game.OnUp();
                            break;
                    }
                    case 39:{
                            game.OnRight();
                            break;
                    }
                    case 40:{
                            game.OnDown();
                            break;
                    }
                }

                painter.Refresh(game.Level());
                if(game.IsWin()){
                    alert("Победа! Вы сделали это за "+ game.StepCount() + " ходов");
                    curLvl++;
                    if(curLvl < maps.length){
                        game.SetLevel(maps[curLvl]);
                        painter.Refresh(game.Level());
                    }else{
                        alert("Вы прошли все уровни!")
                    }
                }
            }

            var canvas = document.querySelector('.gameField');
            if(!canvas){
                alert("Where my canvas!? I can't looking it");
                return;
            }

            var width = window.innerWidth > window.innerHeight ? Math.round(window.innerHeight * 0.9) :
                                                                 Math.round(window.innerWidth * 0.9);

            canvas.width = width;
            canvas.height = width;
            canvas.style.width = width + 'px';
            canvas.style.height = width +'px';

            var maps = getMaps(),
                curLvl = 0;

                game = new Game(maps[curLvl]),
                painter = new Painter(canvas, block, wall),
                touchX = 0, touchY = 0;

            levelGenGame = game;
            levelGenPainter = painter;

            painter.Refresh(game.Level());

            document.addEventListener('touchstart', function(e){
                touchX = e.touches[0].screenX;
                touchY = e.touches[0].screenY;

            });

            document.addEventListener('touchend', function(e){
                touchX = touchX - e.changedTouches[0].screenX;
                touchY = touchY - e.changedTouches[0].screenY;
                if(Math.abs(touchX) > Math.abs(touchY)){
                   if(touchX > 0){
                      control(37);
                   } else{
                      control(39);
                   }
                }else{
                    if(touchY > 0){
                      control(38);
                    }else{
                      control(40);
                    }
                }

            });

            window.addEventListener('keydown', function(e){
                control(e.keyCode);
            });
        }
    }
    
    window.addEventListener('load', init);
})();