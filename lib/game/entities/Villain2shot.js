ig.module(
	'game.entities.Villain2shot'
)
.requires(
	'game.entities.fireball2'
)
.defines(function(){

EntityVillain2shot = EntityFireball2.extend({
	animSheet: new ig.AnimationSheet( 'media/bomb.png', 36, 36 ),
	sfxSpawn: new ig.Sound( 'media/sounds/Villain2/shot.*' ),
});

ig.EntityPool.enableFor( EntityVillain2shot );

});