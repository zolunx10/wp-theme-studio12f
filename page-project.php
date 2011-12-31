<?php
/*
Template Name: Home
Description: 单页显示内容
*/
?>
<?php get_header('public'); ?>
<script type="text/javascript">
 window.$= window.jQuery;</script>
<div id="mainbox" class="grid-m0 col-main">
  <div class="main-wrap">
<script id="tpl-cfy-col" type="text/template" style="display:none">
    <li class="cfy-col">
      <div class="title">
        {{title}}
      </div>
      {{#items}}
        <a href="{{href}}" class="cfy-item"><img src="{{src}}" alt="{{alt}}"/></a>
      {{/items}}
    </li>
</script>

  <?php if (have_posts()) : ?>
<section id="imagebox">
    <?php the_post();
          the_content(); ?>
</section>
  <?php endif; ?>

<?php if (is_home()) : ?>
<script  type="text/javascript" src="<?php bloginfo('template_directory');?>/_/js/jquery.easing.1.3.js" ></script>
<script  type="text/javascript" src="<?php bloginfo('template_directory');?>/_/js/jquery.localzoom.js" ></script>
<script  type="text/javascript" src="<?php bloginfo('template_directory');?>/_/js/home.js" ></script>
<script  type="text/javascript" src="<?php bloginfo('template_directory');?>/_/js/jquery-ui.min.js"></script>
<link    href="<?php bloginfo('template_directory');?>/_/css/jquery-ui.css"  rel="stylesheet" type="text/css"/>
<script  type="text/javascript" src="<?php bloginfo('template_directory');?>/_/js/home.x.js" ></script>
<?php endif; ?>
<?php get_footer('public'); ?>
