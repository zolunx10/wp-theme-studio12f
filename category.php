<?php 
  $name= get_query_var('category_name');
  get_header('public'); 
?>
<div class="content page-wrap grid-m0 clearfix">
  <div class="col-main">
  <ul class="main-wrap clearfix" id="post-<?php the_ID(); ?>">
<?php 
if (have_posts()) : 
  $link= null;  $isAlt= true;
  while (have_posts()) : the_post(); 
    $isAlt= !$isAlt;
    $content= get_the_content();
    if ($name==="book" || $name=="postgraduate") {
      // 著作, 提取img作为封面
      $RE_SRC= '/<img[^>]*src="?([^ ">]*)"?[^>]*>/i';
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
      $isBlank= true;
    } else {
      $link= get_permalink();
      $isBlank= false;
    }
    
?>
    <?php if ($name==="book"|| $name=="postgraduate") { ?>
    <li class="col <?php if ($isAlt) echo "alt"; ?>">
      <article <?php post_class("clearfix") ?>>
        <div class="cover">
          <a href="<?php echo $link ?>"><img src="<?php echo $t?$t[1]:'' ?>" width="100" alt="" /></a>
        </div>
        <header class="clearfix">
          <h3 class="entry-title" id="post-<?php the_ID(); ?>"><a href="<?php echo $link ?>" <?php if($isBlank) echo(' target="_blank"');?>>
            <?php the_title();?>
          </a></h3>
          <div class="meta">
            <?php edit_post_link(__("编辑", 'tbdata'), '<span class="edit-link">', '</span>') ?>
          </div>
        </header>
        <div class="entry">
          <?php echo apply_filters('the_content', $content); ?>
        </div>
      </article>
    <?php } else { ?>
    <li <?php post_class("li clearfix") ?>>
        <h3 class="entry-title" id="post-<?php the_ID(); ?>"><a href="<?php echo $link ?>" <?php if($isBlank) echo(' target="_blank"');?>>
          <?php the_title();?>
        </a></h3>
        <div class="meta">
          <?php edit_post_link(__("编辑", 'tbdata'), '<span class="edit-link">', '</span>') ?>
          <span class="comment-count" style="color:#333;">(<?php echo get_comments_number(); ?>/<?php if(function_exists('the_views')) { the_views(); } ?>)</span>
          <time datetime="<?php echo the_time(DATE_W3C); ?>" pubdate class="updated"><?php the_time("Y-m-d h:i") ?></time>
        </div>
    <?php } ?>
    </li>
  <?php endwhile; 
    include (TEMPLATEPATH. '/_/inc/nav.php');
    ?>
<?php endif; ?>
  </ul>
  </div>
</div>
<?php
    get_footer('public');
?>