import React, { Component } from "react";
import { Button, FormControl, InputGroup, Form } from "react-bootstrap";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
library.add(fab, far, faEdit);

class RexShortcode extends Component {
  handleClick = (idx, event) => {
    event.preventDefault();
    let shortCodeId = `shortcodeId${idx}`;
    let ConfirmationTxt = `copyedConfirmation${idx}`;

    var shortcodeText = document.getElementById(shortCodeId);
    shortcodeText.select();
    document.execCommand("copy");
    document.getElementById(ConfirmationTxt).innerHTML = "Shortcode Copied";
    setTimeout(() => {
      document.getElementById(ConfirmationTxt).innerHTML = "";
    }, 2000);
  };

  render() {
    const { idx } = this.props;
    return (
      <div className="content-wrapper shortcode-tab">
        <div className="rex-form-group">
          <span className="input-title">Shortcode</span>
          <input
            id={`shortcodeId${idx}`}
            type="text"
            name="shortcode"
            value={`[rx_social_media_stream id='${idx}']`}
            readOnly
          />
          <span
            className="copyClipboard"
            title="Click to Copy Shortcode"
            onClick={this.handleClick.bind(this, idx)}
          >
            <FontAwesomeIcon icon={["far", "copy"]} />
          </span>
          <span
            id={`copyedConfirmation${idx}`}
            className="copyedConfirmation"
          />
        </div>
      </div>
    );
  }
}

export default RexShortcode;
