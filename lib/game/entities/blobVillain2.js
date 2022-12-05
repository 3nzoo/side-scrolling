ig.module(
	'game.entities.blobVillain2'
)
.requires(
	'game.entities.blob',
	'impact.entity'
)
.defines(function(){

EntityBlobVillain2 = EntityBlob.extend({
	size: {x: 76, y: 50},
	offset: {x: 0, y: 0},

	animSheet: new ig.AnimationSheet( 'media/blob-Villain22.png', 76, 50 ),
});

});