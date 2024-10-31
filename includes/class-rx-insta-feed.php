<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://rextheme.com/
 * @since      1.0.0
 *
 * @package    Rx_Insta_Feed
 * @subpackage Rx_Insta_Feed/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Rx_Insta_Feed
 * @subpackage Rx_Insta_Feed/includes
 * @author     RexTheme <rextheme@gmail.com>
 */
class Rx_Insta_Feed {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Rx_Insta_Feed_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		if ( defined( 'RX_INSTA_FEED_VERSION' ) ) {
			$this->version = RX_INSTA_FEED_VERSION;
		} else {
			$this->version = '1.0.0';
		}
		$this->plugin_name = 'rx-insta-feed';

		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_public_hooks();

	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Rx_Insta_Feed_Loader. Orchestrates the hooks of the plugin.
	 * - Rx_Insta_Feed_i18n. Defines internationalization functionality.
	 * - Rx_Insta_Feed_Admin. Defines all hooks for the admin area.
	 * - Rx_Insta_Feed_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies() {

        /**
         * Get Composer Autoloader.
         */
        require_once plugin_dir_path( dirname( __FILE__ ) ) . 'vendor/autoload.php';

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-rx-insta-feed-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-rx-insta-feed-i18n.php';

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-rx-insta-feed-admin.php';

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-rx-insta-feed-public.php';

		$this->loader = new Rx_Insta_Feed_Loader();

	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Rx_Insta_Feed_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale() {

		$plugin_i18n = new Rx_Insta_Feed_i18n();

		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );

	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks() {

		$plugin_admin = new Rx_Insta_Feed_Admin( $this->get_plugin_name(), $this->get_version() );

        $baseOperations = new Rx_Insta_Feed_Base_Operations();
        $gutenberg = new Rx_Insta_Feed_Gutenberg($this->get_plugin_name(), $this->get_version());

		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );

        $this->loader->add_action( 'enqueue_block_assets', $gutenberg, 'block_social_media_feed_block_assets' );
        $this->loader->add_action( 'enqueue_block_editor_assets', $gutenberg, 'block_social_media_feed_editor_assets' );
        $this->loader->add_action( 'init', $gutenberg, 'stream_init_block' );

        $this->loader->add_action( 'rexsf_endpoints',    $baseOperations, 'register_routes');
        $this->loader->add_action( 'admin_init',         'Rx_Insta_Feed_Ajax', 'init' );
        $this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
        $this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );

        /*
         * register rex feed schedule
         */
        $this->loader->add_action( 'rx_insta_feed_schedule_update', $plugin_admin, 'activate_schedule_update' );

	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks() {

		$plugin_public = new Rx_Insta_Feed_Public( $this->get_plugin_name(), $this->get_version() );

        $plugin_public_ajax = new Rx_Insta_Feed_Public_Ajax();

		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_styles' );
		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_scripts' );

        $this->loader->add_action( 'init', $plugin_public, 'rx_register_shortcode' );
        $this->loader->add_action( 'wp_ajax_rex_shortcode', $plugin_public_ajax, 'rx_insta_feed_shortcode' );
        $this->loader->add_action( 'wp_ajax_nopriv_rex_shortcode', $plugin_public_ajax, 'rx_insta_feed_shortcode' );

	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run() {
		$this->loader->run();

        if ( ! class_exists( 'AppSero\Client' ) ) {
            require_once plugin_dir_path( dirname( __FILE__ ) ) . 'vendor/appsero/client/src/Client.php';
        }
        $client = new AppSero\Client( 'b3f6aa59-1bdb-4194-8bce-d94728e6b07e', 'Wp Instagram Feed', __FILE__ );
        $client->insights()->init();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Rx_Insta_Feed_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}

}
