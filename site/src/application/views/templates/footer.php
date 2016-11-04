<!-- <script src="http://jsconsole.com/remote.js?ECCA24A8-C0C3-4B41-B8FC-AC3D30192C48"></script> -->

<script>
	var startGroupName = "<?=$startGroupName?>";
	var startSecName = "<?=$startSecName?>";
	var isMobile = <?php echo  ($isMobile) ? 'true' : 'false' ?>;
	var state = "<?=substr($_SERVER['PHP_SELF'], 0, strrpos($_SERVER['PHP_SELF'], '/'));?>";
</script>

<!-- build-remove -->
<script>
    var build_version = '';
</script>
<!-- end-build-remove -->

<!-- build-insert-version-var -->

<!-- build-remove -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="js/lib/jquery-1.10.1.min.js"><\/script>')</script>

<!-- jquery 1.9+ causing jquery address to break, this restores deprecated features -->
<script src="//code.jquery.com/jquery-migrate-1.2.1.js"></script>

<script src="/js/lib/CSSPlugin.min.js"></script>
<script src="/js/lib/EasePack.min.js"></script>
<script src="/js/lib/ScrollToPlugin.min.js"></script>
<script src="/js/lib/TweenLite.min.js"></script>

<script src="/js/lib/bootstrap.min.js"></script>
<script src="/js/lib/underscore-min.js"></script>
<script src="/js/lib/backbone-min.js"></script>

<script src="/js/lib/jquery.address-1.5.min.js"></script>

<script src="/js/lib/paper.js"></script>
<script src="/js/lib/Box2dWeb-2.1.a.3.min.js"></script>
<!-- end-build-remove -->

<!-- build-insert-js {/js/lib/lib.js} -->

<!-- build-remove -->
<script src="/js/common/main.js"></script>
<script src="/js/common/slider.js"></script>
<!-- end-build-remove -->

<!-- build-insert-js {/js/common/common.js} -->

</body>
</html>