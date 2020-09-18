var heart1,heart2,player1,player1_img,player2,player1ducked_img,player1ducked,ground,weapon;
var bg,weapon_img;
var edges;
var fplayer1,fplayer2;
var trident1,trident_img,trident2,trident2_img;
var flag,flag1;
var axe;
function preload(){
bg=loadImage("photos/background.png");
player1_img=loadImage("photos/1noweapons1.png");
weapon_img=loadImage("photos/weapon2.PNG");
player2_img=loadImage("photos/2noweapon.png");
weapon2_img=loadImage("photos/weapon1.png");
player1ducked_img=loadImage("photos/1noweapons1duck.png");
fplayer1=loadImage("photos/1noweapons.png");
fplayer2=loadImage("photos/2noweapon2.png");
trident_img=loadImage("photos/trident2.png");
trident2_img=loadImage("photos/trident.png");
weapon12_img=loadImage("photos/weapon22.png")
}
function setup() {
  var canvas = createCanvas(1200,400);
    ground=createSprite(600,410,1200,20);
    ground.visible=false;
    player1=createSprite(100,325,20,20);
    player1.addImage(player1_img);
    player1.scale=0.5;
    player2=createSprite(1100,325,20,20);
    player2.addImage(player2_img);
    player2.scale=0.5;
    weapon=createSprite(player1.x+50,player1.y-35);
    weapon.addImage(weapon_img);
    weapon.scale=0.2
    weapon12=createSprite(player1.x+50,player1.y);
    weapon12.addImage(weapon12_img);
    weapon12.scale=0.2
    weapon12.visible=false;
    trident1=createSprite(player1.x+50,player1.y-35);
    trident1.addImage(trident_img);
   trident1.scale=0.5
   trident1.visible=false;
    weapon2=createSprite(player2.x-50,player2.y-35);
    weapon2.addImage(weapon2_img);
    weapon2.scale=0.2
    trident2=createSprite(player2.x-50,player2.y-35);
    trident2.addImage(trident2_img);
   trident2.scale=0.5
   trident2.visible=false;
axe=true;
    flag=0;
    flag1=0;
}
function draw() {
  background(bg);  

//------------------------------------PLAYER 1---------------------------------------------------------------

//attach weapon positions to the player
  if(flag1===0){
    weapon.x=player1.x+50;
    weapon.y=player1.y-35;
    trident1.x=player1.x+50;
    trident1.y=player1.y-35; 
  }

//-------------------------------------------Movement while crouching-----------------------------------------
player1.velocityY+=0.7;
player1.collide(ground);
if(keyDown(DOWN_ARROW)){
 
  player1.y+=70;
  if(keyDown(LEFT_ARROW)){
    player1.x-=2;
  }
  if(keyDown(RIGHT_ARROW)){
    player1.x+=2;
  }
}

//------------------------------------------Movement while standing--------------------------------------------
if(keyDown(LEFT_ARROW)){
  player1.x-=5;
}
if(keyDown(RIGHT_ARROW)){
  player1.x+=5;
}
if(keyDown(UP_ARROW)&&player1.y>=327){
  player1.velocityY=-16;
}


//-------------------------------------------Highlighting PLAYER 1--------------------------------------------
ellipseMode(RADIUS);
stroke("red");
strokeWeight(10);
fill("red");
ellipse(player1.x,player1.y,30,50)

//------------------------------------------Collide PLAYER 1 with edges----------------------------------------
edges=createEdgeSprites();
player1.collide(edges[0]);
player1.collide(edges[1]);


//------------------------------------------Change images if players cross each other-------------------------------------
if(player1.x>player2.x){
  player1.addImage(fplayer1);
  player2.addImage(fplayer2);
  trident2.x=player1.x-50;
    trident1.y=player2.y-25; 
    trident1.x=player2.x+50;
trident2.y=player1.y-25;
  weapon2.x=player1.x-50;
  weapon2.y=player1.y-35;
  weapon.x=player2.x+50;
  weapon.y=player2.y-35;
}else{
  player1.addImage(player1_img);
  player2.addImage(player2_img);
  weapon.x=player1.x+50;
  weapon2.x=player2.x-50;
}


//-----------------------------------------Change the weapon------------------------------------------------- 
if(keyDown("m")){
  weapon.visible=false;
  trident1.visible=true;
  flag=1;
  axe=false;
}
if(keyDown("n")){
  trident1.visible=false;
  weapon.visible=true;
  flag=0;  
  axe=true;
}
trident2.x=player2.x-50;
trident2.y=player2.y-25;


player1.velocityY+=0.7;
//player1.collide(ground);

//---------------------------------------Throwing Trident and Reseting Back-----------------------------------------------------
if(keyDown("space")&&axe===false){
  flag1=1;
   trident1.velocityX=50;
   //player2.velocityY=-15
 
 }
 if(trident1.x>player2.x){
   trident1.x=player1.x+50;
   flag1=0;
 }
 
 //----------------------------------------Movement of Axe-----------------------------------------------------------
 if(keyDown("space")&&axe===true){
  
  weapon.visible=false;
  weapon12.visible=true;
  weapon12.x=player1.x+50;
  weapon12.y=player1.y;  
}
if(keyWentUp("space")&&axe===true){
  
  weapon.visible=true;
  weapon12.visible=false;
 
}

//---------------------------------------------------PLAYER2-----------------------------------------------------------
weapon2.x=player2.x-50;
weapon2.y=player2.y-35;
player2.velocityY+=0.7;
player2.collide(ground);

player2.collide(edges[0]);
player2.collide(edges[1]);




drawSprites();
}