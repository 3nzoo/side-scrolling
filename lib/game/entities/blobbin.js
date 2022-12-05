ig.module(
	'game.entities.blobbin'
)
.requires(
	'game.entities.blob',
	'impact.entity'
)
.defines(function(){

EntityBlobbin = EntityBlob.extend({
	size: {x: 133.25, y: 50},
	offset: {x: 0, y: 0},

	animSheet: new ig.AnimationSheet( 'media/blob-darkb2.png', 133.25, 50  ),
});

});