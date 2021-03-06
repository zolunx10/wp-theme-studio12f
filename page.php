<?php
/*
Template Name: Blog
Destription: 左侧显示父级树状图
*/
?>
<?php get_header(); ?>

<div class="page-wrap content grid-s4m0 page-content clearfix">
  <div class="col-main">
  <div class="main-wrap post">
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <article <?php post_class("clearfix") ?>>
<?php /*
      <header>
      <?php if (is_single()) { ?>
        <h1 class="entry-title" id="post-<?php the_ID(); ?>"><?php the_title();?></h1>
        <?php } else { ?>
        <h2 class="entry-title"><a href="<?php the_permalink(); ?>"><?php the_title();?></a></h2>
        <?php } ?>
        <div class="meta"><?php include (TEMPLATEPATH . '/_/inc/meta.php' ); ?></div>
      </header>
*/ ?>
      <div class="entry">
        <?php 
          //add_filter('the_content', 'wpautop'); //the_content()会自动将空换行替换为<p>,  get_the_content()则不会
          the_content(); 
        ?>
      </div>
    </article>
  <?php endwhile; 
    include (TEMPLATEPATH. '/_/inc/nav.php');
    ?>
<?php endif; ?>
  </div>
  </div>
  <div class="col-sub">
  <?php get_sidebar(); ?>
  </div>
</div>
<script type="text/javascript">
var $= window.jQuery;
  $(document).ready(function() {
    allFancy();
  });
</script>
<?php get_footer(); ?>