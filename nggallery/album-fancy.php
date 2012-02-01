<?php 
/**
Template Page for the album overview (extended)

Follow variables are useable :

	$album     	 : Contain information about the album
	$galleries   : Contain all galleries inside this album
	$pagination  : Contain the pagination content

 You can check the content when you insert the tag <?php var_dump($variable) ?>
 If you would like to show the timestamp of the image ,you can use <?php echo $exif['created_timestamp'] ?>
**/
?>
<?php if (!defined ('ABSPATH')) die ('No direct access allowed'); ?><?php if (!empty ($galleries)) : ?>

<ul class="ngg-albumoverview ngg-row">	
	<!-- List of galleries -->
	<?php foreach ($galleries as $gallery) : ?>

	<li class="ngg-album clearfix">
		<div class="ngg-albumcontent">
			<div class="wrap">
				<h2 class="ngg-albumtitle"><a class="ngg-link" href="<?php echo $gallery->pagelink ?>"><?php echo $gallery->title ?></a>
				</h2>
				<div class="ngg-description">
					<?php echo $gallery->galdesc ?>
				</div>
			</div>
		</div>
		<div class="ngg-thumbnail">
			<a class="ngg-link" href="<?php echo $gallery->pagelink ?>"><img class="Thumb" alt="<?php echo $gallery->title ?>" src="<?php echo $gallery->previewurl ?>"/></a>
		</div>
	</li>

 	<?php endforeach; ?>
 	
	<!-- Pagination -->
 	<?php echo $pagination ?>
 	
</ul>

<?php endif; ?>

<script type="text/javascript">
var $= jQuery;
$(function() {
	makeGallery({
		jsonUrl: "<?php echo bloginfo('url') ?>/"
	});
});
</script>