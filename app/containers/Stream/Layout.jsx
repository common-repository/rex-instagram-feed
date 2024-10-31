import React, { Component } from "react";
import { connect } from "react-redux";
import clone from "clone";
import ReactResponsiveSelect from "react-responsive-select";
import RexColorPicker from "./ColorPicker";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faIgloo } from "@fortawesome/free-solid-svg-icons";
library.add(fab, faFacebook);

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

class RexLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      fetchWP,
      idx,
      onRadioChange,
      onColorChange,
      onRecordChange,
      onSelectChange,
      streamToDB
    } = this.props;
    const { stream } = clone(this.props);
    return (
      <React.Fragment>
        <div className="content-wrapper">
          <div className="rex-form-group">
            <span className="input-title">Layout Type:</span>
            <ul className="radio-common">
              <li>
                <input
                  type="radio"
                  name={`layout-type${idx}`}
                  id={`grid${idx}`}
                  value="grid"
                  checked={true}
                  onChange={onRadioChange.bind(this, "layout")}
                />
                <label htmlFor={`grid${idx}`}>
                  <span />
                  Grid
                </label>
              </li>
              <li className="pro">
                <input
                  type="radio"
                  name={`layout-type${idx}`}
                  id={`carousel${idx}`}
                  disabled
                />
                <label htmlFor={`carousel${idx}`}>
                  <span />
                  Carousel
                </label>
              </li>
              <li className="pro">
                <input
                  type="radio"
                  name={`layout-type${idx}`}
                  id={`masonry${idx}`}
                  disabled
                />
                <label htmlFor={`masonry${idx}`}>
                  <span />
                  Masonry
                </label>
              </li>
            </ul>
          </div>
          
          <div className="rex-form-group">
            <span className="input-title">Show Stream name:</span>
            <ul className="radio-common">
              <li>
                <input
                  type="radio"
                  name={`showStreamName${idx}`}
                  id={`streamNameYes${idx}`}
                  value="yes"
                  checked={stream.showStreamName === "yes"}
                  onChange={onRadioChange.bind(this, "showStreamName")}
                />
                <label htmlFor={`streamNameYes${idx}`}>
                  <span />
                  Yes
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  name={`showStreamName${idx}`}
                  id={`streamNameNo${idx}`}
                  value="no"
                  checked={stream.showStreamName === "no"}
                  onChange={onRadioChange.bind(this, "showStreamName")}
                />
                <label htmlFor={`streamNameNo${idx}`}>
                  <span />
                  No
                </label>
              </li>
            </ul>
          </div>
          
          {stream.showStreamName === "yes" && (
            <div className="rex-form-group streamNameOption">
                <div className="rex-form-group stream-name-typo">
                <span className="input-title">Stream Name Font Size & color:</span>
                <input
                  type="number"
                  name="streamNameFntSize"
                  min="12"
                  placeholder="14"
                  value={stream.streamNameFntSize}
                  onChange={onRecordChange.bind(this, "streamNameFntSize")}
                />
                <RexColorPicker
                  color={stream.streamNameColor}
                  onColorChange={onColorChange}
                  itemKey="streamNameColor"
                />
                <span className="hints">Font Size in px</span>
              </div>

              <div className="rex-form-group">
                <span className="input-title">Stream name Alignment:</span>
                <ReactResponsiveSelect
                  name="headding_alignment"
                  options={[
                    { value: "left", text: "Left" },
                    { value: "center", text: "Center" },
                    { value: "right", text: "Right" }
                  ]}
                  caretIcon={caretIcon}
                  selectedValue={stream.streamNameAllignment}
                  noSelectionLabel="Please select"
                  onChange={onSelectChange.bind(this, "streamNameAllignment")}
                />
              </div>
            </div>
          )}

          <div className="rex-form-group galleryBg">
            <span className="input-title">Gallery Background:</span>
            <RexColorPicker
              color={stream.galleryBg}
              onColorChange={onColorChange}
              itemKey="galleryBg"
            />
          </div>
          <div className="rex-form-group">
            <span className="input-title">Gallery Width:</span>
            <input
              type="text"
              name="gallery_width"
              placeholder="e.g. 50% or 200px"
              value={stream.galleryWidth}
              onChange={onRecordChange.bind(this, "galleryWidth")}
            />
          </div>

          <div className="rex-form-group">
            <span className="input-title">Enable Gallery Padding:</span>
            <ul className="radio-common">
              <li>
                <input
                  type="radio"
                  name={`enableGlryPadding${idx}`}
                  id={`glryPaddingYes${idx}`}
                  value="yes"
                  checked={stream.enableGlryPadding === "yes"}
                  onChange={onRadioChange.bind(this, "enableGlryPadding")}
                />
                <label htmlFor={`glryPaddingYes${idx}`}>
                  <span />
                  Yes
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  name={`enableGlryPadding${idx}`}
                  id={`glryPaddingNo${idx}`}
                  value="no"
                  checked={stream.enableGlryPadding === "no"}
                  onChange={onRadioChange.bind(this, "enableGlryPadding")}
                />
                <label htmlFor={`glryPaddingNo${idx}`}>
                  <span />
                  No
                </label>
              </li>
            </ul>
          </div>

          <div className="rex-form-group">
            <span className="input-title">Enable Gallery Border:</span>
            <ul className="radio-common">
              <li>
                <input
                  type="radio"
                  name={`enableGlryBorder${idx}`}
                  id={`borderYes${idx}`}
                  value="yes"
                  checked={stream.glryBorderEnable === "yes"}
                  onChange={onRadioChange.bind(this, "glryBorderEnable")}
                />
                <label htmlFor={`borderYes${idx}`}>
                  <span />
                  Yes
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  name={`enableGlryBorder${idx}`}
                  id={`borderNo${idx}`}
                  value="no"
                  checked={stream.glryBorderEnable === "no"}
                  onChange={onRadioChange.bind(this, "glryBorderEnable")}
                />
                <label htmlFor={`borderNo${idx}`}>
                  <span />
                  No
                </label>
              </li>
            </ul>
          </div>

          {stream.glryBorderEnable === "yes" && (
            <div className="rex-form-group glryBorderOption">
              <span className="input-title">Border:</span>
              <input
                type="number"
                name="glry_border_width"
                min="1"
                placeholder="1px"
                value={stream.glryBorderWidth}
                onChange={onRecordChange.bind(this, "glryBorderWidth")}
              />
              <ReactResponsiveSelect
                name="glry_border_style"
                options={[
                  { value: "solid", text: "Solid" },
                  { value: "dashed", text: "Dashed" },
                  { value: "dotted", text: "Dotted" },
                  { value: "double", text: "Double" },
                  { value: "groove", text: "Groove" },
                  { value: "inset", text: "Inset" },
                  { value: "outset", text: "Outset" },
                  { value: "ridge", text: "Ridge" },
                  { value: "none", text: "None" }
                ]}
                selectedValue={stream.glryBorderStyle}
                caretIcon={caretIcon}
                onChange={onSelectChange.bind(this, "glryBorderStyle")}
              />
              <RexColorPicker
                color={stream.glryBorderColor}
                onColorChange={onColorChange}
                itemKey="glryBorderColor"
              />
            </div>
          )}

          <div className="rex-form-group">
            <span className="input-title">Gallery Border Radius:</span>
            <input
              type="number"
              name="glry_border_radius"
              min="0"
              placeholder="5px"
              value={stream.glryBorderRadius}
              onChange={onRecordChange.bind(this, "glryBorderRadius")}
            />
            <span className="hints">Border Radius in px</span>
          </div>

          <div className="rex-form-group">
            <span className="input-title">Gallery image Radius:</span>
            <input
              type="number"
              name="glry_img_radius"
              min="0"
              placeholder="5px"
              value={stream.glryImgRadius}
              onChange={onRecordChange.bind(this, "glryImgRadius")}
            />
            <span className="hints">Border Radius in px</span>
          </div>

          <div className="rex-form-group">
            <span className="input-title">Number of Photo:</span>
            <input
              type="number"
              name="num_photo"
              min="1"
              max="20"
              placeholder="20"
              value={stream.noOfPhotos}
              onChange={onRecordChange.bind(this, "noOfPhotos")}
            />
            <span className="hints">Maximum of 20</span>
          </div>

          <div className="rex-form-group">
            <span className="input-title">Number of Column:</span>
            <ReactResponsiveSelect
              name="photo_column"
              options={[
                { value: "1", text: "01" },
                { value: "2", text: "02" },
                { value: "3", text: "03" },
                { value: "4", text: "04" },
                { value: "5", text: "05" },
                { value: "6", text: "06" },
                { value: "7", text: "07" },
                { value: "8", text: "08" },
                { value: "9", text: "09" },
                { value: "10", text: "10" }
              ]}
              selectedValue={stream.noOfColumn}
              caretIcon={caretIcon}
              onChange={onSelectChange.bind(this, "noOfColumn")}
            />
            <span className="hints">Maximum of 10</span>
          </div>

          <div className="rex-form-group">
            <span className="input-title">Column Gap:</span>
            <input
              type="number"
              name="photo_padding"
              min="0"
              placeholder="10"
              value={stream.columnGap}
              onChange={onRecordChange.bind(this, "columnGap")}
            />
            <span className="hints">Space Between Photos in Px</span>
          </div>
        </div>

        <div className="rex-form-group save-button">
          <button onClick={streamToDB.bind(this, "insert")}>
            {stream.key ? "Save settings" : "Create stream"}
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default RexLayout;
