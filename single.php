<?php if (have_posts()) {
  $post = $wp_query->post;
  if (in_category('blog')) {
    include (TEMPLATEPATH . '/page.php' ); 
  } else {
    include (TEMPLATEPATH . '/category.php'); 
  }
}
?>