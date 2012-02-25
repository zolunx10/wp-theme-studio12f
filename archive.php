<?php 
  if (in_category('blog')) {
    include (TEMPLATEPATH . '/single.php' ); 
  } else {
    include (TEMPLATEPATH . '/category.php'); 
  }
?>