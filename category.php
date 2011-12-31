<?php 
  $name= get_query_var('category_name');
  if ($name==="blog") {
    get_header();
  } else {
    get_header('public'); 
  }
?>
<div class="content page-wrap grid-m0 clearfix">
  <div class="col-main">
  <div class="main-wrap clearfix" id="post-<?php the_ID(); ?>">
<?php 
if (have_posts()) : 
  while (have_posts()) : the_post(); 
    if ($name==="book") {
      $RE_SRC= '/<img[^>]*src="?([^ ">]*)"?[ >]/i';
      $content= get_the_content();
      preg_match($RE_SRC, $content, $t);
    }
?>
    <article <?php post_class("clearfix") ?>>
    <?php if ($name==="book") { ?>
      <div class="cover">
        <img src="<?php echo $t?$t[1]:'' ?>" alt="" />
      </div>
    <?php } ?>
      <header>
        <h2 class="entry-title" id="post-<?php the_ID(); ?>"><a href="<?php the_permalink(); ?>"><?php the_title();?></a></h2>
        <div class="meta">
          <?php edit_post_link(__("编辑", 'tbdata'), '<span class="edit-link">', '</span>') ?>
        </div>
      </header>
      <div class="entry">
        <?php the_content(); ?>
      </div>
    </article>
  <?php endwhile; 
    include (TEMPLATEPATH. '/_/inc/nav.php');
    ?>
<?php endif; ?>
  </div>
  </div>
</div>
<?php
  if ($name==="blog") {
    get_footer();
  } else {
    get_footer('public');
  }
?>