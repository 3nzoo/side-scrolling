ig.module(
	'game.entities.blobnapoles'
)
.requires(
	'impact.entity',
	'game.entities.blob'
)
.defines(function(){
	
EntityBlobnapoles = EntityBlob.extend({
	size: {x: 76, y: 50},
	offset: {x: 0, y: 0},
	animSheet: new ig.AnimationSheet( 'media/blob-napoles2.png', 76, 50 ),
});


});