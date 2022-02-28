ig.module(
	'game.entities.boss'
)
.requires(
	'impact.entity',
	'game.entities.fireball',
	'game.entities.fireball2'
)
.defines(function(){

EntityBoss = ig.Entity.extend({

	size: {x: 193, y: 150},
	offset: {x: 0, y: -4},
	// maxVel: {x: 100, y: 100},
	friction: {x: 150, y: 0},

	type: ig.Entity.TYPE.B, // Evil enemy group
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.PASSIVE,

	animSheet: new ig.AnimationSheet( 'media/boss-binay.png', 193, 150 ),
	sfxHurt: new ig.Sound( 'media/sounds/binay-hurt.*' ),
	sfxDie: new ig.Sound( 'media/sounds/blob-die.*' ),

	health: 15,
	fireball: 'EntityBinayshot',
	
	speed: 36,
	flip: false,
	shooting: false,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.shooting = false;
		this.addAnim( 'crawl', 0.2, [0,1] );
		this.addAnim( 'dead', 0.2, [2,3,3,3,3,3,3,3,3] );
	},

	receiveDamage: function( amount, from ) {
		if( this.currentAnim == this.anims.dead ) {
			// Already in dying? Do nothing.
			return;
		}
		
		this.health -= amount;
		if( this.health <= 0 ) {
			this.sfxDie.play();
			this.vel.x = 0;
			this.type = ig.Entity.TYPE.A;
			this.checkAgainst = ig.Entity.TYPE.NONE;
			this.collides = ig.Entity.COLLIDES.NEVER;
			this.currentAnim = this.anims.dead.rewind();
		} else {
			this.sfxHurt.play();	
		}
	},

	update: function() {
		var self = this;
		if( 
			this.currentAnim == this.anims.dead &&
			this.currentAnim.loopCount < 1
		) {
			this.currentAnim.flip.x = !this.flip;
			var self = this;
			// delay removing of the blob
			setTimeout(function(){
				self.kill();
			}, 1500);
		} else {
			// Near an edge? return!
			if( !ig.game.collisionMap.getTile(
					this.pos.x + (this.flip ? +4 : this.size.x -4),
					this.pos.y + this.size.y+1
				)
			) {
				this.flip = !this.flip;
				
				// We have to move the offset.x around a bit when going
				// in reverse direction, otherwise the blob's hitbox will
				// be at the tail end.
				this.offset.x = this.flip ? 0 : 24;
			}
			// if player is near but in the back
			if (
					(ig.game.player.pos.x >= (this.pos.x - 250) && !this.flip) // in front left side
					||
					(ig.game.player.pos.x <= (this.pos.x + this.size.x + 250) && ig.game.player.pos.x >=  (this.pos.x + this.size.x) && this.flip) // in front right side
				) {
				this.flip = !this.flip;
			}
			// check if player is in proximity
			if (
					(
						(ig.game.player.pos.x >= (this.pos.x - 250) && this.flip) // in front left side
						||
						(ig.game.player.pos.x <= (this.pos.x + this.size.x + 250) && ig.game.player.pos.x >=  (this.pos.x + this.size.x) && !this.flip) // in front right side
					)
					&& 
					!this.shooting
				) {
				this.shooting = true;

				// only shoot every 0.5 sec
				setTimeout(function(){
					self.shooting = false;
				}, 500);

				ig.game.spawnEntity( ig.global[this.fireball], this.pos.x, this.pos.y+40, {flip:this.flip} );
			}

			// console.log(this.animSheet);
			// ig.game.spawnEntity( EntityFireball2, this.pos.x, this.pos.y+40, {flip:this.flip} );
			var xdir = this.flip ? -1 : 1;
			this.vel.x = this.speed * xdir;
			this.currentAnim.flip.x = !this.flip;
		}
		
		this.parent();
	},

	kill: function() {
		// this.sfxDie.play();
		this.parent();
		
	},
	
	handleMovementTrace: function( res ) {
		this.parent( res );
		
		// Collision with a wall? return!
		if( res.collision.x ) {
			this.flip = !this.flip;
			this.offset.x = this.flip ? 0 : 24;
		}
	},
	
	check: function( other ) {
		other.receiveDamage( 1, this );
	}
});


});