ig.module(
	'game.entities.blobVillain1'
)
.requires(
	'impact.entity',
	'game.entities.blob'
)
.defines(function(){
	
EntityBlobVillain1 = EntityBlob.extend({
	size: {x: 76, y: 50},
	offset: {x: 0, y: 0},
	animSheet: new ig.AnimationSheet( 'media/blob-Villain12.png', 76, 50 ),
});


});