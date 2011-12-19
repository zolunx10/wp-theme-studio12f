<?php get_header(); ?>

<div id="bd" class="grid-s7m0 clearfix">
<div id="mainbox" class="col-main">
	<div class="main-wrap">
		<?php if (have_posts()) : ?>

			<?php include (TEMPLATEPATH . '/_/inc/nav.php' ); ?>

			<?php while (have_posts()) : the_post(); ?>
			
				<article <?php post_class() ?>>
				
						<header>
							<time pubdate class="updated"><?php the_date('Y.m.d') ?></time>
							<h2 id="post-<?php the_ID(); ?>"><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h2>
						</header>	
					
						<?php include (TEMPLATEPATH . '/_/inc/meta.php' ); ?>

						<div class="entry">
							<?php the_excerpt(); ?>
						</div>

				</article>

			<?php endwhile; ?>

			<?php include (TEMPLATEPATH . '/_/inc/nav.php' ); ?>
			
	<?php else : ?>

		<h2>Nothing found</h2>

	<?php endif; ?>
	</div>
</div>
<?php get_sidebar(); ?>
</div>

<?php get_footer(); ?>
