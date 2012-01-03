<?php
/*
Template Name: Home
Description: 单页显示内容, 含上下nav
*/
?>
<?php get_header('public'); ?>
<script type="text/javascript">
 window.$= window.jQuery;</script>
<div id="mainbox" class="grid-m0 col-main">
  <div class="main-wrap">
  <?php if (have_posts()) : ?>
<section id="imagebox">
    <?php the_post();
          the_content(); ?>
</section>
  <?php endif; ?>

<?php if (is_home() || is_front_page()) : ?>
<script src="<?php bloginfo('template_directory'); ?>/_/js/mustache.js"></script>
<script  type="text/javascript" src="<?php bloginfo('template_directory');?>/_/js/jquery.localzoom.js" ></script>
<!--<script  type="text/javascript" src="<?php bloginfo('template_directory');?>/_/js/jquery.easing.1.3.js" ></script>
<script  type="text/javascript" src="<?php bloginfo('template_directory');?>/_/js/jquery-ui.min.js"></script>-->
<script  type="text/javascript" src="<?php bloginfo('template_directory');?>/_/js/home.js" ></script>
<link    href="<?php bloginfo('template_directory');?>/_/css/jquery-ui.css"  rel="stylesheet" type="text/css"/>
<script type="text/javascript">
var $= window.jQuery;
$(document).ready(function() {
  $.localzoom('#imagebox .ngg-thumbnail', {
        ratio: 2.0
    });
  makeGallery({
    jsonUrl: "<?php echo bloginfo('url') ?>/"
  });
});
</script>
<?php endif; ?>

</div>
</div>
<?php get_footer('public'); ?>
