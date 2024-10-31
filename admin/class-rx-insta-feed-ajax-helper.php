<?php



if ( ! defined( 'WPINC' ) ) die;

class Rx_Insta_Feed_Ajax {

    /**
     * Hook in ajax handlers.
     *
     * @since    1.0.0
     */
    public static function init() {

        $validations = array(
            'logged_in' => true,
            'user_can'  => 'manage_options',
        );

        wp_ajax_helper()->handle( 'generate-insta-feed' )
            ->with_callback( array( 'Rx_Insta_Feed_Ajax', 'generate_insta_feed' ) )
            ->with_validation( $validations );

    }


    public function generate_insta_feed($payload) {
        $target = $payload['target'];
        $targetName = $payload['targetName'];
        $feedId = $payload['feedId'];
        $instaFeed = new Rex_Insta_Feed($feedId, $target, $targetName);
        $instaFeed->generate_feed();
        return array(
            'feed' => true,
            'target'=> $target,
            'targetName' => $targetName,
            'feedId'    => $feedId
        );
    }

}
