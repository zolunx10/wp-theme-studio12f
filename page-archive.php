<?php
/*
Template Name: Archives
Description: 所有文章列表
*/
  query_posts(array(
    'posts_per_page'=>10
  ));
?>
<?php include(TEMPLATEPATH.'/single.php') ?>