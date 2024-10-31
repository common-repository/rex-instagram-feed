import React, { Component } from "react";
import { connect } from "react-redux";
import feedAction from "../../redux/feed/action";
import instaFeedAction from "../../redux/instagramFeed/action";
import RexFeedSingleList from "./singleFeed";

class RexFeedList extends Component {
  state = {
    activeFeed: ""
  };
  constructor(props) {
    super(props);
    this.feedListRef = React.createRef();
  }

  feedDelete = (key, event) => {
    event.preventDefault();
    this.props.deleteFeed(key, this.props.fetchWP);
  };

  feedUpdate = (feed, event) => {
    event.preventDefault();
    // this.setState({
    //   activeFeed: feed.key
    // });
    document
      .querySelector("#feed-content")
      .scrollIntoView({ behavior: "smooth" });
    this.props.updateFeedValue(feed.feed_info);
  };

  updateActive = (feedInfo, event) => {
    this.props.changeStatus(
      { feedID: feedInfo.feed_id, isActive: !feedInfo.isActive },
      this.props.fetchWP
    );
  };

  // cancel = event => {
  //   event.preventDefault();
  //   this.props.cancel();
  // };

  render() {
    const { fetchWP, feeds } = this.props;
    const feedDataSource = [];
    Object.keys(feeds).map((feed, index) => {
      return feedDataSource.push({
        ...feeds[feed],
        key: feed
      });
    });
    return (
      <div className="feedListWrapper" id="feedList" ref={this.myRef}>
        {feedDataSource.length ? (
          <div className="stream-list feed-list">
            <h6 className="title">Created Feed</h6>
            <div className="list-wrapper">
              <ul className="list-header">
                <li className="stream-sl">SL</li>
                <li className="stream-name">Feed Name</li>
                <li className="action-btn">Actions</li>
                <li className="stream-type">Feed Type</li>
                <li className="settings">Profile Type</li>
                <li className="last-update">Last Update</li>
                <li className="activeness">Active</li>
              </ul>

              {feedDataSource &&
                feedDataSource.map((feed, index) => (
                  <RexFeedSingleList
                    feed={feed}
                    index={index}
                    feedInfo={feed.feed_info}
                    key={feed.key}
                    feedUpdate={this.feedUpdate}
                    feedDelete={this.feedDelete}
                    updateActive={this.updateActive}
                    activeFeed={this.state.activeFeed}
                  />
                ))}
            </div>
          </div>
        ) : (
          <p>No feed created yet.</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.Feed
  };
};

const mapDispatchToProps = {
  loadFeedsFromDB: feedAction.loadFeedsFromDB,
  deleteFeed: feedAction.deleteFeed,
  updateFeedValue: instaFeedAction.updateFeedValue,
  changeStatus: feedAction.changeStatus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RexFeedList);
