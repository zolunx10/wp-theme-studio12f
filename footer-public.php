
<nav id="filter"></nav>
</div>
<nav class="home-nav">
<?php 
  $name= get_query_var('name');
  if (!$name) {
    $name= get_query_var('category_name'); 
  }
  $is_project= is_home() || is_front_page() || $name=="project";
?>
<script id="tpl-nav-li" type="text/template">
    <li class="{{class}} item page_item entry-title">
      <a href="{{href}}">{{nameZh}}<br/>
          <span class="name">{{name}}</span>
      </a>
    </li>  
</script>
  <ul id="items" class="page-nav clearfix">
    <li class="project item page_item entry-title <?php if ($is_project) {echo "active";} ?>">
      <a href="<?php bloginfo('url'); ?>">项目<br/>
          <span class="name">PROJECTS</span>
      </a>
    </li>
    <li class="book item page_item entry-title <?php if ($name=="book") {echo "active";} ?>">
      <a href="<?php bloginfo('url'); ?>/archives/category/book">著作<br/>
          <span class="name">BOOKS</span>
      </a>
    </li>
    <li class="paper item page_item entry-title <?php if ($name=="paper") {echo "active";} ?>">
      <a href="<?php bloginfo('url'); ?>/archives/category/paper">论文<br/>
          <span class="name">PAPERS</span>
      </a>
    </li>
    <li class="undergraduate item page_item entry-title <?php if ($name=="work") {echo "active";} ?>">
      <a href="<?php echo bloginfo('url') ?>/work">本科生作品<br/>
          <span class="name">UNDERGRADUATE<br/>STUDENTS' WORKS</span>
      </a>
    </li>
    <li class="postgraduate item page_item entry-title <?php if ($name=="postgraduate") {echo "active";} ?>">
      <a href="#">研究生作品<br/>
         <span class="name">POSTGRADUATE<br/>STUDENTS' THESIS</span>
      </a>
    </li>
    <li class="blog item page_item entry-title">
      <a href="<?php bloginfo('url'); ?>/archives/category/blog">影像<br/>
          <span class="name">BLOG</span>
      </a>
    </li>
    <li class="info item page_item entry-title">
      <a href="<?php bloginfo('url'); ?>/info/about">概况<br/>
          <span class="name">INFO</span>
      </a>
    </li>
    <?php if ($is_project) { ?>
    <li id="back" class="more page_item entry-title">
      <a href="<?php bloginfo('url') ?>">更多<br/>
          <span class="name">MORE</span>
      </a> 
    </li>
    <?php } else { ?>
    <li id="back" class="back page_item entry-title">
      <a href="<?php bloginfo('url') ?>">返回首页<br/>
          <span class="name">BACK</span>
      </a> 
    </li>
    <?php } ?>
  </ul>
</nav>
<!-- #items-->
<?php get_footer(); ?>