<?php


/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Rx_Insta_Feed
 * @subpackage Rx_Insta_Feed/admin
 * @author     RexTheme <rextheme@gmail.com>
 */
class Rx_Insta_Feed_Gutenberg {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;


	/**
	 * Instance of this class.
	 *
	 * @since    1.0.0
	 *
	 * @var      object
	 */
	protected static $instance = null;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;
		$this->plugin_basename = plugin_basename( plugin_dir_path( realpath( dirname( __FILE__ ) ) ) . $this->plugin_name . '.php' );
	}


	/**
	 * Return an instance of this class.
	 *
	 * @since     1.0.0
	 *
	 * @return    object    A single instance of this class.
	 */
	public static function get_instance() {
		// If the single instance hasn't been set, set it now.
		if ( null == self::$instance ) {
			self::$instance = new self;
			self::$instance->do_hooks();
		}
		return self::$instance;
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function block_social_media_feed_editor_assets() {

		wp_enqueue_script(
			'rx-insta-feed-block-editor-js',
			plugin_dir_url( __FILE__ ).'dist/blocks.build.js',
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' )
		);
		wp_localize_script( 'rx-insta-feed-block-editor-js' , 'rsf_obj', array(
				'api_nonce'   => wp_create_nonce( 'wp_rest' ),
				'api_url'	  => rest_url( $this->plugin_name . '/v1/' ),
				'plugin_page' => admin_url('admin.php?page=rx-insta-feed')
			)
		);
		wp_enqueue_style(
			'x-insta-feed-block-editor-css',
			plugin_dir_url( __FILE__ ).'dist/blocks.editor.build.css',
			array( 'wp-edit-blocks' )
		);
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function block_social_media_feed_block_assets() {

		if ( ! is_admin() ) {
			return;
		}
		wp_enqueue_style(
			'rx-insta-feed-block-style-css',
			RX_INSTA_FEED_PLUGIN_DIR_URL.'public/css/rx-insta-feed-public.css',
			array( 'wp-blocks' )
		);
	}


	public function stream_init_block() {

		register_block_type( 'rxsmf/instagram-feed', array(
			'render_callback' => array($this,'rex_render_stream' ),
			'editor_script'   => 'rx-insta-feed-block-editor-js',
		) );
		add_filter( 'rex_stream_render_filter', array($this,'render_gutenberg_stream'), 10, 2 );
	}


	public function rex_render_stream( $attributes ) {
		$selected_stream    = isset( $attributes['selectedStream'] ) ? $attributes['selectedStream'] : false;
		return apply_filters( 'rex_stream_render_filter',  $selected_stream );
	}


	public function render_gutenberg_stream( $selected_stream ) {
		return Rx_Insta_Feed_Public::rx_gutenberg_render_function($selected_stream);
	}
}
