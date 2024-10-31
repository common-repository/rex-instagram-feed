import React, { Component } from "react";
import { connect } from "react-redux";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab, faFacebook } from "@fortawesome/free-brands-svg-icons";
library.add(fab, faFacebook);
import clone from "clone";
import action from "../redux/app/action";

class RexSettings extends Component {
  constructor(props) {
    super(props);
  }
  onRadioChange = (key, event) => {
    let { settings } = clone(this.props);
    if (key === "deleteData") {
      settings[key] = event.target.checked;
    } else {
      settings[key] = event.target.value;
    }
    this.props.onRadioChange(settings);
  };
  saveToDb = event => {
    event.preventDefault();
    let { settings } = clone(this.props);
    this.props.saveSettingsToDb(settings, this.props.fetchWP);
  };
  render() {
    const { settings } = this.props;
    return (
      <div className="settings-tab-content">
        <div className="settings-tab-header">
          <span className="icon">
            <FontAwesomeIcon icon={["fas", "cog"]} />
          </span>
          <h6>Settings</h6>
        </div>
        <form>
          <div className="content-wrapper">
            <div className="rex-form-group">
              <span className="input-title">Open links in new tab:</span>
              <ul className="radio-common">
                <li>
                  <input
                    type="radio"
                    name="linkNewTab"
                    id="newTabYes"
                    value="yes"
                    checked={settings.newTab === "yes"}
                    onChange={this.onRadioChange.bind(this, "newTab")}
                  />
                  <label htmlFor="newTabYes">
                    <span />
                    Yes
                  </label>
                </li>

                <li>
                  <input
                    type="radio"
                    name="linkNewTab"
                    id="newTabNo"
                    value="no"
                    checked={settings.newTab === "no"}
                    onChange={this.onRadioChange.bind(this, "newTab")}
                  />
                  <label htmlFor="newTabNo">
                    <span />
                    No
                  </label>
                </li>
              </ul>
            </div>

            <div className="rex-form-group db-save">
              <span className="input-title">
                Delete settings when
                <br /> plugin is removed:
              </span>
              <div className="rexSwitcher">
                <input
                  className="switch"
                  id="saveDB"
                  type="checkbox"
                  checked={settings.deleteData === true}
                  onChange={this.onRadioChange.bind(this, "deleteData")}
                />
                <label htmlFor="saveDB">
                  {" "}
                  <span />{" "}
                </label>
              </div>
              <div className="rexTooltip">
                <FontAwesomeIcon icon={["fas", "question"]} />
                <span>
                  When removing the plugin your settings are automatically
                  erased. Checking this box will prevent any settings from being
                  deleted. This means that you can uninstall and reinstall the
                  plugin without losing your settings.
                </span>
              </div>
            </div>

            <div className="rex-form-group save-button">
              <button onClick={this.saveToDb.bind(this)}>Save settings</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.App
  };
};

const mapDispatchToProps = {
  init: action.init,
  getSettings: action.getSettings,
  updateSettings: action.updateSettings,
  onRadioChange: action.onRadioChange,
  saveSettingsToDb: action.saveSettingsToDb
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RexSettings);
