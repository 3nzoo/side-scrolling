ig.module(
	'game.entities.duterte'
)
.requires(
	'impact.entity',
	'game.entities.boss',
	'game.entities.duterteshot'
)
.defines(function(){

EntityDuterte = EntityBoss.extend({
	fireball: 'EntityDuterteshot',
	animSheet: new ig.AnimationSheet( 'media/boss-duterte.png', 193, 150),
	sfxHurt: new ig.Sound( 'media/sounds/duterte/hurt.*' ),
	sfxDie: new ig.Sound( 'media/sounds/duterte/die.*' ),
});


});