//Класс Game - отвечает за поле игры и 
//его обновление соответственно правилам
function Game(level_){
    if(!(this instanceof Game)){
        return new Game(level_);
    }
    
    if(!level_){
        throw {
            message: "Level not loaded"
        };
        return;
    }
    
    var isWin = 0, stepCount = 0,    
    level = level_;
    this.Level = function(){ return level; };
    this.IsWin = function(){ return isWin; };
    this.StepCount = function() { return stepCount; };
    
    this.SetLevel = function(level_){
        level = level_;
        isWin = 0;
        stepCount = 0;
    };
    
    this.OnUp = function(){
        update(0, -1);
    };
    
    this.OnDown = function(){
        update(0, 1);
    };
    
    this.OnLeft = function(){
        update(-1, 0);
    };
    
    this.OnRight = function(){
        update(1, 0);
    };
        
    function isHappy(i, j){     
        if( i > 0 && Math.abs(level[i - 1][j]) === 1 ){   
            return 1;
        }

        if( i < level.length - 1 && Math.abs(level[i + 1][j]) === 1 ){   
            return 1;
        }

        if( j > 0 && Math.abs(level[i][j - 1]) === 1 ){   
            return 1;
        }

        if( j < level[i].length - 1 && Math.abs(level[i][j + 1]) === 1 ){   
            return 1;
        }

        return -1;
    }
    
    
    function update(x, y){ 
        var endI = (level.length - 1),
            endJ = (level[0].length - 1);
    
        function updatePoint(i, j, x, y){
            var newI = 0,
                newJ = 0;
        
            if(Math.abs(level[i][j]) === 1){
                newI = i + y;
                newJ = j + x;
                if(newI >= 0 && newI <= level.length - 1){
                    if(newJ >= 0 && newJ <= level[i].length - 1){
                        if(level[newI][newJ] === 0){
                            level[i][j] = 0;
                            level[newI][newJ] = -1;  
                        }
                    }
                }           
            }
        }
            
        if(x > 0){
            for(var j = endJ - 1; j >= 0; j--){
                for(var i = 0; i <= endI; i++){
                    updatePoint(i, j, x, 0);
                }
            }
            
            x = 0;
        }
        
        if(x < 0){
            for(var j = 1; j <= endJ; j++){
                for(var i = 0; i <= endI; i++){
                    updatePoint(i, j, x, 0);
                }
            }
            
            x = 0;
        }
        
        if(y > 0){
            for(var i = endI-1; i >= 0; i--){
                for(var j = 0; j <= endJ; j++){
                    updatePoint(i, j, 0, y);
                }
            }
            y = 0;
        }
        
        if(y < 0){
            for(var i = 1; i <= endI; i++){
                for(var j = 0; j <= endJ; j++){
                    updatePoint(i, j, 0, y);
                }
            }
        }
        
        var happy = true;
        for(var i = 0, row = level.length; i < row; i++){
            for(var j = 0, col = level[i].length; j < col; j++){
                if(Math.abs(level[i][j]) === 1){
                    level[i][j] = isHappy(i, j);
                    if(level[i][j] === -1){
                        happy = false;
                    }
                }
            }
        }
        
        stepCount++;
        if(happy){
            isWin = true;
        }
    }
}

