ig.module(
	'game.entities.Villain1shot'
)
.requires(
	'game.entities.fireball2'
)
.defines(function(){

EntityVillain1shot = EntityFireball2.extend({
	animSheet: new ig.AnimationSheet( 'media/pearlball.png', 36, 36 ),
	sfxSpawn: new ig.Sound( 'media/sounds/Villain1/shot.*' ),
});

ig.EntityPool.enableFor( EntityVillain1shot );

});