    <nav class="page-nav">
      <h1 class="entry-title">
        <?php 
          $t= get_page_by_path('info'); 
          if (is_page()) {
            echo $t->post_title; 
            echo ' <span class="name">'.strtoupper($t->post_name).'</span>';
          } else {
            ?>
        <h1 class="entry-title">
          <a href="<?php echo bloginfo('url'); ?>/archives/category/blog">
            博客 <span class="name">BLOG</span>
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
          <a href="<?php echo bloginfo('url'); ?>/archives/category/blog">
            <h2 class="entry-title">
              博客 <span class="name">BLOG</span>
            </h2>
          </a>
        </li>
          <?php } ?>
      </ul>
    </nav>