ig.module(
	'game.entities.binay'
)
.requires(
	'impact.entity',
	'game.entities.boss',
	'game.entities.binayshot'
)
.defines(function(){

EntityBinay = EntityBoss.extend({
	animSheet: new ig.AnimationSheet( 'media/boss-binay.png', 193, 150),
	sfxHurt: new ig.Sound( 'media/sounds/binay/hurt.*' ),
	sfxDie: new ig.Sound( 'media/sounds/binay/die.*' ),
});


});