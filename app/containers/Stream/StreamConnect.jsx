import React, { Component } from "react";
import ReactResponsiveSelect from "react-responsive-select";
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

class RexStreamConnect extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      feeds,
      onSelectChangeFeed,
      selectedValue,
      connectFeed
    } = this.props;
    return (
      <div className="stream-connect">
        <div className="rex-form-group">
          <ReactResponsiveSelect
            name="stream_name"
            selectedValue={selectedValue}
            options={feeds}
            caretIcon={caretIcon}
            noSelectionLabel="Please select"
            onChange={onSelectChangeFeed}
          />
          <button onClick={connectFeed.bind(this)}>connect</button>
        </div>
      </div>
    );
  }
}

export default RexStreamConnect;
