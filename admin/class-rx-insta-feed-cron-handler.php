<?php

/**
 * The Rx_Insta_Feed_Cron_Handler class file that
 * handle the schedule feed update
 *
 * @link       https://rextheme.com
 * @since      2.0.0
 *
 * @package    Rx_Insta_Feed_Cron_Handler
 * @subpackage Rx_Insta_Feed_Cron_Handler/admin
 */

class Rx_Insta_Feed_Cron_Handler {


    /**
     * Feed ids
     *
     * @since    2.0.0
     * @access   protected
     * @var      string    $feed_ids
     */
    protected $feeds = array();


    /**
     * Feed Schedule
     *
     * @since    2.0.0
     * @access   protected
     * @var      string    $schedule
     */
    protected $schedule;


    /**
     * Background Processor
     *
     * @since    2.0.0
     * @access   protected
     * @var      string    $background_process
     */
    protected $background_process;


    /**
     * Initialize the class and set its properties.
     *
     * @since    2.0.0
     */
    public function __construct() {

    }



    /**
     * Initialize Cron
     *
     * @since    2.0.0
     */
    public function rx_insta_feed_cron_handler() {
        $this->get_feeds();
        $this->process_handler();
    }



    /**
     * Get all feeds
     *
     * @since    2.0.0
     */
    public function get_feeds() {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $feed_table = $prefix.'rx_insta_feeds';
        $feed_meta_table = $prefix.'rx_insta_feedmeta';
        $result = $wpdb->get_results("SELECT DISTINCT $feed_table.feed_id, $feed_meta_table.meta_value FROM $feed_meta_table
                        INNER JOIN $feed_table ON $feed_table.feed_id = $feed_meta_table.feed_id;");
        if($wpdb->last_error){
            return false;
        }

        if($result) {
            foreach ($result as $key=>$feed) {
                $this->feeds[$feed->feed_id] = unserialize($feed->meta_value);
            }
        }
    }



    /**
     * Start cron processor
     *
     * @since    2.0.0
     */
    public function process_handler() {
        global $backGroundProcessCron;
        $hour = date('H');
        if($this->feeds) {
            foreach ($this->feeds as $key=>$feed_meta) {
                $schedule = $feed_meta['interval'];
                $feed_type = $feed_meta['interval'];
                $target = $feed_meta['feed_target'];
                $target_name = $feed_meta['target_name'];
                $no_of_feeds = $feed_meta['noOffeeds'];
                $last_update = $feed_meta['last_updated'];
                $datediff = time() - $last_update;
                $passed = round($datediff / (60 * 60 * 24));

                switch ($schedule) {
                    case 'hourly':
                        $this->update_feed($key, $feed_type, $target, $target_name, $schedule, $no_of_feeds);
                        break;
                    case 'daily':
                        if($hour == 07){
                            $this->update_feed($key, $feed_type, $target, $target_name, $schedule, $no_of_feeds);
                        }
                        break;
                    case 'weekly':
                        if($passed > 7){
                            $this->update_feed($key, $feed_type, $target, $target_name, $schedule, $no_of_feeds);
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }


    public function update_feed($feed_id, $type, $target, $target_name, $schedule, $no_of_feeds) {
        $instFeed = new Rx_Insta_Feed_Instagram($feed_id, $target, $target_name, $schedule, $no_of_feeds);
        $instFeed->update_rex_feed();
    }
}


