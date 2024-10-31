import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab, faFacebook } from "@fortawesome/free-brands-svg-icons";
library.add(fab, faFacebook);

class RexStatus extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { requirements } = this.props;
        const {
            php_version,
            php_version_status,
            wp_version,
            wp_version_status,
            memory,
            memory_status,
            upload_limit,
            upload_limit_status,
            wp_cron,
            curl
        } = requirements;
        return (
            <div className="status-tab-content">
              <div className="tab-content-header">
          <span className="icon">
            <FontAwesomeIcon icon={["fas", "cogs"]} />
          </span>
                <h6>System Status</h6>
              </div>

              <div className="content-wrapper">
                <ul>
                  <li>
                    <span className="title">PHP version:</span>
                    <span className="value">{php_version}
                        {php_version_status ? <FontAwesomeIcon icon={["fas", "check-circle"]} /> : <FontAwesomeIcon icon={["fas", "times-circle"]} />}
                        {php_version_status ? '': <small>PHP version at least 5.6</small>}
                  </span>
                  </li>
                  <li>
                    <span className="title">WP version:</span>
                    <span className="value">{wp_version}
                        {wp_version_status ? <FontAwesomeIcon icon={["fas", "check-circle"]} /> : <FontAwesomeIcon icon={["fas", "times-circle"]} />}
                        {wp_version_status ? '': <small>WP version at least 4</small>}
                  </span>
                  </li>
                  <li>
                    <span className="title">Memory:</span>
                    <span className="value">{memory}
                        {memory_status ? <FontAwesomeIcon icon={["fas", "check-circle"]} /> : <FontAwesomeIcon icon={["fas", "times-circle"]} />}
                        {memory_status ? '': <small>Memory at least 32MB</small>}
                  </span>
                  </li>
                  <li>
                    <span className="title">Upload Limit:</span>
                    <span className="value">{upload_limit}
                        {upload_limit_status ? <FontAwesomeIcon icon={["fas", "check-circle"]} /> : <FontAwesomeIcon icon={["fas", "times-circle"]} />}
                        {upload_limit_status ? '': <small>Upload limit at least 64MB</small>}
                  </span>
                  </li>
                  <li>
                    <span className="title">WP Cron:</span>
                    <span className="value">{wp_cron ? "Enable" : "Disable"}
                        {wp_cron ? <FontAwesomeIcon icon={["fas", "check-circle"]} /> : <FontAwesomeIcon icon={["fas", "times-circle"]} />}
                        {wp_cron ? '': <small>WP Corn should be enable</small>}
                  </span>
                  </li>
                  <li>
                    <span className="title">CURL:</span>
                    <span className="value">{curl}
                        {curl ? <FontAwesomeIcon icon={["fas", "check-circle"]} /> : <FontAwesomeIcon icon={["fas", "times-circle"]} />}
                        {wp_cron ? '': <small>CURL should be enable</small>}
                  </span>
                  </li>
                </ul>
              </div>
            </div>
        );
    }
}

export default RexStatus;
