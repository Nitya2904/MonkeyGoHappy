
var monkey,monkey_running,moving;
var ground,groundImage;
var banana,bananaImage,bananaGroup;
var obstacle,obstacleImage,obstacleGroup, invisibleGround;
var score = 0;
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gamestate = 1;
var score=0;
var survivaltime=0;
var gameOver;
var gameOverImg
var tree;
var treeImg;



function preload(){
monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
bananaImage = loadImage("banana.png");  
obstacleImage = loadImage("obstacle.png");  
groundImage = loadImage("ground2.png");
restartImg=loadImage("R.jpg");
gameOverImg=loadImage("C.png");
treeImg=loadImage("tree.jpg");  
  
  
 
}


function setup() {
  createCanvas(400,400);
//creating ground
  ground=createSprite(400,360);
  ground.velocityX=-5;
  ground.x=ground.width/2;
  ground.addImage("ground",groundImage);
 // ground.scale=4;
  console.log(ground.x);
  
 //creating monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  //creating banana & obstacle group
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  invisibleGround = createSprite(400,360,900,10);
  invisibleGround.visible = false;
  
  

 
  
  
}


function draw() {
 background("lime");
  monkey.collide(invisibleGround); 
  monkey.velocityY = monkey.velocityY+0.8;
  
  gameOver=createSprite(200,200);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  gameOver.visible=false;
  
   
  
  
  textSize(16)
  textFont("GEORGIA");
  fill("red");
  stroke("white");
  text("BANANAS COLLECTED ="+score,10,20);
  
  textSize(16);
  
  fill("red");
  stroke("white");
  text("SURVIVAL TIME ="+survivaltime,230,20);
  
     
  if (ground.x < 0)
     {ground.x = ground.width/2;}
  
  
  
  if (gamestate === PLAY) {
    if(keyDown("space")&& monkey.y >= 200)
     { monkey.velocityY=-10;}
     food();
    spawnRocks();
    if (monkey.isTouching(bananaGroup)) {
        bananaGroup.destroyEach();
        score=score+1;
    }
    survivaltime=Math.ceil(frameCount/frameRate());
      
    
    if (monkey.isTouching(obstacleGroup)) {
      gamestate=END;
      obstacleGroup.destroyEach();
      
      
      
      }
    if(gamestate===END) {
          monkey.destroy();
          ground.destroy();
          obstacleGroup.destroyEach();
          bananaGroup.destroyEach(); 
          gameOver.visible=true;
          }
          }
  

  drawSprites(); 
}


  
  


     
function food(){
  //this is to make sure the banana appears for every 80 frames.
   if(World.frameCount%80==0){
 
  banana = createSprite(300,130,20,20);
  banana.addImage(bananaImage); 
  banana.scale=0.1;
  banana.y = Math.round(random(120,200));
  banana.velocityX=-5;
  banana.lifetime=150;

  bananaGroup.add(banana);  
      
  }


}
function spawnRocks(){
  // this is to make sure the obstacle appears after every 300 frames.
  if(World.frameCount%60==0){
    obstacle = createSprite(400,330,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-5;
    obstacle.lifetime=150;
    obstacleGroup.add(obstacle);

  }
}
