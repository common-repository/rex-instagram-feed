<?php

/**
 * Provide a public-facing view for the plugin
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @link       https://rextheme.com/
 * @since      1.0.0
 *
 * @package    Rx_Insta_Feed
 * @subpackage Rx_Insta_Feed/public/partials
 */

?>
<?php 
    $get_col = $settings->get('noOfColumn');
    $stream_id = "stream-id". $settings->get('stream_id');
    $showStream_name = $settings->get('showStreamName');

    function rex_number_short_format( $n, $precision = 1 ) {
        if ($n < 900) {
            $n_format = number_format($n, $precision);
            $unit = '';
        } else if ($n < 900000) {
            $n_format = number_format($n / 1000, $precision);
            $unit = 'K';
        } else if ($n < 900000000) {
            $n_format = number_format($n / 1000000, $precision);
            $unit = 'M';
        } else if ($n < 900000000000) {
            $n_format = number_format($n / 1000000000, $precision);
            $unit = 'B';
        } else {
            $n_format = number_format($n / 1000000000000, $precision);
            $unit = 'T';
        }
        
        if ( $precision > 0 ) {
            $dotzero = '.' . str_repeat( '0', $precision );
            $n_format = str_replace( $dotzero, '', $n_format );
        }
        return $n_format . $unit;
    }
?>
<style>
    
    .rex-social-media-feed#<?php echo $stream_id; ?>{
        background: rgba(<?php echo implode(",", $settings->get('galleryBg')) ?>);
        max-width: <?php echo $settings->get('galleryWidth'); ?> !important;
        border-radius: <?php echo $settings->get('glryBorderRadius'); ?>px;
        border: none;
        padding:0;
    }

    <?php
        if($settings->get('glryBorderEnable') === 'yes') {?>
            .rex-social-media-feed#<?php echo $stream_id; ?>{
                border: <?php echo $settings->get('glryBorderWidth'); ?>px <?php echo $settings->get('glryBorderStyle'); ?> rgba(<?php echo implode(",", $settings->get('glryBorderColor')) ?>);
            }
        <?php } 
    ?>
    <?php
        if($settings->get('enableGlryPadding') === 'yes') {?>
            .rex-social-media-feed#<?php echo $stream_id; ?>{
                padding:105px 60px 115px;
            }
        <?php } 
    ?>
    
    .rex-social-media-feed#<?php echo $stream_id; ?> .feed-header h3 {
        text-align: <?php echo $settings->get('streamNameAllignment'); ?>; 
        font-size: <?php echo $settings->get('streamNameFntSize'); ?>px; 
        line-height: <?php echo $settings->get('streamNameFntSize')*1.3 ?>px;
        color: rgba(<?php echo implode(",", $settings->get('streamNameColor')) ?>);
    }
    
    /*-----body section----*/
    .rex-social-media-feed#<?php echo $stream_id; ?> .feed-body {
        margin-left: -<?php echo $settings->get('columnGap'); ?>px;
    }
    .rex-social-media-feed#<?php echo $stream_id; ?> .feed-body .single-image {
      margin-left: <?php echo $settings->get('columnGap'); ?>px;
      margin-bottom: <?php echo $settings->get('columnGap'); ?>px;
      width: calc(100% / <?php echo $get_col; ?> - <?php echo $settings->get('columnGap').'px'; ?>);
      border-radius: <?php echo $settings->get('glryImgRadius'); ?>px;
    }
    .rex-social-media-feed#<?php echo $stream_id; ?> .feed-body .single-image .feed-img {
      border-radius: <?php echo $settings->get('glryImgRadius'); ?>px;
    }
    @media (max-width: 1199px) {
        .rex-social-media-feed#<?php echo $stream_id; ?> .feed-body {
            margin-left: -10px;
        }
        .rex-social-media-feed#<?php echo $stream_id; ?> .feed-body .single-image {
            margin-left: 10px;
            margin-bottom: 10px;
            width: calc(100% / <?php echo $get_col < 4 ? $get_col : 4 ?> - 10px);
        }
    }
    @media (max-width: 991px) {
      .rex-social-media-feed#<?php echo $stream_id; ?> .feed-body .single-image {
        width: calc(100% / 3 - 10px);
      }
    }
    @media (max-width: 767px) {
      .rex-social-media-feed#<?php echo $stream_id; ?> .feed-body .single-image {
        width: calc(100% / 2 - 10px);
      }
    }
    @media (max-width: 575px) {
      .rex-social-media-feed#<?php echo $stream_id; ?> .feed-body .single-image {
        width: calc(100% / 1 - 10px);
      }
    }
    
    
    
</style>

<?php if($showStream_name === "yes"){ ?>
<div class="feed-header">
    <div class="name">
        <h3><?php echo esc_html( __( $settings->get('name'), 'rx-insta-feed' ) ); ?></h3>
    </div>
</div>
<?php } ?>

<div class="feed-body">
    <?php if($feeds) {
        foreach($feeds as $feed) {
            $auditional_info =  unserialize($feed->auditional_info);
            ?>
            <div class="single-image">
                <div class="feed-img">
                    <div class="bg-img" style="background-image: url(<?php echo $feed->image_url ?>);"></div>
                    <span class="provider-name">
                            <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram" class="fa-instagram" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                            </svg>
                            <?php echo esc_html( __( 'instagram', 'rx-insta-feed' ) ); ?>
                        </span>

                    <img src="<?php echo esc_url( __( $feed->image_url) ); ?>" alt="feed image">

                    <div class="img-overlay">
                        <?php if($new_tab) {
                            $tab = '_blank';
                        }else {
                            $tab = '_self';
                        } ?>
                        <a href="<?php echo esc_url( __( $feed->post_permalink) ); ?>" target="<?php echo $tab ?>">
                            <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram" class="fa-instagram" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
                <ul class="like-comment">
                    <li class="like">
                        <a href="<?php echo esc_url( __( $feed->post_permalink) ); ?>" target="<?php echo $tab ?>">
                            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" class="fa-heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path>
                            </svg>
                            <span><?php echo rex_number_short_format($auditional_info['likes']); ?></span>
                        </a>
                        <a href="<?php echo esc_url( __( $feed->post_permalink) ); ?>" target="<?php echo $tab ?>">
                            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="comment" class="fa-comment" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor" d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z"></path>
                            </svg>
                            <span><?php echo rex_number_short_format($auditional_info['comments']); ?></span>
                        </a>
                    </li>
                </ul>
            </div>
        <?php }
    } ?>

</div>
<!--/feed body-->
