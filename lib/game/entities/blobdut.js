ig.module(
	'game.entities.blobdut'
)
.requires(
	'game.entities.blob',
	'impact.entity'
)
.defines(function(){

EntityBlobdut = EntityBlob.extend({
	size: {x: 76, y: 50},
	offset: {x: 0, y: 0},

	animSheet: new ig.AnimationSheet( 'media/blob-duterte2.png', 76, 50 ),
});

});