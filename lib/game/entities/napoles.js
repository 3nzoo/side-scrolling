ig.module(
	'game.entities.napoles'
)
.requires(
	'impact.entity',
	'game.entities.boss',
	'game.entities.napolesshot'
)
.defines(function(){

EntityNapoles = EntityBoss.extend({
	fireball: 'EntityNapolesshot',
	animSheet: new ig.AnimationSheet( 'media/boss-napoles.png', 193, 150 ),
	sfxHurt: new ig.Sound( 'media/sounds/napoles/hurt.*' ),
	sfxDie: new ig.Sound( 'media/sounds/napoles/die.*' ),
});


});