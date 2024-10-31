<?php

use InstagramScraper\Endpoints;
use InstagramScraper\Instagram;
use InstagramScraper\Model\Media;




class Rx_Insta_Feed_Instagram extends Rx_Insta_Feed_Base_Feed {

    protected $target;
    
    protected $noOffeeds;

    protected $targetName;

    protected $instagramScrapper;

    protected $medias;

    protected $user;

    protected $wpdb;

    protected $tablePrefix;

    protected $backGroundProcess;


    public function __construct($feedId, $target, $targetName, $interval, $noOffeeds = '20'){
        parent::__construct('instagram', $feedId, $interval);
        $this->target = $target;
        $this->targetName = $targetName;
        $this->noOffeeds = $noOffeeds;
        $this->instagramScrapper = new Instagram();
    }


    public function generate_feed($update = false) {
        global $backGroundProcess;
        switch ($this->target) {
            case 'user':
                try{
                    $this->medias = $this->instagramScrapper->getMedias($this->targetName, (int) $this->noOffeeds);
                }catch (Exception $e){
                    return $e->getMessage();
                }
                break;
            case 'hashtag':
                try{
                    $this->medias = $this->instagramScrapper->getMediasByTag($this->targetName, (int) $this->noOffeeds);
                }catch (Exception $e){
                    return $e->getMessage();
                }
                break;
            case 'location':
                try{
                    $this->medias = $this->instagramScrapper->getMediasByLocationId($this->targetName, (int) $this->noOffeeds);
                }catch (Exception $e){
                    return $e->getMessage();
                }
                break;
        }
        
        foreach ($this->medias as $media) {
            $rexMedia = $this->instagramScrapper->getMediaByUrl($media->getLink());
            $rexPost = $this->create_rex_feed($rexMedia);
            $this->feedData[$rexPost->post_id] = $rexPost;
        }
        if($update) {
            Rx_Insta_Feed_Base_Feed::delete_feed($this->getFeedId(), false);
        }
        $feedData = $this->chunk_feed_array();
        $first_array = array_shift($feedData);
        foreach ($feedData as $feed_array) {
            $backGroundProcess->push_to_queue($feed_array);
        }
        $backGroundProcess->save()->dispatch();
        $success = false;
        if(count($first_array) > 0) {
            $success = $this->saveFeed($first_array);
            if($success) {
                $this->saveMeta();
            }
        }
        if($success)
            return 'success';
        return 'failed';
    }


    public function chunk_feed_array() {
        return array_chunk($this->feedData, 10);
    }


    protected function create_rex_feed (Media $media) {
        $account = $media->getOwner();
        $rexFeed = new \stdClass();
        $rexFeed->feed_id = $this->getFeedId();
        $rexFeed->feed_name = $this->targetName;
        $rexFeed->post_id = $media->getId();
        $rexFeed->post_type = 'instagram';
        $rexFeed->post_content = $media->getCaption();
        $rexFeed->post_permalink = $media->getLink();
        $rexFeed->image_url = $media->getImageHighResolutionUrl();
        $rexFeed->media_type = $media->getType();
        $rexFeed->media_url = $this->getMediaUrl($media);


        $rexFeed->post_timestamp = $media->getCreatedTime();
        $rexFeed->auditional_info = $this->getAuditionalInfo($media);
        $rexFeed->user_name = $account->getUsername();
        $rexFeed->user_profile_name = Rx_Insta_Feed_Utils::removeEmoji($account->getFullName());
        $rexFeed->user_avatar = $account->getProfilePicUrlHd();
        $rexFeed->user_profile_link = 'https://www.instagram.com/'.$rexFeed->user_name;
        return $rexFeed;
    }


    public function update_rex_feed ($update = true) {
        $success = $this->generate_feed(true);
        return $success;
    }


    protected function populateUser($userId) {
        $account = $this->instagramScrapper->getAccountById($userId);
        $user = new \stdClass();
        $user->userName = $account->getUsername();
        $user->fullName = Rx_Insta_Feed_Utils::removeEmoji($account->getFullName());
        $user->user_avatar = $account->getProfilePicUrlHd();
        $user->user_profile_link = 'https://www.instagram.com/'.$user->userName;
        return $user;
    }


    protected function getMediaUrl (Media $media) {
        $media_type = $media->getType();
        switch ($media_type){
            case Media::TYPE_IMAGE:
                if(!empty($media->getImageThumbnailUrl()))
                    return $media->getImageThumbnailUrl();
                return'';
                break;
            case Media::TYPE_VIDEO:
                if(!empty($media->getVideoStandardResolutionUrl()))
                    return $media->getVideoStandardResolutionUrl();
                return '';
                break;
            case Media::TYPE_CAROUSEL:
                if(!empty($media->getCarouselMedia())){
                    $index = max(array_keys($media->getCarouselMedia()));
                    return $media->getCarouselMedia()[$index];
                }

                return '';
                break;
            case Media::TYPE_SIDECAR:
                if(!empty($media->getSidecarMedias())) {
                    $index = max(array_keys($media->getSidecarMedias()));
                    return $media->getSidecarMedias()[$index];
                }
                return '';
                break;
            default:
                return '';
        }
    }


    protected function getAuditionalInfo(Media $media) {
        $likes = $media->getLikesCount();
        $comments = $media->getCommentsCount();
        $auditionalInfo = array(
            'likes'     => $likes,
            'comments'  => $comments,
        );
        return serialize($auditionalInfo);
    }


    public function saveMeta() {
        global $wpdb;
        $feedMetaTable = $wpdb->prefix.'rx_insta_feedmeta';
        $feed_meta = array(
            'feed_id'       => $this->getFeedId(),
            'feed_type'     => 'instagram',
            'feed_target'   => $this->target,
            'target_name'   => $this->targetName,
            'interval'      => $this->interval,
            'noOffeeds'     => $this->noOffeeds,
            'isActive'      => true,
            'last_updated'  => $this->milliseconds()
        );

        $serrialize_array = serialize($feed_meta);
        $wpdb->insert($feedMetaTable, array(
            'feed_id' => $this->getFeedId(),
            'meta_key' => 'feed_settings',
            'meta_value' => $serrialize_array,
        ));

        if($wpdb->last_error) {
            return false;
        }
        return true;
    }

}