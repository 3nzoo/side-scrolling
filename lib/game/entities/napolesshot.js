ig.module(
	'game.entities.napolesshot'
)
.requires(
	'game.entities.fireball2'
)
.defines(function(){

EntityNapolesshot = EntityFireball2.extend({
	animSheet: new ig.AnimationSheet( 'media/pearlball.png', 36, 36 ),
	sfxSpawn: new ig.Sound( 'media/sounds/napoles/shot.*' ),
});

ig.EntityPool.enableFor( EntityNapolesshot );

});