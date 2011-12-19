<footer class="meta">
	<span class="byline author vcard">
		<i>by</i> <span class="fn"><?php the_author_posts_link(); ?></span>
	</span>
	<span class="sep">|</span>
	<span class="category"><?php the_category(','); ?></span>
	<span class="sep">|</span>
	<span class="comments"><?php comments_popup_link( __("添加评论", 'tbdata'), __("Comments (1)", 'tbdata'), __("Comments (%)", 'tbdata')); ?></span>
	<span class="sep"></span>
	<?php edit_post_link(__("编辑", 'tbdata'), '<span class="edit-link">', '</span>') ?>
</footer>