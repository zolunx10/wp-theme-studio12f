<?php 
  $name= get_query_var('category_name');
  get_header('public'); 
?>
<div class="content page-wrap grid-m0 clearfix">
  <div class="col-main">
  <div class="main-wrap clearfix" id="post-<?php the_ID(); ?>">
<?php 
if (have_posts()) : 
  while (have_posts()) : the_post(); 
    $content= get_the_content();
    if ($name==="book" || $name==="postgraduate") {
      // 著作, 提取img作为封面
      $RE_SRC= '/<img[^>]*src="?([^ ">]*)"?[ >]/i';
      preg_match($RE_SRC, $content, $t);
      //$content= str_replace($t[0], "", $content);
    }
    $link= null;
    if (has_post_format('link') || $name==="paper" || stristr($name, 'undergraduate')) {
      // 论文, 直接提取a作为链接
      $RE_DOWN= '/<a[^>]*href="([^ ">]*)"[ >][^<]*<\/a>/i';
      preg_match($RE_DOWN, $content, $link);
      $content= str_replace($link[0], "", $content);
    }
    if ($link) {
      $link= $link[1];
    } else {
      $link= get_permalink();
    }
    
?>
    <article <?php post_class("clearfix") ?>>
    <?php if ($name==="book") { ?>
      <div class="cover">
        <img src="<?php echo $t?$t[1]:'' ?>" width="100" alt="" />
      </div>
    <?php } ?>
      <header>
        <h2 class="entry-title" id="post-<?php the_ID(); ?>"><a href="<?php echo $link ?>">
        <?php  if ($name==="postgraduate") { ?>
          <div class="photo">
            <img src="<?php echo $t?$t[1]:'' ?>" width="100" alt="" />
          </div>
        <?php   $content= "";
          } ?>
          <?php the_title();?>
        </a></h2>
        <div class="meta">
          <?php edit_post_link(__("编辑", 'tbdata'), '<span class="edit-link">', '</span>') ?>
        </div>
      </header>
      <div class="entry">
        <?php echo apply_filters('the_content', $content); ?>
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
    get_footer('public');
?>