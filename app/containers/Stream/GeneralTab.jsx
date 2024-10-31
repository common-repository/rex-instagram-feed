import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { connect } from "react-redux";
import action from "../../redux/stream/action";
import feedAction from "../../redux/feed/action";
import appAction from "../../redux/app/action";
import clone from "clone";
import RexGeneral from "./General";
import RexLayout from "./Layout";
import RexHoverEffect from "./HoverEffect";
import RexButtonStyle from "./ButtonStyle";

class RexGeneralTab extends Component {
  state = {
    streamNameError: false
  };
  constructor(props) {
    super(props);
  }

  objIsEmpty = obj => {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
  };

  onRecordChange = (key, event) => {
    let { stream, streamList } = this.props;

    if (key === "noOfPhotos") {
      if (event.target.value > 20) {
        if (key) stream[key] = stream[key];
      } else {
        console.log("stream[key]");
        stream[key] = event.target.value;
      }
    } else {
      if (key) stream[key] = event.target.value;
    }
    if (stream.idx in streamList) {
      streamList[stream.idx] = {
        ...streamList[stream.idx],
        [key]: event.target.value
      };
      this.props.updateStream(stream, streamList);
    }
  };

  onSelectChange = (key, value) => {
    let { stream, streamList } = this.props;
    let currentFeedKey = value.value;
    if (currentFeedKey !== "null") {
      if (key) stream[key] = currentFeedKey;
      if (stream.idx in streamList) {
        streamList[stream.idx] = {
          ...streamList[stream.idx],
          [key]: currentFeedKey
        };
        this.props.updateStream(stream, streamList);
      }
    }
  };

  onColorChange = (key, color) => {
    let { stream, streamList } = this.props;
    if (key) stream[key] = color.rgb;
    if (stream.idx in streamList) {
      streamList[stream.idx] = {
        ...streamList[stream.idx],
        [key]: color.rgb
      };
      this.props.updateStream(stream, streamList);
    }
  };

  onRadioChange = (key, event) => {
    let { stream, streamList } = this.props;
    if (key) stream[key] = event.currentTarget.value;
    if (stream.idx in streamList) {
      streamList[stream.idx] = {
        ...streamList[stream.idx],
        [key]: event.currentTarget.value
      };
      this.props.updateStream(stream, streamList);
    }
  };

  onSelectChangeFeed = value => {
    let currentFeedKey = value.value;
    if (currentFeedKey !== "null") {
      this.props.feedChange(currentFeedKey);
    }
  };

  connectFeed = event => {
    event.preventDefault();
    let { currentFeedKey } = clone(this.props);
    let { tempFeeds, stream, streamList } = this.props;
    if (currentFeedKey) {
      stream.connectedFeedList.push({
        key: currentFeedKey,
        name: tempFeeds[currentFeedKey].feed_name
      });
      streamList[stream.idx] = {
        ...streamList[stream.idx],
        connectedFeedList: stream.connectedFeedList
      };
      this.props.updateStream(stream, streamList);
    }
  };

  detachFeed = (key, event) => {
    event.preventDefault();
    const { stream, streamList } = this.props;
    stream.connectedFeedList = stream.connectedFeedList.filter(function(
      returnableObjects
    ) {
      return returnableObjects.key !== key;
    });
    streamList[stream.idx] = {
      ...streamList[stream.idx],
      connectedFeedList: stream.connectedFeedList
    };
    this.props.updateStream(stream, streamList);
  };

  streamToDB = (actionName, event) => {
    let { stream } = clone(this.props);
    if (stream.name === "") {
      this.setState({
        streamNameError: true
      });
      return;
    } else {
      this.props.isLoading(true);
      const { fetchWP } = this.props;
      if (stream.key && actionName !== "delete") actionName = "update";
      this.props.streamToDB(stream, fetchWP, actionName);
    }
  };

  render() {
    const { idx, fetchWP, currentFeedKey, feeds } = this.props;
    const { stream } = clone(this.props);
    let thisFeedList = feeds;

    if (!this.objIsEmpty(feeds)) {
      stream.connectedFeedList.map(feed => {
        if (feed.key in feeds) {
          if (!(feed.key in thisFeedList)) {
            thisFeedList = {
              ...thisFeedList,
              [feed.key]: feeds[feed.key]
            };
          } else {
            const prop = feed.key;
            const newFeedList = Object.keys(thisFeedList).reduce(
              (object, key) => {
                if (key !== prop) {
                  object[key] = thisFeedList[key];
                }
                return object;
              },
              {}
            );
            thisFeedList = newFeedList;
          }
        }
      });
    }

    return (
      <div className="content-warapper">
        <Tabs defaultActiveKey="general" transition={false} id="rex-feed">
          <Tab eventKey="general" title="General">
            <RexGeneral
              idx={idx}
              fetchWP={fetchWP}
              thisFeedList={thisFeedList}
              feeds={feeds}
              stream={stream}
              currentFeedKey={currentFeedKey}
              onRecordChange={this.onRecordChange}
              onRadioChange={this.onRadioChange}
              onSelectChangeFeed={this.onSelectChangeFeed}
              connectFeed={this.connectFeed}
              detachFeed={this.detachFeed}
              streamToDB={this.streamToDB}
              streamNameError={this.state.streamNameError}
            />
          </Tab>
          <Tab
            eventKey="layout"
            title="layout"
            disabled={stream.key ? false : true}
          >
            <RexLayout
              idx={idx}
              stream={stream}
              fetchWP={fetchWP}
              onRadioChange={this.onRadioChange}
              onRecordChange={this.onRecordChange}
              onSelectChange={this.onSelectChange}
              onColorChange={this.onColorChange}
              streamToDB={this.streamToDB}
            />
          </Tab>
          <Tab eventKey="hover-effect" title="hover effect" disabled>
            <RexHoverEffect idx={idx} />
          </Tab>
          <Tab eventKey="button-style" title="button style" disabled>
            <RexButtonStyle idx={idx} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.Stream,
    ...state.Feed
  };
};

const mapDispatchToProps = {
  updateTempFeeds: feedAction.updateTempFeeds,
  updateStream: action.updateStream,
  feedChange: action.feedChange,
  connectFeed: action.connectFeed,
  detachFeed: action.detachFeed,
  streamToDB: action.streamToDB,
  isLoading: appAction.isLoading
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RexGeneralTab);
