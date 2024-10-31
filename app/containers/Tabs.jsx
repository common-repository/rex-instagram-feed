import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import RexStream from "./Stream/Stream";
import RexFeed from "./Feeds/Feed";
import RexSettings from "./Settings";
import RexAuthorization from "./Authorization";
import RexStatus from "./Status";
import queryString from "query-string";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas, faEdit } from "@fortawesome/free-solid-svg-icons";
library.add(fab, far, fas, faEdit);

class RexTabs extends Component {
  state = {
    activeTab: "stream"
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const params = queryString.parse(window.location.href);
    if (params.insta_access_token) {
      this.setState({
        activeTab: "authorize"
      });
    }
  }

  render() {
    const { fetchWP, pluginPage, requirements } = this.props;
    return (
      <div className="mainTab">
        <Tabs
          activeKey={this.state.activeTab}
          transition={false}
          id="rex-feed"
          onSelect={key => this.setState({ activeTab: key })}
        >
          <Tab
            eventKey="stream"
            title={
              <span>
                <FontAwesomeIcon icon={["fas", "stream"]} /> Stream
              </span>
            }
          >
            <RexStream fetchWP={fetchWP} />
          </Tab>
          <Tab
            eventKey="feeds"
            title={
              <span>
                <FontAwesomeIcon icon={["fas", "rss"]} /> feeds
              </span>
            }
          >
            <RexFeed fetchWP={fetchWP} />
          </Tab>
          <Tab
            eventKey="settings"
            title={
              <span>
                <FontAwesomeIcon icon={["fas", "cog"]} /> Settings
              </span>
            }
          >
            <RexSettings fetchWP={fetchWP} />
          </Tab>
          {/* <Tab
            eventKey="authorize"
            title={
              <span>
                <FontAwesomeIcon icon={["fas", "user-shield"]} /> Authorize
              </span>
            }
          >
            <RexAuthorization fetchWP={fetchWP} pluginPage={pluginPage} />
          </Tab> */}
          <Tab
            eventKey="system"
            title={
              <span>
                <FontAwesomeIcon icon={["fas", "cogs"]} /> System Status
              </span>
            }
          >
            <RexStatus requirements={requirements} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default RexTabs;
