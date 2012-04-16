<?php if (have_posts()) {
  $post = $wp_query->post;
  if (in_category('blog')) {
    include (TEMPLATEPATH . '/page.php' ); 
  } else {
    $name= get_query_var('category_name');
    get_header('public'); 
?>
<div class="content page-wrap grid-m0 clearfix">
  <div class="col-main">
  <div class="main-wrap clearfix" id="post-<?php the_ID(); ?>">
<?php 
if (have_posts()) : 
  while (have_posts()) : the_post(); 
?>
    <article <?php post_class("clearfix") ?>>
      <header>
        <h2 class="entry-title" id="post-<?php the_ID(); ?>"><a href="<?php echo $link ?>">
          <?php the_title();?>
        </a></h2>
        <div class="meta">
          <?php edit_post_link(__("编辑", 'tbdata'), '<span class="edit-link">', '</span>') ?>
        </div>
      </header>
      <div class="entry">
        <?php the_content(); ?>
      </div>
    </article>
    <?php //comments_template(); ?>
  <?php endwhile; 
    // include (TEMPLATEPATH. '/_/inc/nav.php');
    ?>
<?php endif; ?>
  </div>
  </div>
</div>
  <?php
      get_footer('public');
  }
}
?>