
<?php get_header(); ?>

<div id="page-wrap" class="content grid-s4m0 clearfix">
  <div class="col-main">
  <div class="main-wrap post" id="post-<?php the_ID(); ?>">
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <article class="entry">
      <header>
        <h1 class="entry-title"><?php the_title();?></h1>
        <div class="meta"><?php include (TEMPLATEPATH . '/_/inc/meta.php' ); ?></div>
      </header>
      <?php 
        //add_filter('the_content', 'wpautop'); //the_content()会自动将空换行替换为<p>,  get_the_content()则不会
        the_content(); 
      ?>
    </article>
  <?php endwhile; 
    include (TEMPLATEPATH. '/_/inc/nav.php');
    ?>
<?php endif; ?>
  </div>
  </div>
  <div class="col-sub">
    <nav class="page-nav">
      <h1 class="entry-title">
        <?php 
          $t= get_page_by_path('info'); 
          if (is_page()) {
            echo $t->post_title; 
            echo '<span class="name">'.strtoupper($t->post_name).'</span>';
          } else {
            ?>
        <h1 class="entry-title">
          <a href="<?php echo bloginfo('url'); ?>/blog">
            博客<span class="name">BLOG</span>
          </a>
        </h1>
        <?php } ?>
      </h1>
      <ul>      
        <?php 
          wp_list_pages(array(
            'title_li'=>false,
            'show_home'=>false,
            'sort_column'=>"menu_order",
            'hierarchical'=>1,
            'child_of'=>$t->ID,
            'walker'=>new XWalkerPage(),
            'link_before'=>'<h2 class="entry-title">',
            'link_after'=>'</h2>'
          ));
          if (is_page()) {
            ?>
        <li class="page_item page-item-<?php ?>">
          <a href="<?php echo bloginfo('url'); ?>/blog">
            <h2 class="entry-title">
              博客
              <span class="name">BLOG</span>
            </h2>
          </a>
        </li>
          <?php } ?>
      </ul>
    </nav>
  </div>
</div>
<?php get_footer(); ?>