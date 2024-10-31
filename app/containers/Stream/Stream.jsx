import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import RexGeneralTab from "./GeneralTab";
import feedAction from "../../redux/feed/action";
import streamAction from "../../redux/stream/action";
import { connect } from "react-redux";
import clone from "clone";
import _ from "lodash";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas, faEdit } from "@fortawesome/free-solid-svg-icons";
library.add(fab, far, fas, faEdit);

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const RexSwal = withReactContent(Swal);

class RexStream extends Component {
  state = {
    activeTab: "stream1"
  };

  constructor(props) {
    super(props);
  }

  selectTab = key => {
    if (key === "add") {
      this.addNewStream();
    } else {
      let streamId = key.replace(/\D/g, "");
      this.props.activateTab(key, parseInt(streamId));
    }
  };

  addNewStream = () => {
    let { streamList, stream } = clone(this.props);
    let streamIdxs = Object.keys(streamList);
    const latestIdx = streamIdxs.length
      ? streamIdxs.sort((a, b) => a - b).reverse()[0]
      : 1;
    this.props.addNewStream(parseInt(latestIdx));
  };

  deleteStream = e => {
    RexSwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete It!"
    }).then(result => {
      if (result.value) {
        let { streamList, stream, activeTab } = clone(this.props);
        if (stream.isNew === false) {
          this.props.streamToDB(stream, this.props.fetchWP, "delete");
        } else {
          let newStreamList = _.omit(streamList, [stream.idx]);
          activeTab = `stream${Object.keys(newStreamList).pop()}`;
          stream = streamList[Object.keys(newStreamList).pop()];
          this.props.deleteStream(newStreamList, stream, activeTab);
        }
      }
    });
  };

  render() {
    const { streamList, fetchWP, activeTab } = this.props;
    const streamDataSource = [];
    Object.keys(streamList).map((stream, idx) => {
      streamDataSource.push({
        ...streamList[stream],
        key: `stream${parseInt(stream)}`
      });
    });
    return (
      <div className="content-warapper stream-parent-tab">
        <Tabs
          activeKey={activeTab}
          transition={false}
          id="rex-stream-repeat"
          onSelect={key => this.selectTab(key)}
        >
          {streamDataSource
            ? streamDataSource.map(stream => (
                <Tab
                  eventKey={stream.key}
                  title={
                    <span className="stream-title">
                      {" "}
                      {stream.name ? stream.name : "New Stream"}{" "}
                    </span>
                  }
                  key={stream.key}
                >
                  {streamDataSource.length > 1 && (
                    <button
                      className="deleteStream"
                      onClick={this.deleteStream.bind(this)}
                    >
                      <FontAwesomeIcon icon={["fas", "trash-alt"]} /> delete
                    </button>
                  )}
                  <RexGeneralTab idx={stream.idx} fetchWP={fetchWP} />
                </Tab>
              ))
            : ""}
          <Tab
            eventKey="add"
            title={
              <span>
                Add New <FontAwesomeIcon icon={["fas", "plus-circle"]} />
              </span>
            }
          />
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.Stream
  };
};

const mapDispatchToProps = {
  loadFeedsFromDB: feedAction.loadFeedsFromDB,
  getAllStreams: streamAction.getAllStreams,
  addNewStream: streamAction.addNewStream,
  activateTab: streamAction.activateTab,
  deleteStream: streamAction.deleteStream,
  streamToDB: streamAction.streamToDB
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RexStream);
