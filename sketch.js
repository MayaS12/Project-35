//Create variables here
var dog, dogImg
var happyDog;
var database;
var foodS, foodStock;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  
  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value",readStock);

  dog = createSprite(250,250,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.3;

}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    if(foodS<0){
      foodS = 0;
    }
    else{
    foodS = foodS-1
    }
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();
  //add styles here
  textSize(20);
  fill("black");
  stroke(4);
  text("Food remaining: "+foodS,150,120);
  text("Press up button to feed Fifi milk!",120,50);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  database.ref("/").update({
    food: x
  })
}