var game = new Phaser.Game(800, 500, Phaser.AUTO, 'affichage', { preload: preload, create: create, update: update });

function preload() {

  game.load.image('sky', 'assets/sky.png');
  game.load.image('ground', 'assets/platform.png');
  game.load.image('star', 'assets/star.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

}

var platforms;
var keyZ;
var keyQ;
var keyS;
var keyD;
var intMouvement = 0;
var text;
function create() {
  //  We're going to be using physics, so enable the Arcade Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //  A simple background for our game
  game.add.sprite(0, 0, 'sky');

  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = game.add.group();

  //  We will enable physics for any object that is created in this group
  platforms.enableBody = true;

  // Here we create the ground.
  var ground = platforms.create(0, game.world.height - 64, 'ground');

  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  ground.scale.setTo(2, 2);

  //  This stops it from falling away when you jump on it
  ground.body.immovable = true;

  // //  Now let's create two ledges
  // var ledge = platforms.create(300, 300, 'ground');
  //
  // ledge.body.immovable = true;
  //
  // ledge = platforms.create(-50, 150, 'ground');
  //
  // ledge.body.immovable = true;

  // The player and its settings
  player = game.add.sprite(32, game.world.height - 120, 'dude');
  player2 = game.add.sprite(65, game.world.height - 120, 'dude');
  //  We need to enable physics on the player
  game.physics.arcade.enable(player);
  game.physics.arcade.enable(player2);

  //  Player physics properties. Give the little guy a slight bounce.
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;
  player2.body.bounce.y = 0.2;
  player2.body.gravity.y = 300;
  player2.body.collideWorldBounds = true;

  //  Our two animations, walking left and right.
  player.animations.add('left', [0, 1, 2, 3], 10, true);
  player.animations.add('right', [5, 6, 7, 8], 10, true);
  //Touches ZQSD
  keyZ = game.input.keyboard.addKey(Phaser.Keyboard.Z);
  keyQ = game.input.keyboard.addKey(Phaser.Keyboard.Q);
  keyS = game.input.keyboard.addKey(Phaser.Keyboard.S);
  keyD = game.input.keyboard.addKey(Phaser.Keyboard.D);
  keyR = game.input.keyboard.addKey(Phaser.Keyboard.R);
  key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
  key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
  key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
  //  Our controls.
  cursors = game.input.keyboard.createCursorKeys();

  // stars = game.add.group();
  //
  // stars.enableBody = true;
  //
  // //  Here we'll create 12 of them evenly spaced apart
  // for (var i = 0; i < 8; i++)
  // {
  // 	//  Create a star inside of the 'stars' group
  // 	var star = stars.create(i * 30, 0, 'star');
  //
  // 	//  Let gravity do its thing
  // 	star.body.gravity.y = 50;
  //
  // 	//  This just gives each star a slightly random bounce value
  // 	star.body.bounce.y = 0.6 + Math.random() * 0.2;
  // }
  var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
  text = game.add.text(250,0, "Votre score : " + intMouvement , style);
  result = game.add.text(50,50, "" , style);
  text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
}

var PushMeD;
var PushMeG;
var accelerationD =0;
var accelerationG =0;
var acceleration = 0;
var input = 0;

function update() {
  //  Collide the player and the stars with the platforms
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.collide(player2, platforms);
  game.physics.arcade.collide(player, player2);
  //game.physics.arcade.collide(stars, platforms);

  // game.physics.arcade.overlap(player, stars, collectStar, null, this);
  //  Reset the players velocity (movement)
  if (key1.isDown)
  {
    input = 5;
  }if (key2.isDown)
  {
    input = 30;
  }else if (key3.isDown)
  {
    input = 100;
  }
  if (intMouvement > 0)
  {
    if (acceleration > 100 )
    {
      acceleration -= 100;
      player.body.velocity.x = -input;
      player2.body.velocity.x = -input;
    }
  }
  if (player.position.x < 710.43)
  {
    if (keyD.isDown)
    {
      if (!PushMeD)
      {
        //  Move to the right
        accelerationD += 10;
        acceleration += accelerationD;
        player.body.velocity.x += accelerationD;
        player2.body.velocity.x += accelerationD;
        intMouvement += 1;
        player.animations.play('right');
        PushMeD = true;
        console.log("vitesse d'acceleration :" + acceleration);
        text.setText("Votre score " + intMouvement + " points !");
      }
    }else {
      PushMeD = false;
      //  Stand still
      // player.animations.stop();
      player.frame = 5;
    }
    if (keyQ.isDown)
    {
      if (!PushMeG)
      {
        //  Move to the right
        accelerationG += 10;
        acceleration += accelerationG;
        player.body.velocity.x += accelerationG;
        player2.body.velocity.x += accelerationG;
        player.animations.play('right');
        intMouvement += 1;
        PushMeG = true;
        console.log("vitesse d'acceleration :" + acceleration);
        console.log("player position " + player.position.x );
        text.setText("Votre score " + intMouvement + " points !");
      }
    }else {
      PushMeG = false;
      //  Stand still
      player.frame = 5;
      player2.frame =2;
    }
  }else {
    player.animations.stop();
    player.body.velocity.x = 0;
    player2.body.velocity.x = 0;
    result.setText("Félicitation vous avez Gagner ! R pour rejouer");
  }
  var statut;

  if (keyS.isDown)
  {
    // console.log(intMouvement);
    // if (intMouvement%2 == 0)
    // {
    // 	statut = 0;
    // 	console.log("Input :" + input);
    //
    // }
      console.log("vitesse d'acceleration :" + player.body.velocity.x);
      console.log("Vitesse du joueur :" + acceleration);
      console.log("Input :" + input);
  }

  if (keyR.isDown)
  {
    player.body.position.x = 32;
    player2.body.position.x = 65;
    result.setText("");
    intMouvement = 0;
    text.setText("Votre score " + intMouvement + " points !");
    accelerationG = 0;
    accelerationD = 0;
    input = 0;
  }
}

function collectStar (player, star) {

  // Removes the star from the screen
  star.kill();

}
