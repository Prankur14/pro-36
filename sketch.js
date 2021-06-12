var dog, sadDog, happyDog, database;
var foodS, foodStock;
var addFood;
var foodObj;
var lastFed 
var feed;
var meme = "Also, dogs cant digest so much milk"
// var  currentTime = hour();
//create feed and lastFed variable here


function preload() {
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(800, 200, 150, 150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  //create feed the dog button here
  feed = createButton("Feed");
  feed.position(650, 95);
  
    feed.mousePressed(feedDog)

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46, 139, 87);
  foodObj.display();

  //write code to read fedtime value from the database 
   database.ref('FeedTime').on("value", getFedTime)


  //write code to display text lastFed time here
  if(lastFed>=12 ){
    push();
    fill("black");
    textSize(18);
   
    text("Last fed: "+lastFed + " PM", 250, 30 )
    
   pop()
    }else{
      push();
      text("Last fed: "+lastFed+ " AM", 250, 30)
      pop();
    }
  console.log(lastFed);
// console.log(mouseX, mouseY);

  drawSprites();
}

//function to read food Stock
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}
function getFedTime(timeData){
  fedtime = timeData.val()
  lastFed = fedtime;
}

// function getFedTime(timeData){
//   currentTime = hour();
//   //  lastFed = timeData.val()
//   database.ref('/').update({
//     FeedTime: currentTime
//   })
  
// }

function feedDog() {
  dog.addImage(happyDog);
  if(foodS>=1){
    foodS--;
  database.ref('/').update({
    Food: foodS
  })}
  //write code here to update food stock and last fed time
  var currentTime = hour();
  database.ref('/').update({
    FeedTime: currentTime
  })

}

//function to add food in stock
function addFoods() {
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}
