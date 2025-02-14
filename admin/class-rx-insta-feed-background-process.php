<?php

/**
 * The Rx_Insta_Feed_Background_Process class file that
 * handle background process
 *
 * @link       https://rextheme.com
 * @since      2.0.0
 *
 * @package    Rx_Insta_Feed_Background_Process
 * @subpackage Rx_Insta_Feed/admin
 */


class Rx_Insta_Feed_Background_Process extends WP_Background_Process {

    protected $action = 'rx_insta_feed_background_process';


    /**
     * Task
     *
     * Override this method to perform any actions required on each
     * queue item. Return the modified item for further processing
     * in the next pass through. Or, return false to remove the
     * item from the queue.
     *
     * @param mixed $item Queue item to iterate over
     *
     * @return mixed
     */
    protected function task( $feeds ) {
        sleep(5);
        Rx_Insta_Feed_Base_Feed::saveFeed($feeds);
        return false;
    }


    /**
     * Complete
     *
     * Override if applicable, but ensure that the below actions are
     * performed, or, call parent::complete().
     */
    protected function complete() {
        parent::complete();
    }
}
