<?php

/**
 * Fired during plugin deactivation
 *
 * @link       https://rextheme.com/
 * @since      1.0.0
 *
 * @package    Rx_Insta_Feed
 * @subpackage Rx_Insta_Feed/includes
 */

/**
 * Fired during plugin deactivation.
 *
 * This class defines all code necessary to run during the plugin's deactivation.
 *
 * @since      1.0.0
 * @package    Rx_Insta_Feed
 * @subpackage Rx_Insta_Feed/includes
 * @author     RexTheme <rextheme@gmail.com>
 */
class Rx_Insta_Feed_Deactivator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function deactivate() {

        $settings = Rx_Insta_Feed_DB_MANAGER::get_rex_option('rxsmf-settings');
        if($settings) {
            if($settings['deleteData'] === true) {
                Rx_Insta_Feed_DB_MANAGER::delete_all_instance();
            }
        }

        wp_clear_scheduled_hook( 'rx_insta_feed_schedule_update' );
	}


}
