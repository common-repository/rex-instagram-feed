import React, { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
library.add(fab, far, faEdit);
import moment from "moment";

class RexFeedSingleList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      feed,
      index,
      feedInfo,
      feedDelete,
      feedUpdate,
      updateActive
    } = this.props;
    const { post_type } = feed;
    const { isActive } = feedInfo;
    let activeClass = isActive ? "active" : "";
    return (
      <ul key={feed.key} id={feed.key}>
        <li className={`stream-sl ${activeClass}`}>
          <span>{index + 1}</span>
        </li>
        <li className="stream-name">{feed.feed_name}</li>
        <li className="action-btn">
          <a href="#" className="edit" onClick={feedUpdate.bind(this, feed)}>
            <FontAwesomeIcon icon={["fas", "edit"]} />
          </a>
          <a
            href="#"
            className="edit"
            onClick={feedDelete.bind(this, feed.key)}
          >
            <FontAwesomeIcon icon={["far", "trash-alt"]} />
          </a>
        </li>
        <li className="stream-type">
          <span>
            <FontAwesomeIcon icon={["fab", post_type]} />
          </span>
        </li>
        <li className="settings">
          <span>{feedInfo.feed_target}</span>
        </li>
        <li className="last-update">
          {moment.unix(feedInfo.last_updated).format("MMMM Do YYYY, h:mm:ss a")}
        </li>
        <li className="activeness">
          <div className="rexSwitcher">
            <input
              className="switch"
              id={`switch${index + 1}`}
              type="checkbox"
              checked={isActive}
              onChange={updateActive.bind(this, feedInfo)}
            />
            <label htmlFor={`switch${index + 1}`}>
              <span />
            </label>
          </div>
        </li>
      </ul>
    );
  }
}

export default RexFeedSingleList;
