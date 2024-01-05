<?php
/**
 * Plugin Name: Nextcloud Block Plugin
 * Plugin URI: http://example.com/plugins/nextcloud-block-plugin
 * Description: Integrate Nextcloud directories as blocks in WordPress and display them as a tree structure.
 * Version: 1.0
 * Author: WP Plugin Lab
 * Author URI: http://comenius.de
 * License: GPLv2 or later
 * Text Domain: nextcloud-block-plugin
 */

defined( 'ABSPATH' ) || exit;

function nextcloud_block_plugin_register_block() {
	// Register the block using the metadata loaded from block.json
	register_block_type_from_metadata( __DIR__ . '/build/block' );
}

add_action( 'init', 'nextcloud_block_plugin_register_block' );
