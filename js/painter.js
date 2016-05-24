function Painter(canvas, block_, wall_){
    if(!(this instanceof Painter)){
        return new Painter(canvas, block_, wall_);
    }
    
    var ctx = canvas.getContext('2d'),
        block = block_,
        wall = wall_,
        width = canvas.width,
        height = canvas.height;
    
    this.Refresh = function(level){
        if(!level){
            return;
        }
        
        var blockWidth = Math.round(block.width/2) - 2,
        blockHeight = block.height;
        
        var arrW = level.length,
            arrH = arrW ? level[0].length : 0,
            i = 0, 
            j = 0,
            stepX = arrH ?  width / arrH : 0,
            stepY = arrW ? height / arrW : 0;
        
        canvas.width = canvas.width;

        for( i = 0; i < arrW; i++ ){
            for( j = 0; j < arrH; j++ ){
                switch(Math.abs(level[i][j])){
                    case 1:{ 
                        var x = level[i][j] > 0 ? blockWidth+4 : 0;
                       ctx.drawImage( block, x, 0, blockWidth, blockHeight,
                                              stepX * j, stepY * i, stepX, stepY );
                        break;
                    }
                    case 2:{
                        ctx.drawImage( wall, stepX * j, stepY * i, stepX, stepY );  
                    }
                }
            }
        }
    };
}
