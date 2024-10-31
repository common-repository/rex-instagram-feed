import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RexTabs from "./Tabs";
import fetchWP from "../utils/fetchWP";
import RexPreLoader from "./PreLoader";
import action from "../redux/app/action";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.fetchWP = new fetchWP({
      restURL: this.props.rsfObject.api_url,
      restNonce: this.props.rsfObject.api_nonce
    });
    this.plugin_page = this.props.rsfObject.plugin_page;
  }
  componentDidMount() {
    this.props.init(this.fetchWP);
    this.props.getSettingsFromDB(this.fetchWP);
  }

  render() {
    const { isLoading } = this.props;
    return (
      <div className="wrap">
        {isLoading && <RexPreLoader />}
        <RexTabs
          fetchWP={this.fetchWP}
          pluginPage={this.plugin_page}
          requirements={this.props.rsfObject.requirements}
        />
      </div>
    );
  }
}

Admin.propTypes = {
  rsfObject: PropTypes.object
};

const mapStateToProps = state => {
  return {
    ...state.Stream,
    ...state.InstagramFeed,
    ...state.App
  };
};

const mapDispatchToProps = {
  init: action.init,
  getSettingsFromDB: action.getSettingsFromDB
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
