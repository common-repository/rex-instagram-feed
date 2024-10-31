<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://rextheme.com/
 * @since      1.0.0
 *
 * @package    Rx_Insta_Feed
 * @subpackage Rx_Insta_Feed/admin
 */

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
class Rx_Insta_Feed_Admin {

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
     * Slug of the plugin screen.
     *
     * @since    1.0.0
     *
     * @var      string
     */
    protected $plugin_screen_hook_suffix = null;

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


        $this->plugin_basename      = plugin_basename( plugin_dir_path( realpath( dirname( __FILE__ ) ) ) . $this->plugin_name . '.php' );
        $this->cron                 = new Rx_Insta_Feed_Cron_Handler();
        global $backGroundProcess;
        $backGroundProcess = new Rx_Insta_Feed_Background_Process();

        global $backGroundProcessCron;
        $backGroundProcessCron = new Rx_Insta_Feed_Cron_Background_Process();

        // Add the options page and menu item.
        add_action( 'admin_menu', array( $this, 'add_plugin_admin_menu' ) );

        // Add plugin action link point to settings page
        add_filter( 'plugin_action_links_' . $this->plugin_basename, array( $this, 'add_action_links' ) );


        add_action('admin_footer', array( $this, 'rx_insta_feed_admin_css' ));

    }
    

    public function rx_insta_feed_admin_css() {
        echo '<style>
            .toplevel_page_rx-insta-feed .wp-menu-image img {
                width: 18px;
            }
        </style>';
    }

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Rx_Insta_Feed_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Rx_Insta_Feed_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

        $screen = get_current_screen();
        if ( $this->plugin_screen_hook_suffix == $screen->id ) {
            wp_enqueue_style( 'rex-roboto-font', 'https://fonts.googleapis.com/css?family=Roboto:300,400,500', false );
            wp_enqueue_style( 'rex-bootstrap', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css', array(), $this->version, 'all' );
            wp_enqueue_style( 'rex-react-select', 'https://unpkg.com/react-responsive-select@latest/dist/ReactResponsiveSelect.css', array(), $this->version, 'all' );
            wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/rx-insta-feed-admin.css', array(), $this->version, 'all' );
        }

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Rx_Insta_Feed_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Rx_Insta_Feed_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

        if ( ! isset( $this->plugin_screen_hook_suffix ) ) {
            return;
        }

        $screen = get_current_screen();
        if ( $this->plugin_screen_hook_suffix == $screen->id ) {
//            wp_enqueue_script( $this->plugin_name.'_vendor', plugin_dir_url( __FILE__ ) . 'js/vendors~js/admin.rex-social-feed-admin.js', array( 'jquery' ), $this->version, true );
            wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/rx-insta-feed-admin.js', array(), $this->version, true );
            $curl_version = '';
            if ( function_exists( 'curl_version' ) ) {
                $curl_version = curl_version();
                $curl_version = $curl_version['version'] . ', ' . $curl_version['ssl_version'];
            }
            wp_localize_script( $this->plugin_name , 'rsf_obj', array(
                    'api_nonce'     => wp_create_nonce( 'wp_rest' ),
                    'api_url'	    => rest_url( $this->plugin_name . '/v1/' ),
                    'plugin_page'   => admin_url('admin.php?page=rx-insta-feed'),
                    'requirements'  => array(
                        'php_version'           =>  phpversion(),
                        'php_version_status'    =>  version_compare(phpversion(),  "5.6", ">="),
                        'wp_version'            =>  get_bloginfo('version'),
                        'wp_version_status'     =>  get_bloginfo('version') >= 4,
                        'memory'                =>  ini_get('memory_limit'),
                        'memory_status'         =>  preg_replace('/[^0-9]/', '', ini_get('memory_limit')) >= 32, // 32M
                        'upload_limit'          =>  ini_get('upload_max_filesize'),
                        'upload_limit_status'   =>  preg_replace('/[^0-9]/', '', ini_get('upload_max_filesize')) >= 64, // 64M,
                        'wp_cron'               =>  !( defined( 'DISABLE_WP_CRON' ) && DISABLE_WP_CRON ),
                        'curl'                  =>  $curl_version,
                    ),
                )
            );
        }


        wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/rx-insta-feed-admin.js', array( 'jquery' ), $this->version, false );

	}


    /**
     * Register the administration menu for this plugin into the WordPress Dashboard menu.
     *
     * @since    1.0.0
     */
    public function add_plugin_admin_menu() {
        /*
         * Add a settings page for this plugin to the Settings menu.
         */

        $icon = RX_INSTA_FEED_PLUGIN_DIR_URL . '/admin/icon/instagram-feed-icon.png';
        $this->plugin_screen_hook_suffix = add_menu_page(
            __( 'Instagram Feed', $this->plugin_name ),
            __( 'Instagram Feed', $this->plugin_name ),
            'manage_options',
            $this->plugin_name,
            array( $this, 'display_plugin_admin_page' ),
            $icon,
            70
        );
    }


    /**
     * Render the settings page for this plugin.
     *
     * @since    1.0.0
     */
    public function display_plugin_admin_page() {?>
        <div id="rx-insta-feed-admin"></div><?php
    }

    /**
     * Add settings action link to the plugins page.
     *
     * @since    1.0.0
     */
    public function add_action_links( $links ) {
        return array_merge(
            array(
                'settings' => '<a href="' . admin_url( 'admin.php?page=' . $this->plugin_name ) . '">' . __( 'Settings', $this->plugin_name ) . '</a>',
            ),
            $links
        );
    }


    /**
     *  Feed Cron handler
     * @since    1.3.2
     */
    public function activate_schedule_update() {
        $this->cron->rx_insta_feed_cron_handler();
    }

}
