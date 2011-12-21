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
	<ul id="stage">
	<?php foreach ($galleries as $gallery) : ?>
		<li data-tags="Time, Type, <?php echo $gallery->galdesc; ?>">
			<div class="ngg-gallery-thumbnail" >
				<a href="http://localhost/wordpress/wp-content/gallery/project01/03_01.jpg" class="shutterset_<?php echo $gallery->name ?>' })" >
	      <img src="<?php echo $gallery->previewurl ?>" alt="<?php echo $gallery->title ?>" />
				</a>
			</div>
		</li>

		<?php for ($i=0; $i<0; $i++) { //测试用多打几个 ?>
		<li data-tags="Time, Type, <?php echo $gallery->galdesc; ?>">
      <img src="<?php echo $gallery->previewurl ?>" alt="<?php echo $gallery->title ?>" />
		</li>
		<?php } ?>

 	<?php endforeach; ?>
	</ul>

<?php endif; ?>