<?php
/*
Template Name: Page Gallery
Destription: 直接显示gallery的slideshow
*/
?>
<?php get_header(); ?>
<?php 
$galleryID= get_query_var('gallery');
echo $galleryID;
echo nggShowGallery($galleryID); ?>
<?php get_footer(); ?>