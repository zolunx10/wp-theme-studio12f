# NextGEN Gallery
album > gallery

# 
主题包必须包含 index.php 作为fallback用

# gallery对象
[gid] => 1 [name] => project [slug] => project01 [path] => wp-content/gallery/project01 [title] => project01 [galdesc] => 2008,urban [pageid] => 0 [previewpic] => 24 [author] => 1 [counter] => 9 [previewname] => 03_24.jpg [previewurl] => http://localhost/wordpress/wp-content/gallery/project01/thumbs/thumbs_03_24.jpg [pagelink] => http://localhost/wordpress/archives/1?album=1&gallery=1&pageid=1

# NextGen的ajax
http://wordpress.org/support/topic/plugin-nextgen-gallery-using-the-shutter-effect-in-a-template

##  callback
参考 nggallery.php 的 check_request 


http://localhost/wordpress/?callback=image&pid=1

http://localhost/wordpress/?callback=imagerotator&gid=1

http://localhost/wordpress/?callback=ajax&type=gallery&galleryid=1

http://localhost/wordpress/?callback=json&format=json&method=gallery&id=1
不受分页影响