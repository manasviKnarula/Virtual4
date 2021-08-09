var dog,dogImg,happyDogImg;
var foodStock, foodS;
var database;
var feed,addFood;
var lastFed,CurrentTime;
var foodObj;
var garden,washroom,readState,Bedroom;
var gameState="hungry";

function preload()
{
  happyDogImg = loadImage("images/dogImg1.png");
  dogImg= loadImage("images/dogImg.png");
  Bedroom=loadImage("images/Bed Room.png");
  washroom=loadImage("images/Wash Room.png");
  garden=loadImage("images/Garden.png");
  MilkImage = loadImage("images/Milk.png");
}

function setup() {
  createCanvas(1000, 600);
  database = firebase.database();
  dog = createSprite(700,300);
  dog.addImage("dog",dogImg);
  dog.scale =0.5;
  

  foodStock = database.ref('Food');
  foodStock.on("value",readStock)
  foodStock.set(20)
  foodObj = new Food();
  milkBotltle2 = createSprite(210,280)
  milkBotltle2.addImage(MilkImage)
  milkBotltle2.visible=false
  milkBotltle2.scale=0.25

  //milkBotltle2 = createSprite(210,280)
  //milkBotltle2.addImage(MilkImage)
  //milkBotltle2.visible=false
}




function draw() {  
  background(46,139,87);

  foodObj.display();
  writeStock(foodS);

  readState = database.ref('gamestate');
  readState.on("value",function(data){
    gameState = data.val();
  });

  if(foodS ==0){
    dog.addImage(happyDog);
    milkbotltle2.visible=false
    }  else{
      dog.addImage(dogImg);
      milkBotltle2.visible=true;
    }

  
  

  if (gameState === 1){
    dog.addImage(happyDog);
    dog.scale=0.175;
    dog.y=250
  }

  if (gameState === 2){
    dog.addImage(dogImg);
    dog.scale=0.175
    milkBotltle2.visible=false;
    dog.y=250
  }

  var bath=createButton("I want to take a bath");
  bath.position(580,125);
  if(bath.mousePressed(function(){
    gameState=3
    database.ref("/").update({"gameState":gameState});
  }));
  if (gameState===3){
    dog.addImage(washroom);
    dog.scale=1;
    milkBotltle2.visible=false
  }

  var Sleep=createButton("I am so sleepy");
  Sleep.position(710,125);
  if(Sleep.mousePressed(function(){
    gameState=4
    database.ref("/").update({"gameState":gameState});
  }));
  if (gameState===4){
    dog.addImage(bedroom);
    dog.scale=1;
    milkBotltle2.visible=false
  }

  var Play =createButton("Let's Play");
  Play.position(500,160);
  if(Play.mousePressed(function(){
    gameState=5
    database.ref("/").update({"gameState":gameState});
  }));
  if (gameState===5){
    dog.addImage(livingroom);
    dog.scale=1;
    milkBotltle2.visible=false
  }

  var PlayInGarden =createButton("Let's Play in park");
  PlayInGarden.position(500,160);
  if(PlayInGarden.mousePressed(function(){
    gameState=6
    database.ref("/").update({"gameState":gameState});
  }));
  if (gameState===6){
    dog.y=175;
    dog.addImage(garden);
    dog.scale=1;
    milkBotltle2.visible=false
  }
  drawSprites();
  
  fill("black")
  textSize(17)
  textSize("Milk bottles remaining: " + foodS,170,440)


}




function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}

