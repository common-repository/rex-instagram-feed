<?php


class Rx_Insta_Feed_DB_MANAGER {

    public $rex_wpdb;


    public function __construct(){
        global $wpdb;
        $this->rex_wpdb = $wpdb;
    }

    public function trigger() {
        $this->create_stream_table();
        $this->create_stream_relations_table();
        $this->create_feeds_table();
        $this->create_feedmeta_table();
        $this->create_option_table();
    }

    public function create_stream_table() {
        $charset_collate = $this->rex_wpdb->get_charset_collate();
        $sql = "CREATE TABLE IF NOT EXISTS `{$this->rex_wpdb->base_prefix}rx_insta_streams` (
                  id int(10) unsigned AUTO_INCREMENT,
                  stream_name VARCHAR(200),
                  stream_settings LONGBLOB,
                  PRIMARY KEY (id)
          ) $charset_collate;";
        require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
        dbDelta( $sql );
    }

    public function create_stream_relations_table() {
        $charset_collate = $this->rex_wpdb->get_charset_collate();
        $sql = "CREATE TABLE IF NOT EXISTS `{$this->rex_wpdb->base_prefix}rx_insta_stream_relationship` (
                  id int(10) unsigned AUTO_INCREMENT,
                  stream_id int(10),
                  feed_id varchar(20),
                  PRIMARY KEY (id)
          ) $charset_collate;";
        require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
        dbDelta( $sql );
    }


    public function create_feeds_table() {
        $charset_collate = $this->rex_wpdb->get_charset_collate();
        $sql = "CREATE TABLE IF NOT EXISTS `{$this->rex_wpdb->base_prefix}rx_insta_feeds` (
                  id int(11) NOT NULL AUTO_INCREMENT,
                  feed_id VARCHAR(20) NOT NULL,
                  feed_name VARCHAR(20),
                  post_id VARCHAR(20),
                  post_type VARCHAR(20),
                  post_content BLOB,
                  post_permalink VARCHAR(255),
                  post_status varchar(15) NULL,
                  image_url VARCHAR(255),
                  media_url VARCHAR(255),
                  media_type VARCHAR(100),
                  auditional_info longtext,
                  post_timestamp INT,
                  user_name VARCHAR(20),
                  user_profile_name VARCHAR(100),
                  user_avatar VARCHAR(255),
                  user_profile_link VARCHAR(255),
                  PRIMARY KEY (id)
          ) $charset_collate;";
        require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
        dbDelta( $sql );
    }

    public function insert_plugin_init_value() {
        global $wpdb;
        $table = $wpdb->prefix.'rx_insta_options';
        $data = array('option_name' => 'rxsmf-db-version', 'option_value' => '1.0');
        $format = array('%s','%s');
        $wpdb->replace($table,$data,$format);
    }


    public function create_feedmeta_table() {
        $charset_collate = $this->rex_wpdb->get_charset_collate();
        $sql = "CREATE TABLE IF NOT EXISTS `{$this->rex_wpdb->base_prefix}rx_insta_feedmeta` (
                  id int(11) NOT NULL AUTO_INCREMENT,
                  feed_id VARCHAR(20) NOT NULL,
                  meta_key VARCHAR(20),
                  meta_value longtext,
                  PRIMARY KEY (id)
          ) $charset_collate;";
        require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
        dbDelta( $sql );
    }


    public function create_option_table() {
        $charset_collate = $this->rex_wpdb->get_charset_collate();
        $sql = "CREATE TABLE IF NOT EXISTS `{$this->rex_wpdb->base_prefix}rx_insta_options` (
                  option_id bigint(20) unsigned AUTO_INCREMENT,
                  option_name VARCHAR(191),
                  option_value longtext,
                  PRIMARY KEY (option_id),
                  UNIQUE KEY (option_name)
          ) $charset_collate;";
        require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
        dbDelta( $sql );
    }


    public static function get_rex_option($option, $token = false) {
        global $wpdb;
        $table_name = $wpdb->prefix.'rx_insta_options';
        $value = $wpdb->get_var($wpdb->prepare(
            "Select option_value from {$table_name} WHERE option_name = %s limit 1",
            $option
        ));
        if($wpdb->last_error)
            return false;
        if($token)
            return $value;
        return unserialize($value);
    }


    public static function update_rex_option($option, $newValue) {
        global $wpdb;
        $table_name = $wpdb->prefix.'rx_insta_options';
        $wpdb->query($wpdb->prepare(
            "Insert into `$table_name` (option_name, option_value) VALUES (%s, %s) ON DUPLICATE KEY UPDATE option_name=%s, option_value = %s",
            $option,
            $newValue,
            $option,
            $newValue
        ));
        if($wpdb->last_error)
            return false;
        return true;
    }
    


    public static function delete_rex_option($option) {
        global $wpdb;
        $table_name = $wpdb->prefix.'rx_insta_options';
        $wpdb->query($wpdb->prepare(
            "DELETE FROM `$table_name` WHERE `option_name` = %s;",
            $option
        ));
        if($wpdb->last_error)
            return false;
        return true;
    }


    public static function delete_all_instance() {
        global $wpdb;

        $stream_table = $wpdb->prefix.'rx_insta_streams';
        $stream_relations_table = $wpdb->prefix.'rx_insta_stream_relationship';
        $feed_table = $wpdb->prefix.'rx_insta_feeds';
        $feed_meta_table = $wpdb->prefix.'rx_insta_feedmeta';
        $option_table = $wpdb->prefix.'rx_insta_options';

        $wpdb->query( "DROP TABLE IF EXISTS $stream_table" );
        $wpdb->query( "DROP TABLE IF EXISTS $stream_relations_table" );
        $wpdb->query( "DROP TABLE IF EXISTS $feed_table" );
        $wpdb->query( "DROP TABLE IF EXISTS $feed_meta_table" );
        $wpdb->query( "DROP TABLE IF EXISTS $option_table" );
    }
}