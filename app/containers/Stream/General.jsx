import React, { Component } from "react";

import clone from "clone";
import _ from "lodash";
import { _remove, _add } from "lodash/fp";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas, faEdit } from "@fortawesome/free-solid-svg-icons";
library.add(fab, far, fas, faEdit);

import RexStreamConnect from "./StreamConnect";
import RexShortcode from "./Shortcode";

class RexGeneral extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      idx,
      thisFeedList,
      onRecordChange,
      onRadioChange,
      onSelectChangeFeed,
      connectFeed,
      detachFeed,
      streamToDB,
      currentFeedKey,
      streamNameError
    } = this.props;
    const { stream } = clone(this.props);

    const feedDataSource = [];

    Object.keys(thisFeedList).map((feed, index) => {
      if (feed && Object.keys(thisFeedList).length) {
        if ("feed_name" in thisFeedList[feed]) {
          return feedDataSource.push({
            value: feed,
            text: thisFeedList[feed].feed_name,
            markup: (
              <span>
                {thisFeedList[feed].feed_name}
                <FontAwesomeIcon icon={["fab", "instagram"]} />
              </span>
            )
          });
        }
      }
    });
    return (
      <React.Fragment>
        <div className="content-wrapper">
          <div className="rex-form-group">
            <span className="input-title">Stream Name:</span>
            <input
              type="text"
              name={`stream_name`}
              value={stream.name}
              placeholder="Stream Name"
              onChange={onRecordChange.bind(this, "name")}
            />
            {streamNameError && (
              <span className="hints stream-name-error">
                Stream name required.
              </span>
            )}
          </div>

          <div className="rex-form-group">
            <span className="input-title">Items Order:</span>
            <ul className="radio-common">
              <li>
                <input
                  type="radio"
                  name={`feed-order${idx}`}
                  id={`newToOld${idx}`}
                  value="n2o"
                  checked={stream.itemOrder === "n2o" ? "checked" : ""}
                  onChange={onRadioChange.bind(this, "itemOrder")}
                />
                <label htmlFor={`newToOld${idx}`}>
                  <span />
                  New to Old
                </label>
              </li>

              <li>
                <input
                  type="radio"
                  name={`feed-order${idx}`}
                  id={`oldToNew${idx}`}
                  value="o2n"
                  checked={stream.itemOrder === "o2n" ? "checked" : ""}
                  onChange={onRadioChange.bind(this, "itemOrder")}
                />
                <label htmlFor={`oldToNew${idx}`}>
                  <span />
                  Old to New
                </label>
              </li>

              <li>
                <input
                  type="radio"
                  name={`feed-order${idx}`}
                  id={`random${idx}`}
                  value="rnd"
                  checked={stream.itemOrder === "rnd" ? "checked" : ""}
                  onChange={onRadioChange.bind(this, "itemOrder")}
                />
                <label htmlFor={`random${idx}`}>
                  <span />
                  Random
                </label>
              </li>
            </ul>
          </div>

          <div className="rex-form-group">
            <RexStreamConnect
              selectedValue={currentFeedKey}
              feeds={feedDataSource}
              onSelectChangeFeed={onSelectChangeFeed}
              connectFeed={connectFeed}
              detachFeed={detachFeed}
            />
          </div>
          {stream.connectedFeedList.length > 0 && (
            <div className="rex-form-group connectedFeed">
              <span className="input-title">Connected Feeds:</span>
              <span className="feeds">
                {stream.connectedFeedList.map(feed => (
                  <button type="button" key={feed.key}>
                    <FontAwesomeIcon icon={["fab", "instagram"]} /> {feed.name}
                    <a href="#" onClick={detachFeed.bind(this, feed.key)}>
                      <FontAwesomeIcon icon={["far", "times-circle"]} />
                    </a>
                  </button>
                ))}
              </span>
            </div>
          )}

          {stream.key && <RexShortcode idx={idx} />}
        </div>

        <div className="rex-form-group save-button">
          <button onClick={streamToDB.bind(this, "insert")}>
            {stream.key ? "Update stream" : "Create stream"}
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default RexGeneral;
