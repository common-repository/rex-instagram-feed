<?php
/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://rextheme.com/
 * @since             1.0.0
 * @package           Rx_Insta_Feed
 *
 * @wordpress-plugin
 * Plugin Name:       WP Instagram Feed - Instagram Gallery for WordPress
 * Plugin URI:        #
 * Description:       Generate Instagram feeds and create streams. Embed on your WordPress site easily. Customize the layout to make it more attractive.
 * Version:           1.0.0
 * Author:            RexTheme
 * Author URI:        https://rextheme.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       rx-insta-feed
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'RX_INSTA_FEED_VERSION', '1.0.0' );
define( 'RX_INSTA_FEED_PLUGIN_DIR_URL', plugin_dir_url( __FILE__ ) );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-rx-insta-feed-activator.php
 */
function activate_rx_insta_feed() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-rx-insta-feed-activator.php';
	Rx_Insta_Feed_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-rx-insta-feed-deactivator.php
 */
function deactivate_rx_insta_feed() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-rx-insta-feed-deactivator.php';
	Rx_Insta_Feed_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_rx_insta_feed' );
register_deactivation_hook( __FILE__, 'deactivate_rx_insta_feed' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-rx-insta-feed.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_rx_insta_feed() {

	$plugin = new Rx_Insta_Feed();
	$plugin->run();

}
run_rx_insta_feed();
