<?php



class InstagramEndpoins extends BaseOperations{

    public function register_routes()
    {

        register_rest_route( $this->namespace, '/getInstagramToken', array(
            array(
                'methods'               => \WP_REST_Server::READABLE,
                'callback'              => array( $this, 'get_instagram_token' ),
                'permission_callback'   => array( $this, 'get_instagram_token' ),
                'args'                  => array(),
            ),
        ) );

        register_rest_route( $this->namespace, '/updateInstagramToken', array(
            array(
                'methods'               => \WP_REST_Server::CREATABLE,
                'callback'              => array( $this, 'update_access_token' ),
                'permission_callback'   => array( $this, 'rsf_permissions_check' ),
                'args'                  => array(),
            ),
        ) );


        register_rest_route( $this->namespace, '/deleteInstagramToken', array(
            array(
                'methods'               => \WP_REST_Server::DELETABLE,
                'callback'              => array( $this, 'delete_access_token' ),
                'permission_callback'   => array( $this, 'rsf_permissions_check' ),
                'args'                  => array(),
            ),
        ) );
    }


    /**
     * Get SaveData
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function get_instagram_token( $request ) {
        $example_option = get_option( 'instagram-access-token' );
        return new \WP_REST_Response( array(
            'success' => true,
            'value' => ''
        ), 200 );
    }

    /**
     * Create OR Update SaveData
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function update_access_token( $request ) {
        $updated = update_option( 'instagram-access-token', $request->get_param( 'instagram_access_token' ) );
        return new \WP_REST_Response( array(
            'success'   => $updated,
        ), 200 );
    }

    /**
     * Delete SaveData
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function delete_example( $request ) {
        $deleted = delete_option( 'wpr_example_setting' );
        return new \WP_REST_Response( array(
            'success'   => $deleted,
            'value'     => ''
        ), 200 );
    }


}