import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import RexFeedInstagram from "./Instagram";
import RexFeedFacebook from "./Facebook";
import RexFeedTwitter from "./Twitter";
import RexFeedList from "./FeedList";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas, faEdit } from "@fortawesome/free-solid-svg-icons";
library.add(fab, far, fas, faEdit);

class RexFeed extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { fetchWP } = this.props;
    return (
      <div>
        <div className="feed-content" id="feed-content">
          <Tabs
            defaultActiveKey="instagram"
            transition={false}
            id="rex-stream-repeat"
          >
            <Tab
              eventKey="createFeedStream"
              title="Create Feed Stream:"
              disabled
            />
            <Tab
              eventKey="instagram"
              title={
                <span>
                  <FontAwesomeIcon icon={["fab", "instagram"]} />
                </span>
              }
            >
              <RexFeedInstagram fetchWP={fetchWP} />
            </Tab>
          </Tabs>
        </div>

        <RexFeedList fetchWP={fetchWP} />
      </div>
    );
  }
}

export default RexFeed;
