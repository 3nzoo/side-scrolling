ig.module('game.main')
  .requires(
    'impact.game',
    'impact.font',

    'plugins.camera',
    'plugins.touch-button',
    'plugins.impact-splash-loader',
    'plugins.gamepad',

    'game.entities.player',
    'game.entities.blob',
    'game.entities.blobVillain1',
    'game.entities.blobbin',
    'game.entities.blobVillain2',

    'game.levels.title',
    'game.levels.grasslands',
    'game.levels.snowhills',

    'game.levels.level1',
    'game.levels.level2',
    'game.levels.level3',

    'game.levels.message1',
    'game.levels.message2',
    'game.levels.message3'
  )
  .defines(function () {
    // Our Main Game class. This will load levels, host all entities and
    // run the game.

    MyGame = ig.Game.extend({
      clearColor: '#d0f4f7',
      blackBackground: '#000000',
      blueBackground: '#d0f4f7',
      gravity: 800, // All entities are affected by this

      // Load a font
      font: new ig.Font('media/fredoka-one.font.png'),
      font2: new ig.Font('media/helvetica-neue-std.font.png'),

      // HUD icons
      heartFull: new ig.Image('media/heart-full.png'),
      heartEmpty: new ig.Image('media/heart-empty.png'),
      coinIcon: new ig.Image('media/coin.png'),

      sfxComplete: new ig.Sound('media/sounds/complete.*'),
      sfxStart: new ig.Sound('media/sounds/start.*'),

      onMessage: false,
      messages: [
        ' Thank you for playing \n my demo game. \n You can continue to \n the next level or \n Contact me thru \n my website.',
        ' Thank you for playing \n my demo game. \n You can continue to \n the next level or \n Contact me thru \n my website.',
        ' Congratulations!!!! \n You have completed \n my demo game. \n You can contact me \n thru my website. \n Thank you!',
      ],

      banner: new ig.Image('media/complete.png'),

      // action buttons
      btnContinue: new ig.Image('media/buttons/btn-continue.png'),

      init: function () {
        ig.game.fireballCount = 0;

        // set background music
        ig.music.add('media/sounds/background.*');
        ig.music.volume = 0.25;

        // We want the font's chars to slightly touch each other,
        // so set the letter spacing to -2px.
        this.font.letterSpacing = -2;

        if (ig.system.nextLevel) {
          this.clearColor = this.blackBackground;
          this.onMessage = true;
          this.messageLevel = ig.system.nextLevel;
          this.loadLevel(ig.global[ig.system.nextLevel]);
          ig.system.nextLevel = null;
          ig.music.stop();
          this.sfxComplete.play();
        } else {
          this.clearColor = this.blueBackground;
          this.sfxComplete.stop();
          ig.music.play();
          this.onMessage = false;
          // Load the LevelGrasslands as required above ('game.level.grassland')
          this.loadLevel(LevelLevel1);
        }
      },

      loadLevel: function (data) {
        this.sfxStart.play();
        // Remember the currently loaded level, so we can reload when
        // the player dies.
        this.currentLevel = data;

        // Call the parent implemenation; this creates the background
        // maps and entities.
        this.parent(data);

        this.setupCamera();
      },

      setupCamera: function () {
        // Set up the camera. The camera's center is at a third of the screen
        // size, i.e. somewhat shift left and up. Damping is set to 3px.
        this.camera = new ig.Camera(
          ig.system.width / 3,
          ig.system.height / 3,
          3
        );

        // The camera's trap (the deadzone in which the player can move with the
        // camera staying fixed) is set to according to the screen size as well.
        this.camera.trap.size.x = ig.system.width / 10;
        this.camera.trap.size.y = ig.system.height / 3;

        // The lookahead always shifts the camera in walking position; you can
        // set it to 0 to disable.
        this.camera.lookAhead.x = ig.system.width / 6;

        // Set camera's screen bounds and reposition the trap on the player
        this.camera.max.x = this.collisionMap.pxWidth - ig.system.width;
        this.camera.max.y = this.collisionMap.pxHeight - ig.system.height;
        this.camera.set(this.player);
      },

      reloadLevel: function () {
        this.loadLevelDeferred(this.currentLevel);
      },

      update: function () {
        //disable other controls on message screen
        if (this.onMessage) {
          if (
            ig.input.pressed('jump') ||
            ig.input.pressed('shoot') ||
            ig.input.pressed('left') ||
            ig.input.pressed('right')
          ) {
            this.onMessage = false;
            ig.music.play();
            switch (this.messageLevel) {
              case 'LevelMessage1':
                this.loadLevel(ig.global['LevelLevel2']);
                break;
              case 'LevelMessage2':
                this.loadLevel(ig.global['LevelLevel3']);
                break;
              case 'LevelMessage3':
                window.location.href = 'https://www.linkedin.com/in/florenzo-dinglasan/';
                break;
            }
          }
        }
        // Update all entities and BackgroundMaps
        this.parent();

        // Camera follows the player
        this.camera.follow(this.player);

        // Instead of using the camera plugin, we could also just center
        // the screen on the player directly, like this:
        // this.screen.x = this.player.pos.x - ig.system.width/2;
        // this.screen.y = this.player.pos.y - ig.system.height/2;
      },

      draw: function () {
        // Call the parent implementation to draw all Entities and BackgroundMaps
        this.parent();

        var cx = ig.system.width / 2;
        // draw message
        if (this.onMessage) {
          var top = ig.system.height / 2 - this.banner.height / 2;
          this.banner.draw(cx - this.banner.width / 2, top);
          var score =
            typeof ig.system.currentScore != 'undefined'
              ? ig.system.currentScore
              : 0;
          var appendText = ig.ua.mobile
            ? 'Press button to \ncontinue'
            : " Press 'c' to continue";
          switch (this.messageLevel) {
            case 'LevelMessage1':
              var messageText = this.messages[0] + '\n\n\n' + appendText;
              this.font.draw(
                messageText,
                cx + 30,
                top + 130,
                ig.Font.ALIGN.LEFT
              );
              this.font.draw(
                'LEVEL: 1-3',
                cx - 400,
                top + 320,
                ig.Font.ALIGN.LEFT
              );
              this.font.draw(
                'SCORE: ' + score,
                cx - 200,
                top + 320,
                ig.Font.ALIGN.LEFT
              );
              break;
            case 'LevelMessage2':
              var messageText = this.messages[1] + '\n\n\n' + appendText;
              this.font.draw(
                messageText,
                cx + 30,
                top + 130,
                ig.Font.ALIGN.LEFT
              );
              this.font.draw(
                'LEVEL: 2-3',
                cx - 400,
                top + 320,
                ig.Font.ALIGN.LEFT
              );
              this.font.draw(
                'SCORE: ' + score,
                cx - 200,
                top + 320,
                ig.Font.ALIGN.LEFT
              );
              break;
            case 'LevelMessage3':
              var messageText = this.messages[2] + '\n\n\n' + appendText;
              this.font.draw(
                messageText,
                cx + 30,
                top + 80,
                ig.Font.ALIGN.LEFT
              );
              this.font.draw(
                'LEVEL: 3-3',
                cx - 400,
                top + 320,
                ig.Font.ALIGN.LEFT
              );
              this.font.draw(
                'SCORE: ' + score,
                cx - 200,
                top + 320,
                ig.Font.ALIGN.LEFT
              );
              break;
          }
        }

        // Draw the heart and number of coins in the upper left corner.
        // 'this.player' is set by the player's init method
        if (this.player) {
          var x = 16,
            y = 16;

          for (var i = 0; i < this.player.maxHealth; i++) {
            // Full or empty heart?
            if (this.player.health > i) {
              this.heartFull.draw(x, y);
            } else {
              this.heartEmpty.draw(x, y);
            }

            x += this.heartEmpty.width + 8;
          }

          // We only want to draw the 0th tile of coin sprite-sheet
          x += 48;
          this.coinIcon.drawTile(x, y + 6, 0, 36);

          x += 42;
          this.font.draw('x ' + this.player.coins, x, y + 10);
        }

        // Draw touch buttons, if we have any
        if (window.myTouchButtons) {
          window.myTouchButtons.draw();
        }
      },
    });

    // The title screen is simply a Game Class itself; it loads the LevelTitle
    // runs it and draws the title image on top.

    MyTitle = ig.Game.extend({
      clearColor: '#d0f4f7',
      gravity: 800,

      // The title image
      title: new ig.Image('media/title.png'),

      // Load a font
      font: new ig.Font('media/fredoka-one.font.png'),

      init: function () {
        // Bind keys
        ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
        ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
        ig.input.bind(ig.KEY.X, 'jump');
        ig.input.bind(ig.KEY.C, 'shoot');
        ig.input.bind(ig.KEY.N, 'next');
        ig.input.bind(ig.KEY.S, 'continue');

        ig.input.bind(ig.GAMEPAD.PAD_LEFT, 'left');
        ig.input.bind(ig.GAMEPAD.PAD_RIGHT, 'right');
        ig.input.bind(ig.GAMEPAD.FACE_1, 'jump');
        ig.input.bind(ig.GAMEPAD.FACE_2, 'shoot');
        ig.input.bind(ig.GAMEPAD.FACE_3, 'shoot');

        // Align touch buttons to the screen size, if we have any
        if (window.myTouchButtons) {
          window.myTouchButtons.align();
        }

        // We want the font's chars to slightly touch each other,
        // so set the letter spacing to -2px.
        this.font.letterSpacing = -2;

        this.loadLevel(LevelTitle);
        this.maxY = this.backgroundMaps[0].pxHeight - ig.system.height;
      },

      update: function () {
        // Check for buttons; start the game if pressed
        if (
          ig.input.pressed('jump') ||
          ig.input.pressed('shoot') ||
          ig.input.pressed('left') ||
          ig.input.pressed('right')
        ) {
          ig.system.setGame(MyGame);
          return;
        }

        this.parent();

        // Scroll the screen down; apply some damping.
        var move = this.maxY - this.screen.y;
        if (move > 5) {
          this.screen.y += move * ig.system.tick;
          this.titleAlpha = this.screen.y / this.maxY;
        }
        this.screen.x = (this.backgroundMaps[0].pxWidth - ig.system.width) / 2;
      },

      draw: function () {
        this.parent();

        var cx = ig.system.width / 2;
        this.title.draw(cx - this.title.width / 2, 60);

        var startText = ig.ua.mobile
          ? 'Press Button to Play!'
          : 'Press X or C to Play!';

        this.font.draw(startText, cx, 420, ig.Font.ALIGN.CENTER);

        // Draw touch buttons, if we have any
        if (window.myTouchButtons) {
          window.myTouchButtons.draw();
        }
      },
    });

    if (ig.ua.mobile) {
      // Use the TouchButton Plugin to create a TouchButtonCollection that we
      // can draw in our game classes.

      // Touch buttons are anchored to either the left or right and top or bottom
      // screen edge.
      var buttonImage = new ig.Image('media/touch-buttons.png');
      myTouchButtons = new ig.TouchButtonCollection([
        new ig.TouchButton(
          'left',
          { left: 0, bottom: 0 },
          128,
          128,
          buttonImage,
          0
        ),
        new ig.TouchButton(
          'right',
          { left: 128, bottom: 0 },
          128,
          128,
          buttonImage,
          1
        ),
        new ig.TouchButton(
          'shoot',
          { right: 128, bottom: 0 },
          128,
          128,
          buttonImage,
          2
        ),
        new ig.TouchButton(
          'jump',
          { right: 0, bottom: 96 },
          128,
          128,
          buttonImage,
          3
        ),
      ]);
    }

    // If our screen is smaller than 640px in width (that's CSS pixels), we scale the
    // internal resolution of the canvas by 2. This gives us a larger viewport and
    // also essentially enables retina resolution on the iPhone and other devices
    // with small screens.
    var scale = window.innerWidth < 640 ? 2 : 1;

    // We want to run the game in "fullscreen", so let's use the window's size
    // directly as the canvas' style size.
    var canvas = document.getElementById('canvas');
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';

    // Listen to the window's 'resize' event and set the canvas' size each time
    // it changes.
    window.addEventListener(
      'resize',
      function () {
        // If the game hasn't started yet, there's nothing to do here
        if (!ig.system) {
          return;
        }

        // Resize the canvas style and tell Impact to resize the canvas itself;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ig.system.resize(window.innerWidth * scale, window.innerHeight * scale);

        // Re-center the camera - it's dependend on the screen size.
        if (ig.game && ig.game.setupCamera) {
          ig.game.setupCamera();
        }

        // Also repositon the touch buttons, if we have any
        if (window.myTouchButtons) {
          window.myTouchButtons.align();
        }
      },
      false
    );

    // Finally, start the game into MyTitle and use the ImpactSplashLoader plugin
    // as our loading screen
    var width = window.innerWidth * scale,
      height = window.innerHeight * scale;
    ig.main('#canvas', MyTitle, 60, width, height, 1, ig.ImpactSplashLoader);
  });
