document.addEventListener('DOMContentLoaded', function() {
	wp_block_create_block_nextcloud_block_plugin_init();
});
function wp_block_create_block_nextcloud_block_plugin_init() {
	const links = document.querySelectorAll('.file-tree .file span');
	links.forEach(link => {
		link.addEventListener('click', function(event) {
			event.preventDefault();
			const url = event.target.getAttribute('data-url');
			window.open(url, '_blank');
		})
	})

	const toggleNodes = document.querySelectorAll('.file-tree li.directory span');
	toggleNodes.forEach(node => {
		node.addEventListener('click', function(event) {
			node.classList.toggle('open');
			const id = event.target.getAttribute('data-id');
			const childrenElement = document.getElementById(`children-${id}`);
			if (childrenElement) {
				childrenElement.classList.toggle('active');

			}
		});
	});
}
