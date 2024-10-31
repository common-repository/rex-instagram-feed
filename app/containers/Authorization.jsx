import React, { Component } from "react";
import { Button, FormControl, InputGroup, Tabs, Tab } from "react-bootstrap";
import { connect } from "react-redux";
import authAction from "../redux/auth/action";
import PropTypes from "prop-types";
import clone from "clone";
import queryString from "query-string";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faIgloo } from "@fortawesome/free-solid-svg-icons";
library.add(fab, faFacebook);

class RexAuthorization extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const params = queryString.parse(window.location.href);
    if (params.insta_access_token) {
      this.props.tokenUpdate(params.insta_access_token);
    } else {
      this.props.loadInstaAccessTokenFromDB("instagram", this.props.fetchWP);
    }
  }
  tokenFieldOnChange = (provider, event) => {
    switch (provider) {
      case "instagram":
        let { instaAccessToken } = clone(this.props);
        instaAccessToken = event.target.value;
        this.props.tokenUpdate(instaAccessToken);
        return;
      default:
        return;
    }
  };
  saveToken = (provider, event) => {
    event.preventDefault();
    switch (provider) {
      case "instagram":
        let { instaAccessToken } = clone(this.props);
        this.props.saveInstaAccessToken(
          "instagram",
          instaAccessToken,
          this.props.fetchWP
        );
        return;
      default:
        return;
    }
  };
  deleteToken = (provider, event) => {
    event.preventDefault();
    switch (provider) {
      case "instagram":
        this.props.deleteToken("instagram", this.props.fetchWP);
        return;
      default:
        return;
    }
  };

  handleAuthorization = (provider, event) => {
    switch (provider) {
      case "instagram":
        const client_id = "a8409a4d601d4bb89e43938e970c6c5f";
        const scope = "basic+public_content";
        const response_type = "code";
        const pluginPage = this.props.pluginPage;
        const redirect_uri = `http://phpstack-140306-780547.cloudwaysapps.com/instagram/auth.php/authorize?backurl=${pluginPage}/`;
        const url =
          "https://api.instagram.com/oauth/authorize?client_id=" +
          client_id +
          "&redirect_uri=" +
          redirect_uri +
          "&scope=" +
          scope +
          "&response_type=" +
          response_type;
        document.location.href = url;
      default:
        return;
    }
  };

  render() {
    const { instaAccessToken } = this.props;
    return (
      <div className="authorize-tab-content">
        <div className="tab-content-header">
          <span className="icon">
            <FontAwesomeIcon icon={["fab", "instagram"]} />
          </span>
          <h6>Instagram Authorization</h6>
        </div>
        <form>
          <div className="tab-content-body">
            <div className="rex-form-group">
              <span className="input-title">Access Token:</span>
              <input
                type="text"
                name="insta_access_token"
                placeholder="Copy from instagram"
                value={instaAccessToken}
                onChange={this.tokenFieldOnChange.bind(this, "instagram")}
              />
            </div>

            <div className="logout-btn">
              <a
                href="https://rextheme.com/"
                className="manually_connect"
                target="_blanc"
              >
                Manually Connect an Account
              </a>
              <button
                type="button"
                onClick={
                  instaAccessToken
                    ? this.deleteToken.bind(this, "instagram")
                    : this.handleAuthorization.bind(this, "instagram")
                }
              >
                {instaAccessToken ? "Log Out" : "Authorize"}
              </button>
            </div>

            <div className="rex-form-group save-button">
              <button
                type="submit"
                onClick={this.saveToken.bind(this, "instagram")}
              >
                Save settings
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

RexAuthorization.propTypes = {
  rsfObject: PropTypes.object
};

const mapStateToProps = state => {
  return {
    ...state.Auth
  };
};

const mapDispatchToProps = {
  loadInstaAccessTokenFromDB: authAction.loadAccessTokenFromDB,
  saveInstaAccessToken: authAction.saveAccessToken,
  deleteToken: authAction.deleteToken,
  tokenUpdate: authAction.tokenUpdate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RexAuthorization);
