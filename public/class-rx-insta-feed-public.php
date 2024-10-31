<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://rextheme.com/
 * @since      1.0.0
 *
 * @package    Rx_Insta_Feed
 * @subpackage Rx_Insta_Feed/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Rx_Insta_Feed
 * @subpackage Rx_Insta_Feed/public
 * @author     RexTheme <rextheme@gmail.com>
 */
class Rx_Insta_Feed_Public {

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
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
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

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/rx-insta-feed-public.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
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

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/rx-insta-feed-public.js', array( 'jquery' ), $this->version, false );
        wp_localize_script( $this->plugin_name, 'rx_insta_feed', array(
            'ajaxurl' => admin_url( 'admin-ajax.php' ),
            'ajax_nonce' => wp_create_nonce('rex_insta_feed'),
        ) );

	}

    /**
     * Register shortcode for the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function rx_register_shortcode() {
        add_shortcode( 'rx_social_media_stream', array( $this, 'rx_shortcode_render_function') );
    }


    /**
     * Shortcode definition.
     *
     * @since    1.0.0
     */
    public function rx_shortcode_render_function($attr) {
        if($attr['id']) {
            ob_start();?>
            <section class="rex-social-media-feed" id="stream-id<?php echo $attr['id']; ?>" data-stream-id="<?php echo $attr['id']; ?>">
                <div class="rex-front-preloader">
                    <span></span>
                    <span></span>
                </div>
            </section>
            <?php
            $output = ob_get_clean();
            $output = str_replace("\r\n", '', $output);
            return $output;
        }else {
            echo 'Stream id should be given.';
        }
    }



    /**
     * Gutenberg render.
     *
     * @since    1.0.0
     */
    public static function rx_gutenberg_render_function($selected_stream) {
        if($selected_stream) {
            ob_start();?>
            <section class="rex-social-media-feed" id="stream-id<?php echo $selected_stream; ?>" data-stream-id="<?php echo $selected_stream; ?>">
                <div class="rex-front-preloader">
                    <span></span>
                    <span></span>
                </div>
            </section>
            <?php
            $output = ob_get_clean();
            $output = str_replace("\r\n", '', $output);
            return $output;
        }else {
            return 'Please select a stream';
        }

    }

}
