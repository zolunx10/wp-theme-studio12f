  <div class="col-main">
  <div class="main-wrap post" id="post-<?php the_ID(); ?>">
    <article class="entry">
      <h1><?php the_title();?></h1>
      <?php 
        $content = get_the_content(); 
        echo $content;
      ?>
    </article>
    <?php edit_post_link(); ?>
  </div>
  </div>
  <div class="col-sub">
    <nav class="page">
      <?php 
        $t= get_page_by_path('about');
        wp_list_pages(array(
          'title_li'=>0,
          'show_home'=>0,
          'include'=>$t->ID,
        ));
      ?>
    </nav>
  </div>