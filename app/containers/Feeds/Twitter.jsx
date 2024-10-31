import React, { Component } from 'react';
import { connect } from "react-redux";
import {Button, FormControl, InputGroup, Tabs, Tab } from "react-bootstrap";
import ReactResponsiveSelect from 'react-responsive-select';
import instaFeedAction from "../../redux/instagramFeed/action";
import PropTypes from "prop-types";
import clone from "clone";


const caretIcon = (
  <svg className="caret-icon" x="0px" y="0px" width="11.848px" height="6.338px" viewBox="351.584 2118.292 11.848 6.338">
    <g><path d="M363.311,2118.414c-0.164-0.163-0.429-0.163-0.592,0l-5.205,5.216l-5.215-5.216c-0.163-0.163-0.429-0.163-0.592,0s-0.163,0.429,0,0.592l5.501,5.501c0.082,0.082,0.184,0.123,0.296,0.123c0.103,0,0.215-0.041,0.296-0.123l5.501-5.501C363.474,2118.843,363.474,2118.577,363.311,2118.414L363.311,2118.414z"/></g>
  </svg>
);

class RexFeedTwitter extends Component {
    render() {
        return (
            <form>
                <div className="content-wrapper">
                    <div className="rex-form-group">
                        <span className="input-title">Timeline Type:</span>
                        <ul className="radio-common">
                            <li>
                                <input type="radio" name="twTimelineType" id="twTimelineUser" defaultChecked />
                                <label htmlFor="twTimelineUser"><span></span>User</label>
                            </li>
                            <li>
                                <input type="radio" name="twTimelineType" id="twTimilineHastag" />
                                <label htmlFor="twTimilineHastag"><span></span>Hashtag</label>
                            </li>
                            <li>
                                <input type="radio" name="twTimelineType" id="twTimelineLocation" />
                                <label htmlFor="twTimelineLocation"><span></span>Location</label>
                            </li>
                        </ul>
                    </div>

                    <div className="rex-form-group">
                        <span className="input-title">Twitter Id:</span>
                        <input type="text" name="twitter_id" placeholder="User name" />
                    </div>

                    <div className="rex-form-group">
                        <span className="input-title">Check posts every:</span>
                        <ReactResponsiveSelect
                          name="tw_post_sync_time"
                          options={[
                            { value: '1', text: '1 Hour' },
                            { value: '2', text: '2 Hour' },
                            { value: '3', text: '3 Hour' },
                          ]}
                          onSubmit={() => { console.log("Handle form submit here") }}
                          caretIcon={caretIcon}
                          noSelectionLabel="Please select"
                          onChange={(newValue) => { console.log(newValue) }}
                        />
                    </div>
                    
                    <div className="rex-form-group save-button">
                        <button type="submit">CREATE FEED</button>
                    </div>
                </div>
                
                
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state.instaFeedAction
    };
};

const mapDispatchToProps = {

};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RexFeedTwitter);