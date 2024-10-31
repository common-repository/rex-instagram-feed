<?php

class Rx_Insta_Feed_Shortcode {
    protected $streamId;
    protected $feedIds = array();
    protected $feeds = array();
    protected $strem_settings;
     
    public function __construct($streamId){
        $this->streamId = $streamId;
    }

    public function isStreamExists() {
        global $wpdb;
		$prefix = $wpdb->prefix;
		$stream_table = $prefix.'rx_insta_streams';
		$stream_exixts = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT id FROM $stream_table
				WHERE id = %d LIMIT 1",
				$this->streamId
			)
		);
		if($stream_exixts>0){
			return true;
		}
		return false;
    }

    public function set_stream_settings() {
        global $wpdb;
		$prefix = $wpdb->prefix;
        $stream_table = $prefix.'rx_insta_streams';
        $rex_settings = new Rx_Insta_Feed_Settings();
        $results = $wpdb->get_results($wpdb->prepare("SELECT stream_settings FROM $stream_table WHERE id = %d", $this->streamId));
        if($results) {
            foreach ($results as $stream) {
                $settings = unserialize($stream->stream_settings);
                foreach($settings as $attr=>$value) {
                    $rex_settings->set($attr, $value);
                }
            }
        }
        $this->strem_settings = $rex_settings;
    }

    public function set_feed_ids() {
		global $wpdb;
		$prefix = $wpdb->prefix;
		$stream_table_relation = $prefix.'rx_insta_stream_relationship';
		$feed_ids = array();
		$result = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT feed_id FROM $stream_table_relation
				WHERE stream_id = %d",
				$this->streamId
			)
		);

		foreach($result as $feed) {
			array_push($feed_ids, $feed->feed_id);
        }
        $this->feedIds = $feed_ids;
    }

    public function get_no_of_feeds() {
        return $this->strem_settings->get('noOfPhotos') ? $this->strem_settings->get('noOfPhotos') : 20;
    }

    public function get_feed_order() {
        if($this->strem_settings->get('itemOrder')) {
            $order = $this->strem_settings->get('itemOrder');
        }else {
            $order = 'n2o';
        }
        switch($order) {
            case 'n2o':
                return 'DESC';
                break;
            case 'o2n':
                return 'ASC';
                break;
            case 'rnd':
                return 'rnd';
                break;
            default:
                return 'DESC';
                break;
        }
        return 'DESC';
    }
    
    public function get_feeds($paged = 1) {
		global $wpdb;
		$prefix = $wpdb->prefix;
		$feed_table = $prefix.'rx_insta_feeds';
		$feed_id_count = count($this->feedIds);
        $feeds = array();

		if($feed_id_count>0) {
			$stringPlaceholders = array_fill(0, $feed_id_count, '%s');
            $format = implode(', ', $stringPlaceholders);
            if($this->get_feed_order() !== 'rnd') {
                $result = $wpdb->get_results(
                    $wpdb->prepare(
                        "SELECT * FROM $feed_table
                        WHERE feed_id in ($format) AND post_status = 'active'  ORDER BY post_timestamp {$this->get_feed_order()}  LIMIT {$this->get_no_of_feeds()}",
                        $this->feedIds
                    )
                    
                );
            }else{
                $result = $wpdb->get_results(
                    $wpdb->prepare(
                        "SELECT * FROM $feed_table
                        WHERE feed_id in ($format) AND post_status = 'active' ORDER BY RAND()  LIMIT {$this->get_no_of_feeds()}",
                        $this->feedIds
                    )
                    
                );
            }
           
			
			
			foreach($result as $feed) {
				array_push($feeds, $feed);
			}
        }
        $this->feeds = $feeds;
    }



    public function checkFeedStatus($feedId){
        global $wpdb;
        $feed_table = $wpdb->prefix.'rx_insta_feeds';
        $status = $wpdb->get_var( $wpdb->prepare( "SELECT post_status from $feed_table where feed_id = %s", $feedId ) );
        return $status;
    }

    public function feedHasThumbnail() {

    }
    
    public function dynamicCSS(){
       
    }

    public function get_layout() {
        return $this->strem_settings->get('layout');
    }


    public function ajax_render(){
        $layout = $this->get_layout();
        $settings = $this->strem_settings;
        $feeds = $this->feeds;
        $rex_feed_option = Rx_Insta_Feed_DB_MANAGER::get_rex_option('rxsmf-settings');
        if($rex_feed_option['newTab']) {
            $new_tab = $rex_feed_option['newTab'] === 'yes' ? true : false;
        }else {
            $new_tab = true;
        }
        
        switch ($layout){
           case 'grid':
               require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/partials/grid.php';
               break;
           default:
               require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/partials/grid.php';
               break;
       }
    }

}