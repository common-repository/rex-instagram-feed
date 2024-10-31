<?php


/**
 * @subpackage REST_Controller
 */
class Rx_Insta_Feed_Base_Operations {
    /**
     * Instance of this class.
     *
     * @since    0.8.1
     *
     * @var      object
     */
    protected static $instance = null;


    /**
     * Namespace of of this endpoints.
     *
     * @since    0.8.1
     *
     * @var      object
     */
    public  $namespace = '';


    /**
     * Initialize the plugin by setting localization and loading public scripts
     * and styles.
     *
     * @since     0.8.1
     */
    public function __construct() {
        $version = '1';
        $this->plugin_slug = 'rx-insta-feed';
        $this->namespace = $this->plugin_slug . '/v' . $version;

        $this->do_hooks();
    }

    /**
     * Set up WordPress hooks and filters
     *
     * @return void
     */
    public function do_hooks() {
        add_action( 'rest_api_init', array( $this, 'register_routes' ) );
    }

    /**
     * Return an instance of this class.
     *
     * @since     0.8.1
     *
     * @return    object    A single instance of this class.
     */
    public static function get_instance() {

        // If the single instance hasn't been set, set it now.
        if ( null == self::$instance ) {
            self::$instance = new self;
            self::$instance->do_hooks();
        }

        return self::$instance;
    }

    /**
     * Register the routes for the objects of the controller.
     */
    public function register_routes(){


        register_rest_route( $this->namespace, '/loadAllFeeds', array(
            array(
                'methods'               => \WP_REST_Server::READABLE,
                'callback'              => array( $this, 'load_all_feeds' ),
                'permission_callback'   => array( $this, 'load_all_feeds' ),
            ),
        ) );

        register_rest_route( $this->namespace, '/createFeed/instagram', array(
            array(
                'methods'               => \WP_REST_Server::CREATABLE,
                'callback'              => array( $this, 'create_social_feed_instagram' ),
                'permission_callback'   => array( $this, 'rsf_permissions_check' ),
            ),
        ) );

        register_rest_route( $this->namespace, '/updateFeed/instagram', array(
            array(
                'methods'               => \WP_REST_Server::EDITABLE,
                'callback'              => array( $this, 'update_instagram_feed' ),
                'permission_callback'   => array( $this, 'rsf_permissions_check' ),
            ),
        ) );

        register_rest_route( $this->namespace, '/deletefeed/(?P<feed_id>\w+)', array(
            array(
                'methods'               => \WP_REST_Server::DELETABLE,
                'callback'              => array( $this, 'delete_feed' ),
                'permission_callback'   => array( $this, 'rsf_permissions_check' ),
            ),
        ) );


        register_rest_route( $this->namespace, '/changeFeedStatus', array(
            array(
                'methods'               => \WP_REST_Server::EDITABLE,
                'callback'              => array( $this, 'change_feed_status' ),
                'permission_callback'   => array( $this, 'rsf_permissions_check' ),
            ),
        ) );

       
        register_rest_route( $this->namespace, '/createStream', array(
            array(
                'methods'               => \WP_REST_Server::CREATABLE,
                'callback'              => array( $this, 'create_stream' ),
                'permission_callback'   => array( $this, 'rsf_permissions_check' ),
            ),
        ) );


        register_rest_route( $this->namespace, '/updateStream/(?P<stream_id>\d+)', array(
            array(
                'methods'               => \WP_REST_Server::EDITABLE,
                'callback'              => array( $this, 'update_stream' ),
                'permission_callback'   => array( $this, 'rsf_permissions_check' ),
            ),
        ) );


        register_rest_route( $this->namespace, '/deleteStream/(?P<stream_id>\d+)', array(
            array(
                'methods'               => \WP_REST_Server::DELETABLE,
                'callback'              => array( $this, 'delete_stream' ),
                'permission_callback'   => array( $this, 'rsf_permissions_check' ),
            ),
        ) );

        register_rest_route( $this->namespace, '/getAccessToken/(?P<provider>\w+)', array(
            array(
                'methods'               => \WP_REST_Server::READABLE,
                'callback'              => array( $this, 'get_access_token' ),
                'permission_callback'   => array( $this, 'get_access_token' ),
                'args'                  => array(
                    'provider' => array(
                        'validate_callback' => function( $param, $request, $key ) {
                            return  $param ;
                        }
                    ),
                ),
            ),
        ) );

        register_rest_route( $this->namespace, '/updateAccessToken/(?P<provider>\w+)', array(
            array(
                'methods'               => \WP_REST_Server::CREATABLE,
                'callback'              => array( $this, 'update_access_token' ),
                'permission_callback'   => array( $this, 'rsf_permissions_check' ),
                'args'                  => array(
                    'provider' => array(
                        'validate_callback' => function( $param, $request, $key ) {
                            return  $param ;
                        }
                    ),
                ),
            ),
        ) );

        register_rest_route( $this->namespace, '/deleteAccessToken/(?P<provider>\w+)', array(
            array(
                'methods'               => \WP_REST_Server::DELETABLE,
                'callback'              => array( $this, 'delete_access_token' ),
                'permission_callback'   => array( $this, 'rsf_permissions_check' ),
                'args'                  => array(
                    'provider' => array(
                        'validate_callback' => function( $param, $request, $key ) {
                            return  $param ;
                        }
                    ),
                ),
            ),
        ) );

        register_rest_route( $this->namespace, '/getAllStreams', array(
            array(
                'methods'               => \WP_REST_Server::READABLE,
                'callback'              => array( $this, 'load_all_streams' ),
                'permission_callback'   => array( $this, 'load_all_streams' ),
            ),
        ) );


        register_rest_route( $this->namespace, '/getAllSettings', array(
            array(
                'methods'               => \WP_REST_Server::READABLE,
                'callback'              => array( $this, 'get_settings' ),
                'permission_callback'   => array( $this, 'get_settings' ),
            ),
        ) );


        register_rest_route( $this->namespace, '/updateSettings', array(
            array(
                'methods'               => \WP_REST_Server::EDITABLE,
                'callback'              => array( $this, 'update_settings' ),
                'permission_callback'   => array( $this, 'update_settings' ),
            ),
        ) );
    }


    /**
     * Get SaveData
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Response
     */
    public function get_access_token( $data ) {
        $provider = 'instagram';
        if(isset($data['provider'])) {
            $provider = $data['provider'];
        }
        $option_name = $provider.'-access-token';
        $token = Rx_Insta_Feed_DB_MANAGER::get_rex_option($option_name, true);
        return new \WP_REST_Response( array(
            'success' => true,
            'token' => $token
        ), 200 );
    }

    /**
     * Create OR Update SaveData
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Response
     */
    public function update_access_token( $request ) {
        $provider = 'instagram';
        if(isset($data['provider'])) {
            $provider = $data['provider'];
        }
        $option_name = $provider.'-access-token';
        if($request->get_param( 'token' )) {
            $updated = Rx_Insta_Feed_DB_MANAGER::update_rex_option($option_name, $request->get_param( 'token' ));
        }
        return new \WP_REST_Response( array(
            'success'   => true,
            'token'     => $updated
        ), 200 );
    }

    /**
     * Delete SaveData
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Response
     */
    public function delete_access_token( $request ) {

        $deleted = false;
        if($request['provider']) {
            $option_name = $request['provider'].'-access-token';
            $deleted = Rx_Insta_Feed_DB_MANAGER::delete_rex_option($option_name);
        }
        if ($deleted) {
            return new \WP_REST_Response( array(
                'success'   => $deleted,
            ), 200 );
        }else {
            echo 'not deleted';
            return $deleted;
        }
        return new WP_Error( 'cant-delete', __( 'message', 'rex-social-feed'), array( 'status' => 500 ) );
    }


    /**
     * Get all feeds
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Response
     */
    public function load_all_streams($request) {
        $streams = Rx_Insta_Feed_Stream::get_streams();
        return new \WP_REST_Response( array(
            'success'   => true,
            'streams'     => $streams
        ), 200 );
    }


    /**
     * Get all feeds
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Response
     */
    public function load_all_feeds() {
        $feeds = Rx_Insta_Feed_Stream::get_feeds();
        return new \WP_REST_Response( array(
            'success'   => true,
            'feeds'     => $feeds
        ), 200 );
    }

    /**
     * Get all feeds
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Response
     */
    public function create_stream($request) {
        $rex_settings = new Rx_Insta_Feed_Settings();
        $params = $request->get_params();
        if($params) {
            foreach($params as $param => $value) {
                $rex_settings->set($param, $value);
            }
        }
        $response = Rx_Insta_Feed_Stream::save_stream($rex_settings, 'insert');
        if($response === 'success'){
            return new \WP_REST_Response( array(
                'success'   => true,
            ), 200 );
        }else {
            return new \WP_REST_Response( array(
                'success'   => false,
                'message'   => $response
            ), 200 );
        }
        return new WP_Error( 'CODE/CREATEFAILED', __( 'Feed not created.', 'rex-social-feed'), array( 'status' => 500 ) );
    }


    /**
     * Get all feeds
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Response
     */
    public function update_stream($request) {
        if($request['stream_id']) {
            $rex_settings = new Rx_Insta_Feed_Settings();
            $params = $request->get_params();
            if($params) {
                foreach($params as $param => $value) {
                    $rex_settings->set($param, $value);
                }
            }
            $response = Rx_Insta_Feed_Stream::update_stream($request['stream_id'], $rex_settings);
            if($response === 'success'){
                return new \WP_REST_Response( array(
                    'success'   => true,
                ), 200 );
            }else {
                return new \WP_REST_Response( array(
                    'success'   => false,
                    'message'   => $response
                ), 200 );
            }
            return new WP_Error( 'CODE/CREATEFAILED', __( 'Feed not created.', 'rex-social-feed'), array( 'status' => 500 ) );
        }

    }


    /**
     * Get all feeds
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Response
     */
    public function delete_stream($request) {
        $rex_settings = new Rx_Insta_Feed_Settings();
        $stream_id = $request->get_param('stream_id');
        $response = Rx_Insta_Feed_Stream::delete_stream($stream_id);
        if($response === 'success'){
            return new \WP_REST_Response( array(
                'success'   => true,
            ), 200 );
        }else {
            return new \WP_REST_Response( array(
                'success'   => false,
                'message'   => $response
            ), 200 );
        }
        return new WP_Error( 'CODE/DELETEFAILED', __( 'Stream not deleted.', 'rex-social-feed'), array( 'status' => 500 ) );
    }


    /**
     * Create feed
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Response
     */
    public function create_social_feed_instagram($request) {
        $instFeed = new Rx_Insta_Feed_Instagram($request->get_param( 'feedId' ), $request->get_param( 'type' ), $request->get_param( 'value' ), $request->get_param( 'interval' ), $request->get_param( 'noOffeeds' ));
        $message = $instFeed->generate_feed();
        if($message === 'success'){
            return new \WP_REST_Response( array(
                'success'   => true,
            ), 200 );
        }else {
            return new \WP_REST_Response( array(
                'success'   => false,
                'message'   => $message
            ), 200 );
        }
        return new WP_Error( 'CODE/CREATEFAILED', __( 'Feed not created.', 'rex-social-feed'), array( 'status' => 500 ) );
    }


    /**
     * Update Feed
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Response
     */
    public function update_instagram_feed($request) {
       $success = false;
       $instFeed = new Rx_Insta_Feed_Instagram($request->get_param( 'feedId' ), $request->get_param( 'type' ), $request->get_param( 'value' ), $request->get_param( 'interval' ),$request->get_param( 'noOffeeds' ));
       $message = $instFeed->update_rex_feed();
       if($message === 'success'){
            return new \WP_REST_Response( array(
                'success'   => true,
            ), 200 );
        }else {
            return new \WP_REST_Response( array(
                'success'   => false,
                'message'   => $message
            ), 200 );
        }
        return new WP_Error( 'CODE/CREATEFAILED', __( 'Feed not updated', 'rex-social-feed'), array( 'status' => 500 ) );
    }

    /**
     * Delete Feed
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Response
     */
    public function delete_feed($request) {
        $success = false;
        if($request->get_param('feed_id')) {
            $feedId = $request->get_param('feed_id');
            $success = Rx_Insta_Feed_Base_Feed::delete_feed($feedId);
        }
        if ($success) {
            return new \WP_REST_Response( array(
                'success'   => $success,
            ), 200 );
        }else {
            return new WP_Error( 'CODE/DELETEFAILED', __( 'Feed can not be deleted', 'rex-social-feed'), array( 'status' => 500 ) );
        }
        return new WP_Error( 'CODE/DELETEFAILED', __( 'Feed can not be deleted', 'rex-social-feed'), array( 'status' => 500 ) );
    }


    /**
     * Update Feed
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Response
     */
    public function change_feed_status($request) {
        $message = '';
        if($request->get_param( 'feedID' )){
            $message = Rx_Insta_Feed_Base_Feed::update_feed_status($request->get_param( 'feedID' ), $request->get_param( 'isActive' ));
        }
        if($message === 'success'){
             return new \WP_REST_Response( array(
                 'success'   => true,
             ), 200 );
         }else {
             return new \WP_REST_Response( array(
                 'success'   => false,
                 'message'   => $message
             ), 200 );
         }
         return new WP_Error( 'CODE/UPDATESTATUSFAILED', __( 'Feed not updated', 'rex-social-feed'), array( 'status' => 500 ) );
     }


    /**
     * Get settings
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Response
    */
    public function get_settings() {
        $option = 'rxsmf-settings';
        $settings = Rx_Insta_Feed_DB_MANAGER::get_rex_option($option);
        return new \WP_REST_Response( array(
            'success' => true,
            'settings'  => $settings
        ), 200 );
    }


    /**
     * Update/Create settings
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Response
    */
    public function update_settings($request) {
        $option = 'rxsmf-settings';
        if($request->get_params()) {
            $settings = serialize($request->get_params());
            $response = Rx_Insta_Feed_DB_MANAGER::update_rex_option($option, $settings);
        }
        if($response) {
            return new \WP_REST_Response( array(
                'success' => true,
            ), 200 );
        }else {
            return new \WP_REST_Response( array(
                'success'   => false,
            ), 200 );
        }
        return new WP_Error( 'CODE/UPDATESTATUSFAILED', __( 'Feed not updated', 'rex-social-feed'), array( 'status' => 500 ) );
        
    }
    



    /**
     * Check if a given request has access to update a setting
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|bool
     */
    public function rsf_permissions_check( $request ) {
        return current_user_can( 'manage_options' );
    }
}
