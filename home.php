<?php
// http://199.19.226.150/wordpress
?>
<?php get_header('public'); ?>
<?php 
  query_posts(array(
    'posts_per_page'=>10
  ));
?>
<script type="text/javascript">
 window.$= window.jQuery;</script>
<div id="mainbox" class="grid-m0 col-main">
  <div class="main-wrap">
<script id="tpl-cfy-col" type="text/template" style="display:none">
    <li class="cfy-col">
      <div class="title">
        {{title}}
      </div>
      {{#items}}
        <a href="{{href}}" class="cfy-item"><img src="{{src}}" alt="{{alt}}"/></a>
      {{/items}}
    </li>
</script>

<section id="imagebox">
    <?php echo the_post() ?>
</section>
  
<nav id="filter"></nav>

<div id="items" class="clearfix" style="position:relative; left:200px; top:30px">
    <div class="item page_item entry-title">
      <a href="#" id="project">项目<br/>
          <span class="name">PROJECTS</span>
      </a>
    </div>
    <div class="item page_item entry-title">
      <a href="#">著作<br/>
          <span class="name">BOOKS</span>
      </a>
    </div>
    <div class="item page_item entry-title">
      <a href="#">论文<br/>
          <span class="name">PAPERS</span>
      </a>
    </div>
    <div class="item page_item entry-title">
      <a href="<?php echo bloginfo('url') ?>/work">本科生作品<br/>
          <span class="name">UNDERGRADE<br/> STUDENTS' WORKS</span>
      </a>
    </div>
    <div class="item page_item entry-title">
      <a href="#">研究生作品<br/>
         <span class="name">POSTGRATED<br/>STUDENTS' THESIS</span>
      </a>
    </div>
    <div class="item page_item entry-title">
      <a href="<?php bloginfo('url'); ?>/archives">影像<br/>
          <span class="name">BLOG</span>
      </a>
    </div>
    <div id="back" class="project page_item entry-title">
      <a href="#">返回<br/>
          <span class="name">BACK</span>
      </a> 
    </div> 
</div>
<!-- #items-->

    <nav>
      <div class="entry-title page_item">
        <a href="<?php bloginfo('url'); ?>/info/about">概况 <br/>
        <span class="name">INFO</span></a>
      </div>
    </nav>
  </div>
</div>

<script  type="text/javascript" src="<?php bloginfo('template_directory');?>/_/js/jquery.easing.1.3.js" ></script>
<script  type="text/javascript" src="<?php bloginfo('template_directory');?>/_/js/jquery.localzoom.js" ></script>
<script  type="text/javascript" src="<?php bloginfo('template_directory');?>/_/js/home.js" ></script>
<script  type="text/javascript" src="<?php bloginfo('template_directory');?>/_/js/jquery-ui.min.js"></script>
<link    href="<?php bloginfo('template_directory');?>/_/css/jquery-ui.css"  rel="stylesheet" type="text/css"/>
<script  type="text/javascript" src="<?php bloginfo('template_directory');?>/_/js/home.x.js" ></script>
<?php get_footer(); ?>
