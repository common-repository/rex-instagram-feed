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
class Rx_Insta_Feed_Public_Ajax {
    /**
    * Load shortcode ajax
    */
    function rx_insta_feed_shortcode() {
        $stream_id = intval($_POST['stream_id']);
        $paged = intval($_POST['paged']);
        if($stream_id) {
            $shortcode = new Rx_Insta_Feed_Shortcode($stream_id);
            if($shortcode->isStreamExists()){
                $shortcode->set_feed_ids();
                $shortcode->set_stream_settings();
                $shortcode->get_feeds($paged);
                $shortcode->ajax_render();
            }else{
                echo 'Stream with this id is not exists.';
            }
        }else {
            echo 'Stream id should be given.';
        }
        die();
    }
}
