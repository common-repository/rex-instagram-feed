<?php



abstract class Rx_Insta_Feed_Base_Feed {

    private $feedId;

    public $provider;

    public $interval;

    protected $feedData = array();

    public function __construct($provider, $feedid, $interval){
        $this->provider = $provider;
        $this->interval = $interval;
        $this->setFeedId($feedid);
    }

    protected function setFeedId($id) {
        $this->feedId = $id;
    }

    protected function getFeedId() {
        return $this->feedId;
    }

    public function milliseconds() {
        // $mt = explode(' ', microtime());
        // return ((int)$mt[1]) * 1000 + ((int)round($mt[0] * 1000));
        return strtotime("now");
    }

    public static function delete_feed($feed_id, $stream=true) {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $feed_table = $prefix.'rx_insta_feeds';
        $feed_meta_table = $prefix.'rx_insta_feedmeta';
        $wpdb->delete( $feed_table, array( 'feed_id' => $feed_id ) );
        if(!$wpdb->last_error) {
            $wpdb->delete( $feed_meta_table, array( 'feed_id' => $feed_id ) );
        }
        if(!$wpdb->last_error && $stream)
            return self::update_streams($feed_id);

        return false;
    }

    public static function update_streams($feed_id) {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $stream_relation_table = $prefix.'rx_insta_stream_relationship';
        $results = $wpdb->get_results( $wpdb->prepare( "SELECT stream_id FROM $stream_relation_table WHERE feed_id = %s", $feed_id) );
        $flag = 'success';
        if($results){
            foreach ($results as $stream) {
                $flag = self::delete_feed_from_stream($stream->stream_id, $feed_id);
            }
        }
        return $flag;
    }

    public static function delete_feed_from_stream($stream_id, $feed_id) {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $stream_table = $prefix.'rx_insta_streams';
        $rex_settings = new Rx_Insta_Feed_Settings();
        $results = $wpdb->get_results( $wpdb->prepare( "SELECT stream_settings FROM $stream_table WHERE id = %d LIMIT 1", $stream_id));
        foreach ($results as $result) {
            $stream_settings = unserialize($result->stream_settings);
            foreach ($stream_settings as $attr=>$value) {
                $rex_settings->set($attr, $value);
            }
            $newList = array_filter($rex_settings->get('connectedFeedList'), function($x) use ($feed_id) { return $x['key'] != $feed_id; });
            $newLists = array();
            foreach ($newList as $list) {
                array_push($newLists, $list);
            }
            $rex_settings->set('connectedFeedList', $newLists);
            return Rx_Insta_Feed_Stream::update_stream($stream_id, $rex_settings);
        }
        return false;

    }

    public static function update_feed_status($feed_id, $status = 'false') {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $feed_table = $prefix.'rx_insta_feeds';
        $feed_meta_table = $prefix.'rx_insta_feedmeta';
        if($status)
            $wpdb->update($feed_table, array('post_status' => 'active'), array('feed_id'=>$feed_id));
        else
            $wpdb->update($feed_table, array('post_status' => 'deactive'), array('feed_id'=>$feed_id));

        $result = $wpdb->get_row( $wpdb->prepare( "SELECT meta_value FROM $feed_meta_table WHERE feed_id = %s", $feed_id), ARRAY_A );
        if($result) {
            $feed_meta = unserialize($result['meta_value']);
            $feed_meta['isActive'] = $status;
            $wpdb->update($feed_meta_table, array('meta_value' => serialize($feed_meta)), array('feed_id'=>$feed_id));
        }
        if(!$wpdb->last_error)
            return 'success';
        return 'failed';
    }

    public static function saveFeed($feeds) {
        global $wpdb;
        $tableName = $wpdb->prefix.'rx_insta_feeds';
        foreach ($feeds as $feed) {
            $feed_id = $wpdb->insert($tableName, array(
                'feed_id' => $feed->feed_id,
                'feed_name' => $feed->feed_name,
                'post_id' => $feed->post_id,
                'post_type' => $feed->post_type,
                'post_content' => $feed->post_content,
                'post_permalink' => $feed->post_permalink,
                'post_status' => 'active',
                'image_url' => $feed->image_url,
                'media_type' => $feed->media_type,
                'media_url' => $feed->media_url,
                'post_timestamp' => $feed->post_timestamp,
                'auditional_info' => $feed->auditional_info,
                'user_name' => $feed->user_name,
                'user_profile_name' => $feed->user_profile_name,
                'user_avatar' => $feed->user_avatar,
                'user_profile_link' => $feed->user_profile_link,
            ));
        }
        if($wpdb->last_error) {
            return false;
        }
        return true;
    }

    protected function saveMeta() {}

    protected function generate_feed_object() {}

}