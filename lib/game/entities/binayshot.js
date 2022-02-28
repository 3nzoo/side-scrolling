ig.module(
	'game.entities.binayshot'
)
.requires(
	'game.entities.fireball2'
)
.defines(function(){

EntityBinayshot = EntityFireball2.extend({
	animSheet: new ig.AnimationSheet( 'media/fireball-binay.png', 36, 36 ),
	sfxSpawn: new ig.Sound( 'media/sounds/binay/shot.*' ),
});

ig.EntityPool.enableFor( EntityBinayshot );

});