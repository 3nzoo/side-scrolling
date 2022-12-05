ig.module(
	'game.entities.Villain1'
)
.requires(
	'impact.entity',
	'game.entities.boss',
	'game.entities.Villain1shot'
)
.defines(function(){

EntityVillain1 = EntityBoss.extend({
	fireball: 'EntityVillain1shot',
	animSheet: new ig.AnimationSheet( 'media/boss-Villain1.png', 193, 150 ),
	sfxHurt: new ig.Sound( 'media/sounds/Villain1/hurt.*' ),
	sfxDie: new ig.Sound( 'media/sounds/Villain1/die.*' ),
});


});