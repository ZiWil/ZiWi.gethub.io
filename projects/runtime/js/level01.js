var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'sawblade',x:400,y:groundY},
                {type: 'sawblade',x:600,y:groundY},
                {type: 'sawblade',x:800,y:groundY},
                {type: 'sawblade',x:900,y:groundY},
                {type: 'enemy',x:500,y:groundY-50},
                {type: 'enemy',x:800,y:groundY-50},
                {type: 'enemy',x:1500,y:groundY-50},
                {type: 'enemy',x:100,y:groundY},
                {type: 'enemy',x:300,y:groundY},
                 {type: 'naruto',x:1600,y:groundY-50},
            ]   
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
 
        for (var i= 0; i < levelData.gameItems.length; i++){
            var gameItem = levelData.gameItems[i];
             
             if ( gameItem.type === 'sawblade'){
                 createSawBlade(gameItem.x, gameItem.y);
             }
             if ( gameItem.type === 'enemy'){
                 createEnemy(gameItem.x,gameItem.y);                        
             }
             if ( gameItem.type === 'naruto'){
                 createReward(gameItem.x,gameItem.y);                        
             }
        }
 
 
               
        function createSawBlade(x,y) {
             var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);    
            var obstacleImage = draw.bitmap('img/sawblade.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }  

      
      
       function createEnemy(x, y) {
            var enemy =  game.createGameItem('enemy',25);
            var redSquare = draw.rect(50,50,'black');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            
            enemy.x = (x);
            enemy.y = (y);
            enemy.velocityX = -10;
            
            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-5);
       
            };

            enemy.onProjectileCollision = function(){
                enemy.fadeOut();
                game.increaseScore(100);
            }
            game.addGameItem(enemy);
        } 

        function createReward(x,y) {
            var hitZoneSize = 25;
            var naruto = game.createGameItem('naruto', hitZoneSize);
            naruto.x = x;
            naruto.y = y;
            naruto.velocityX = -10;
            
            game.addGameItem(naruto);    
            var narutoImage = draw.bitmap('img/naruto.png');
            naruto.addChild(narutoImage);
            narutoImage.x = -25;
            narutoImage.y = -25;
             
            naruto.onPlayerCollision = function() {
                game.increaseScore(100);
                 naruto.fadeOut();
            }
        }  
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}