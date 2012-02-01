# 专用相册
Instagram
http://wordpress.org/extend/plugins/photonic/
http://wordpress.org/extend/plugins/awesome-flickr-gallery-plugin/

http://www.v2ex.com/t/389
http://www.v2ex.com/t/23148

# NextGEN Gallery
album > gallery

# 
主题包必须包含 index.php 作为fallback用

# catagory
将默认的 uncatagoried 改成其他(blog)后默认分类也会相应变化

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

# 上传中文文件乱码问题
http://stackoverflow.com/questions/3259696/rename-files-during-upload-within-wordpress-backend
直接重命名上传文件为MD5

# wp-admin设置
常规-博客域名等
媒体-缩略图保持原始比例
阅读-首页显示某页面而非

# get_query_var()
实际是获得 $wp_query 这个全局变量中的值, 
 get_terms()


