<?php



class Rx_Insta_Feed_Stream {

    private $stream_name;
    protected $settings = array();
    public static function save_stream(Rx_Insta_Feed_Settings $rex_settings, $action_name = 'insert') {
        $stream_name = $rex_settings->get('name');
        $flag = self::save_stream_settings($stream_name, $rex_settings);
        return $flag;
    }

    public static function save_stream_settings($stream_name, Rx_Insta_Feed_Settings $rex_settings){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $stream_table = $prefix.'rx_insta_streams';
        $connectedFeedList = $rex_settings->get('connectedFeedList');
        $settings = serialize($rex_settings->get('settings'));
        try {
            $wpdb->insert(
                $stream_table,
                array(
                    'stream_name' => $stream_name,
                    'stream_settings' => $settings,
                ),
                array('%s', '%s')
            );
            if($wpdb->last_error){
                return false;
            }
           
            return self::save_stream_relations($wpdb->insert_id, $connectedFeedList) ? 'success' : 'failed';
          } catch (Exception $e) {
            return false;
          } 
    }

    public static function save_stream_relations($stream_id, $connectedFeedList){
        
        global $wpdb;
        $prefix = $wpdb->prefix;
        $stream_table_relation = $prefix.'rx_insta_stream_relationship';
        try {
            if($connectedFeedList) {
                foreach($connectedFeedList as $feed) {
                    $wpdb->insert(
                        $stream_table_relation,
                        array(
                            'stream_id' => $stream_id,
                            'feed_id' => $feed['key'],
                        ),
                        array('%d', '%s')
                    );
                }
            }
            
            if($wpdb->last_error){
                return false;
            }
            return true;
          } catch (Exception $e) {
            return false;
          }
    }

    public static function update_stream($stream_id, Rx_Insta_Feed_Settings $rex_settings){
        $flag = self::update_stream_settings($stream_id, $rex_settings);
        return $flag;
    }

    public static function update_stream_settings($stream_id, Rx_Insta_Feed_Settings $rex_settings){
        global $wpdb;
        $prefix = $wpdb->prefix;
        $stream_table = $prefix.'rx_insta_streams';
        $connectedFeedList = $rex_settings->get('connectedFeedList');
        $settings = serialize($rex_settings->get('settings'));
        $stream_name = $rex_settings->get('name');
        try {
            $wpdb->update(
                $stream_table,
                array(
                    'stream_name' => $stream_name,
                    'stream_settings' => $settings,
                ),
                array('id'=>$stream_id)
            );
            if($wpdb->last_error){
                return false;
            }
            return self::update_stream_relations($stream_id, $connectedFeedList) ? 'success' : 'failed';
          } catch (Exception $e) {
            return false;
          } 
    }

    public static function update_stream_relations($stream_id, $connectedFeedList){
        
        global $wpdb;
        $prefix = $wpdb->prefix;
        $stream_table_relation = $prefix.'rx_insta_stream_relationship';
        try {
            $wpdb->delete( $stream_table_relation, array( 'stream_id' => $stream_id ) );
            if($connectedFeedList) {
                foreach($connectedFeedList as $feed) {
                    $wpdb->insert(
                        $stream_table_relation,
                        array(
                            'stream_id' => $stream_id,
                            'feed_id' => $feed['key'],
                        ),
                        array('%d', '%s')
                    );
                }
            }
            
            if($wpdb->last_error){
                return false;
            }
            return true;
          } catch (Exception $e) {
            return false;
          }
    }

    public static function delete_stream($stream_id) {
        global $wpdb;
        $prefix = $wpdb->prefix;
        $stream_table = $prefix.'rx_insta_streams';
        $stream_relation_table = $prefix.'rx_insta_stream_relationship';
        $wpdb->delete( $stream_table, array( 'id' => $stream_id ) );
        if(!$wpdb->last_error) {
            $wpdb->delete( $stream_relation_table, array( 'stream_id' => $stream_id ) );
            return 'success';
        }
        return 'failed';

    }

    public static function get_streams() {
        global $wpdb;
        $streams = array();
        $prefix = $wpdb->prefix;
        $stream_table = $prefix.'rx_insta_streams';
        $stream_relation_table = $prefix.'rx_insta_stream_relationship';
        $sql = "SELECT DISTINCT id, stream_name, stream_settings FROM {$stream_table}";
        $results = $wpdb->get_results($sql);
        $rex_settings = new Rx_Insta_Feed_Settings();
        if($results) {
            foreach ($results as $stream) {
                $settings = unserialize($stream->stream_settings);
                foreach($settings as $attr=>$value) {
                    $rex_settings->set($attr, $value);
                }
                $rex_settings->set('idx', $stream->id);
                $rex_settings->set('key', $stream->id);
                $rex_settings->set('isNew', false);
                $streams[$stream->id] = $rex_settings->get('settings');
            }
        }
        return $streams;
    }

    public static function get_feeds() {
        global $wpdb;
        $feeds = array();
        $prefix = $wpdb->prefix;
        $feed_table = $prefix.'rx_insta_feeds';
        $feed_meta_table = $prefix.'rx_insta_feedmeta';
        $sql = "Select DISTINCT feeds.feed_id, feeds.post_status, feeds.post_type, feeds.feed_name, feed_meta.meta_value FROM {$feed_table} as feeds  INNER JOIN {$feed_meta_table} as feed_meta On feed_meta.feed_id=feeds.feed_id ORDER BY feeds.id DESC;";
        $results = $wpdb->get_results($sql);

        if($results) {
            foreach ($results as $feed) {
                $feeds[$feed->feed_id] = array(
                    'feed_name' => $feed->feed_name,
                    'post_type' => $feed->post_type,
                    'post_status'=> $feed->post_status,
                    'feed_info' => unserialize($feed->meta_value)
                );
            }
        }

        return $feeds;
    }

}