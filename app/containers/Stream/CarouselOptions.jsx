import React, { Component } from 'react';
import {Button, FormControl, InputGroup, Tabs, Tab } from "react-bootstrap";
import ReactResponsiveSelect from 'react-responsive-select';


class RexCarouselOptions extends Component {

    constructor(props) {
        super(props);
    };
    render() {
        const {fetchWP} = this.props;
        return (
            <div className="carousel-option-wrapper">
                <h6 className="carousel-option-title">Carousel Options</h6>
                <div className="rex-form-group">
                    <span className="input-title">Auto Play:</span>
                    <ul className="radio-common">
                      <li>
                        <input type="radio" name="feed-order" id="autoPlayYes" defaultChecked />
                        <label htmlFor="autoPlayYes"><span />Yes</label>
                      </li>
                      <li>
                        <input type="radio" name="feed-order" id="autoPlayNo" />
                        <label htmlFor="autoPlayNo"><span />No</label>
                      </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default RexCarouselOptions;