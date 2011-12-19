<?php get_header(); ?>

<div id="bd" class="grid-m0s7 clearfix">
	<div id="mainbox" class="col-main">
		<div class="main-wrap"><?php if (have_posts()) : while (have_posts()) : the_post(); ?>
				
					<article <?php post_class() ?> id="post-<?php the_ID(); ?>">
						
						<h1 class="entry-title"><?php the_title(); ?></h1>
				
						<div class="entry-content">
							
							<?php the_content(); ?>
				
							<?php wp_link_pages(array('before' => 'Pages: ', 'next_or_number' => 'number')); ?>
							
							<?php the_tags( 'Tags: ', ', ', ''); ?>
						
							<?php include (TEMPLATEPATH . '/_/inc/meta.php' ); ?>
				
						</div>
						
					</article>
				
				<?php comments_template(); ?>
				
				<?php endwhile; endif; ?></div>
	</div>
		
	<?php get_sidebar(); ?>
</div>

<?php get_footer(); ?>