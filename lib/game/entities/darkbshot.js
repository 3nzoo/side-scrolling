ig.module(
	'game.entities.darkbshot'
)
.requires(
	'game.entities.fireball2'
)
.defines(function(){

EntityDarkBshot = EntityFireball2.extend({
	animSheet: new ig.AnimationSheet( 'media/fireball-darkb.png', 36, 36 ),
	sfxSpawn: new ig.Sound( 'media/sounds/darkb/shot.*' ),
});

ig.EntityPool.enableFor( EntityDarkBshot );

});