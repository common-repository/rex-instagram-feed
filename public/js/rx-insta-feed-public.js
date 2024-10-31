(function($) {
    "use strict";

    /**
     * All of the code for your public-facing JavaScript source
     * should reside in this file.
     *
     * Note: It has been assumed you will write jQuery code here, so the
     * $ function reference has been prepared for usage within the scope
     * of this function.
     *
     * This enables you to define handlers, for when the DOM is ready:
     *
     * $(function() {
   *
   * });
     *
     * When the window is loaded:
     *
     * $( window ).load(function() {
   *
   * });
     *
     * ...and/or other possibilities.
     *
     * Ideally, it is not considered best practise to attach more than a
     * single DOM-ready or window-load handler for a particular page.
     * Although scripts in the WordPress core, Plugins and Themes may be
     * practising this, we should strive to set a better example in our own work.
     */

    "use strict";
    var wWidth = $(window).width();

    jQuery(document).ready(function($) {
        var xwidth = 222;
        var xheight = 200;

        var img_width = $(".rex-social-media-feed .feed-img").width();

        var new_height = (xheight / xwidth) * img_width;
        $(".rex-social-media-feed .feed-img").css({
            height: new_height + "px"
        });
    });

    $(window).on("resize", function() {
        var xwidth = 222;
        var xheight = 200;

        var img_width = $(".rex-social-media-feed .feed-img").width();

        var new_height = (xheight / xwidth) * img_width;
        $(".rex-social-media-feed .feed-img").css({
            height: new_height + "px"
        });
    });

    jQuery(document).ready(function($) {
        if ($(".rex-social-media-feed").length) {
            $(".rex-social-media-feed").each(function() {
                var $this = $(this);
                var pageid = 1;
                var streamid = $this.attr("data-stream-id");
                var ajaxurl = rx_insta_feed.ajaxurl;

                jQuery
                    .ajax({
                        type: "POST",
                        url: ajaxurl,
                        data: {
                            action: "rex_shortcode",
                            paged: pageid,
                            stream_id: streamid
                        },
                        success: function(response) {
                            $this.html(response);
                        }
                    })
                    .done(function() {
                        var xwidth = 222;
                        var xheight = 200;

                        var img_width = $(".rex-social-media-feed .feed-img").width();

                        var new_height = (xheight / xwidth) * img_width;
                        $(".rex-social-media-feed .feed-img").css({
                            height: new_height + "px"
                        });
                    });

            });
        }
    });
})(jQuery);
