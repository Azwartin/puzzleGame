(function(){
    var row = 3,
        col = 3,
        canvas,
        rowIn, colIn,
        btnGreed, btnLevel, btnFromJSON, 
        code;
        
    function drawGrid(){
        var stX = canvas.width/col,
            stY = canvas.height/row,
            i;
        
        var ctx = canvas.getContext('2d');
        
        ctx.strokeStyle = 'rgb(0, 0, 0)';
        ctx.beginPath();
        
        for(i = 1; i < row; i++){
            ctx.moveTo(0, stY * i);
            ctx.lineTo(stX * col, stY * i);
        }
        
        for(i = 1; i < col; i++){
            ctx.moveTo(stX * i, 0);
            ctx.lineTo(stX * i, stY * row);
        }
        
        ctx.closePath();
        ctx.stroke();
    }
    
    function onclick(e){
        var br = canvas.getBoundingClientRect(),
            mouseX = e.clientX  - br.left,
            mouseY = e.clientY - br.top,
            stX = canvas.width/col,
            stY = canvas.height/row,      
            i = Math.floor(mouseX / stX),
            j = Math.floor(mouseY / stY),
            level = levelGenGame.Level();
        
        level[j][i]++;
        level[j][i] %= 3;
        levelGenPainter.Refresh(levelGenGame.Level());
        drawGrid();
    }
    
    function setMap(row, col){
        var map = [];
            for(var i = 0; i < row; i++){
                map.push([]);
                for(var j = 0; j < col; j++){
                    map[i][j] = 0;
                }
            }
            
            levelGenGame.SetLevel(map);
    }
    
    function createGreed(){
        if(rowIn.disabled == 0){
            rowIn.disabled = true;
            colIn.disabled = true;
            row = rowIn.value;
            col = colIn.value;
            
            setMap(row, col);
            levelGenPainter.Refresh(levelGenGame.Level());
        }
        else{
            rowIn.disabled = false;
            colIn.disabled = false;
        }
    }
    
    function showLevelCode(){
        var map = levelGenGame.Level(),
            lvlCode = '[';
        
        for(var i = 0, len = map.length; i < len; i++){
            lvlCode+='[' + map[i].join() + ']' + (i === len - 1 ? '' : ',') ;
        }
        
        lvlCode+=']';
        
        if(code){
            code.innerHTML = lvlCode;
        } else{
           alert(lvlCode);
        }
    }
    
    function setFromJSON(){
        var json = window.prompt('json', ''),
            map = JSON.parse(json);
            row = map.length;
            col = map[0].length;
            levelGenGame.SetLevel(map);
            levelGenPainter.Refresh(levelGenGame.Level());
        
    }
    
    function init(){
        canvas = document.querySelector('.game_field');
        
        if(!canvas){
            alert("Where is my canvas!? I can't looking it");
            return;
        }
        
        canvas.addEventListener('click', onclick);
        
        rowIn = document.querySelector('.controls .row'),
        colIn = document.querySelector('.controls .col'),
        btnGreed = document.querySelector('.controls .btnGreed'),
        btnLevel = document.querySelector('.controls .btnLevel');
        btnFromJSON = document.querySelector('.controls .btnFromJSON');
        
        code = document.querySelector('.levelCode');
        
        if(!(rowIn && colIn && btnGreed && btnLevel)){
            alert("Where is my controls!? I can't looking one of it");
            return;
        }
        
        row = rowIn.value;
        col = colIn.value;
        setMap(row, col);
        levelGenPainter.Refresh(levelGenGame.Level());
        drawGrid();
        btnGreed.addEventListener('click', createGreed);
        btnLevel.addEventListener('click', showLevelCode);
        btnFromJSON.addEventListener('click', setFromJSON);
        
    }
    
    window.addEventListener('load', init);
})();