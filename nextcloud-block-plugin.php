<?php
/**
 * Plugin Name: Nextcloud Block Plugin
 * Plugin URI: https://github.com/johappel/nextcloud-block-plugin
 * Description: Integrate Nextcloud directories as blocks in WordPress and display them as a tree structure.
 * Version: 0.0.2
 * Author: Joachim Happel
 * Author URI: https://comenius.de/person/joachim-happel/
 * License: GPLv2 or later
 * Text Domain: nextcloud-block-plugin
 */


defined( 'ABSPATH' ) || exit;

function nextcloud_block_plugin_register_block() {
	// Register the block using the metadata loaded from block.json
	register_block_type_from_metadata( __DIR__ . '/build/block' );
}
function nextcloud_block_plugin_enqueue_scripts() {
	wp_enqueue_script(
		'nextcloud-block-plugin-tree_frontend',
		plugins_url( '/assets/frontend.js', __FILE__ ),
		array(),
		'1.0.0',
		true
	);
	wp_enqueue_script(
		'md5-js',
		plugins_url( '/assets/md5.min.js', __FILE__ ),
		array(),
		'1.0.0',
		true
	);
	wp_enqueue_style(
		'nextcloud-block-plugin-tree_css',
		plugins_url( '/assets/style.css', __FILE__ ),
		array(),
		'1.0.0',
	);
	// Übergeben der Plugin-URL an das Skript.
	wp_localize_script( 'nextcloud-block-plugin-tree_frontend', 'nextcloudFolder', array(
		'proxyUrl' => plugins_url( '/', __FILE__ ).'proxy.php'
	));
}
add_action( 'wp_enqueue_scripts', 'nextcloud_block_plugin_enqueue_scripts' );

add_action( 'init', 'nextcloud_block_plugin_register_block' );

function nextcloud_enqueue_block_editor_assets() {
	wp_enqueue_script(
		'nextcloud-block-plugin-vars', // Handle für das Skript.
		plugins_url('/build/block/index.js', __FILE__), // Pfad zum Block-Editor-Skript.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Abhängigkeiten.
		filemtime(plugin_dir_path(__FILE__) . '/build/block/index.js') // Version: Dateimodifikationszeit.
	);
	wp_enqueue_script(
		'md5-js',
		plugins_url( '/assets/md5.min.js', __FILE__ ),
		array(),
		'1.0.0',
		true
	);

	// Übergeben der Plugin-URL an das Skript.
	wp_localize_script( 'nextcloud-block-plugin-vars', 'nextcloudFolder', array(
		'proxyUrl' => plugins_url( '/', __FILE__ ).'proxy.php'
	));
}
add_action( 'enqueue_block_editor_assets', 'nextcloud_enqueue_block_editor_assets' );

