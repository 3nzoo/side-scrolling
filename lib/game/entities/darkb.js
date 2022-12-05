ig.module(
	'game.entities.darkb'
)
.requires(
	'impact.entity',
	'game.entities.boss',
	'game.entities.darkbshot'
)
.defines(function(){

EntityDarkB = EntityBoss.extend({
	animSheet: new ig.AnimationSheet( 'media/boss-darkb.png', 193, 150),
	sfxHurt: new ig.Sound( 'media/sounds/darkb/hurt.*' ),
	sfxDie: new ig.Sound( 'media/sounds/darkb/die.*' ),
});


});