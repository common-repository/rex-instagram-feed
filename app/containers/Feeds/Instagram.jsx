import React, { Component } from "react";
import { connect } from "react-redux";
import ReactResponsiveSelect from "react-responsive-select";
import instaFeedAction from "../../redux/instagramFeed/action";
import appAction from "../../redux/app/action";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab, faFacebook } from "@fortawesome/free-brands-svg-icons";
library.add(fab, faFacebook);
import clone from "clone";

const caretIcon = (
  <svg
    className="caret-icon"
    x="0px"
    y="0px"
    width="11.848px"
    height="6.338px"
    viewBox="351.584 2118.292 11.848 6.338"
  >
    <g>
      <path d="M363.311,2118.414c-0.164-0.163-0.429-0.163-0.592,0l-5.205,5.216l-5.215-5.216c-0.163-0.163-0.429-0.163-0.592,0s-0.163,0.429,0,0.592l5.501,5.501c0.082,0.082,0.184,0.123,0.296,0.123c0.103,0,0.215-0.041,0.296-0.123l5.501-5.501C363.474,2118.843,363.474,2118.577,363.311,2118.414L363.311,2118.414z" />
    </g>
  </svg>
);

class RexFeedInstagram extends Component {
  constructor(props) {
    super(props);
  }

  changeType = (key, event) => {
    this.props.changeType(key);
  };

  onRecordChange = event => {
    const re = /^[0-9\b]+$/;
    if (event.target.value == "" || re.test(event.target.value)) {
      let { noOffeeds } = clone(this.props);
      noOffeeds = event.target.value;
      this.props.changeRecord(noOffeeds);
    }
  };

  changeInterval = select => {
    this.props.changeInterval(select.value);
  };

  changeValue = event => {
    const re = /^[^#&].*/;
    if (event.target.value == "" || re.test(event.target.value)) {
      let { value } = clone(this.props);
      value = event.target.value;
      this.props.changeValue(value);
    }
  };

  createFeed = event => {
    event.preventDefault();
    this.props.isLoading(true);
    let { type, interval, value, noOffeeds } = clone(this.props);
    let feedId = "rex_" + this.generateFeedId();
    let data = {
      feedId: feedId,
      type: type,
      value: value,
      interval: interval,
      noOffeeds: noOffeeds
    };
    this.props.createFeed(data, this.props.fetchWP);
  };

  updateFeed = event => {
    event.preventDefault();
    let { type, interval, value, editKey, noOffeeds } = clone(this.props);
    let data = {
      feedId: editKey,
      type: type,
      value: value,
      interval: interval,
      noOffeeds: noOffeeds
    };
    this.props.updateFeed(data, this.props.fetchWP);
  };

  cancel = event => {
    event.preventDefault();
    this.props.cancel();
  };

  generateFeedId = () => {
    return Math.random()
      .toString(36)
      .substr(-7);
  };

  render() {
    const { type, interval, value, edit, editKey, noOffeeds } = this.props;
    let placeholder = "User Name";
    let label = "Instagram Id";
    if (type === "hashtag") {
      placeholder = "Enter hashtag value";
      label = "Hashtag";
    } else if (type === "location") {
      placeholder = "Enter location value";
      label = "Location";
    }

    return (
      <div className="content-wrapper">
        <div className="rex-form-group">
          <span className="input-title">Timeline Type:</span>
          <ul className="radio-common">
            <li>
              <input
                type="radio"
                name="timelineType"
                id="timelineUser"
                checked={type === "user"}
                onChange={this.changeType.bind(this, "user")}
              />
              <label htmlFor="timelineUser">
                <span />
                User
              </label>
            </li>
            <li>
              <input
                type="radio"
                name="timelineType"
                id="timelineHashtag"
                checked={type === "hashtag"}
                onChange={this.changeType.bind(this, "hashtag")}
              />
              <label htmlFor="timelineHashtag">
                <span />
                Hashtag
              </label>
            </li>
            <li>
              <input
                type="radio"
                name="timelineType"
                id="timelineLocation"
                checked={type === "location"}
                onChange={this.changeType.bind(this, "location")}
              />
              <label htmlFor="timelineLocation">
                <span />
                Location
              </label>
            </li>
          </ul>
        </div>

        <div className="rex-form-group">
          <span className="input-title">{label} :</span>
          <input
            type="text"
            name="insta_id"
            placeholder={placeholder}
            value={value}
            onChange={this.changeValue.bind(this)}
          />
          <div className="rexTooltip">
            <FontAwesomeIcon icon={["fas", "question"]} />
            <span style={{ paddingLeft: "24px", minWidth: "260px" }}>
              <ol>
                <li>For user, use instagram username.</li>
                <li>For tags, enter tag with out '#'.</li>
                <li>For location, enter location id.</li>
              </ol>
            </span>
          </div>
        </div>

        <div className="rex-form-group">
          <span className="input-title">Number of Posts:</span>
          <input
            type="number"
            name="num_posts"
            min="1"
            placeholder="20"
            pattern="[0-9]"
            value={noOffeeds}
            onChange={this.onRecordChange.bind(this)}
          />
          <span className="hints">Recommend Number of Post 20</span>
        </div>

        <div className="rex-form-group">
          <span className="input-title">Check posts every:</span>
          <ReactResponsiveSelect
            name="post_sync_time"
            options={[
              { value: "hourly", text: "Every hour" },
              { value: "daily", text: "Every day" },
              { value: "weekly", text: "Every week" }
            ]}
            selectedValue={interval}
            caretIcon={caretIcon}
            noSelectionLabel="Please select"
            onChange={this.changeInterval.bind(this)}
          />
        </div>

        <div className="rex-form-group save-button">
          {!edit && (
            <button onClick={this.createFeed.bind(this)}>CREATE FEED</button>
          )}
          {edit && (
            <React.Fragment>
              <button onClick={this.updateFeed.bind(this)}>Update Feed</button>
              <button className="cancel" onClick={this.cancel.bind(this)}>
                Cancel
              </button>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.InstaFeed
  };
};

const mapDispatchToProps = {
  changeType: instaFeedAction.changeType,
  changeInterval: instaFeedAction.changeInterval,
  changeValue: instaFeedAction.changeValue,
  changeRecord: instaFeedAction.changeRecord,
  createFeed: instaFeedAction.createFeed,
  updateFeed: instaFeedAction.updateFeed,
  cancel: instaFeedAction.cancel,
  isLoading: appAction.isLoading
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RexFeedInstagram);
