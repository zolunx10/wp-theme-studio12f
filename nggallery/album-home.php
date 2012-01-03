<?php 
/**
Template Page for the album overview

Follow variables are useable :

	$album     	 : Contain information about the album
	$galleries   : Contain all galleries inside this album
	$pagination  : Contain the pagination content

 You can check the content when you insert the tag <?php var_dump($variable) ?>
 If you would like to show the timestamp of the image ,you can use <?php echo $exif['created_timestamp'] ?>
**/
?>
<?php if (!defined ('ABSPATH')) die ('No direct access allowed'); ?><?php if (!empty ($galleries)) : ?>


	<!-- List of galleries -->
	<ul id="stage" class="ngg-albumoverview">
	<?php foreach ($galleries as $gallery) : ?>
		<li class="clearfix ngg-album" data-tags="Time,Type, <?php echo $gallery->galdesc; ?>">
			<div class="ngg-gallery-thumbnail" >
				<a href="<?php echo $gallery->pagelink; ?>" class="shutterset_<?php echo $gallery->name ?>' }) ngg-link" >
	      <img src="<?php echo $gallery->previewurl ?>" alt="<?php echo $gallery->title ?>" />
				</a>
			</div>
		</li>
 	<?php endforeach; ?>
	</ul>

<?php endif; ?>