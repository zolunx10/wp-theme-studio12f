

	</div>
		<footer id="footer" class="source-org vcard copyright">
      <p style="display:none;">
        <a href="<?php bloginfo('url'); ?>">首页</a>
        <span class="sep"> | </span> 
        <a href="<?php bloginfo('url'); ?>/archives/category/blog">博客</a>
      </p>
      <p>
      <small>&copy; <?php echo date("Y "); bloginfo('name'); ?></small>
      </p>
		</footer>

	<?php wp_footer(); ?>


<!-- here comes the javascript -->

<!-- jQuery is called via the Wordpress-friendly way via functions.php -->

<!-- this is where we put our custom functions -->
<script src="<?php bloginfo('template_directory'); ?>/_/js/functions.js"></script>
	 
<!--   
<script type="text/javascript"> 
  var _gaq = _gaq || []; 
  _gaq.push(['_setAccount', 'UA-22263713-1']); 
  _gaq.push(['_trackPageview']); 
  
  (function() { 
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true; 
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'; 
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s); 
  })(); 
</script> 
-->

</body>

</html>
