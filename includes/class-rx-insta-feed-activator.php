<?php

/**
 * Fired during plugin activation
 *
 * @link       https://rextheme.com/
 * @since      1.0.0
 *
 * @package    Rx_Insta_Feed
 * @subpackage Rx_Insta_Feed/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Rx_Insta_Feed
 * @subpackage Rx_Insta_Feed/includes
 * @author     RexTheme <rextheme@gmail.com>
 */
class Rx_Insta_Feed_Activator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function activate() {

        /*
         * Schedule Feed Update
         * @since 1.0.0
         */
        if (! wp_next_scheduled ( 'rx_insta_feed_schedule_update' )) {
            wp_schedule_event(time(), 'hourly', 'rx_insta_feed_schedule_update');
        }
        $rexDB = new Rx_Insta_Feed_DB_MANAGER();
        $rexDB->trigger();
        $rexDB->insert_plugin_init_value();
	}

}
