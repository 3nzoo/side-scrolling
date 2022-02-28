ig.module(
	'game.entities.duterteshot'
)
.requires(
	'game.entities.fireball2'
)
.defines(function(){

EntityDuterteshot = EntityFireball2.extend({
	animSheet: new ig.AnimationSheet( 'media/bomb.png', 36, 36 ),
	sfxSpawn: new ig.Sound( 'media/sounds/duterte/shot.*' ),
});

ig.EntityPool.enableFor( EntityDuterteshot );

});