ig.module(
	'game.entities.Villain2'
)
.requires(
	'impact.entity',
	'game.entities.boss',
	'game.entities.Villain2shot'
)
.defines(function(){

EntityVillain2 = EntityBoss.extend({
	fireball: 'EntityVillain2shot',
	animSheet: new ig.AnimationSheet( 'media/boss-Villain2.png', 193, 150),
	sfxHurt: new ig.Sound( 'media/sounds/Villain2/hurt.*' ),
	sfxDie: new ig.Sound( 'media/sounds/Villain2/die.*' ),
});


});