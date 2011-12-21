
<?php get_header(); ?>

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
<section class="content grid-s4m0 clearfix">
  <div class="col-main">
  <div class="main-wrap post" id="post-<?php the_ID(); ?>">
    <article class="entry">
      <h1 class="entry-title"><?php the_title();?></h1>
      <?php 
        //add_filter('the_content', 'wpautop'); //the_content()会自动将空换行替换为<p>,  get_the_content()则不会
        the_content(); 
      ?>
    </article>
    <?php edit_post_link(); ?>
  </div>
  </div>
  <div class="col-sub">
    <nav class="page_item">
      <?php 
          $t= get_page_by_path('info'); ?>
      <h1 class="entry-title">
        <?php echo $t->post_title; 
          echo '<span class="name">'.strtoupper($t->post_name).'</span>'
        ?>
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
        ?>
      </ul>
    </nav>
  </div>
</section>
<?php endwhile; endif; ?>
<?php get_footer(); ?>