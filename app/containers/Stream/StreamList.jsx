import React, { Component } from 'react';
import {Button, FormControl, InputGroup, Form } from "react-bootstrap";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { faEdit  } from '@fortawesome/free-solid-svg-icons';
library.add(fab, far, faEdit );

class RexStreamList extends Component {
    render() {
        return (
            <div className="stream-list">
                <h6 className="title">Created Stream</h6>
                <div className="list-wrapper">
                    <ul>
                        <li className="stream-sl"><span>1</span></li>
                        <li className="stream-name">Connect Feed To Stream-1</li>
                        <li className="action-btn">
                            <a href="" className="edit"><FontAwesomeIcon icon={['fas', 'edit']} /></a>
                            <a href="" className="edit"><FontAwesomeIcon icon={['far', 'trash-alt']} /></a>
                        </li>
                        <li className="stream-type">
                            <span><FontAwesomeIcon icon={['fab', 'instagram']} /></span>
                            <span><FontAwesomeIcon icon={['fab', 'facebook']} /></span>
                            <span><FontAwesomeIcon icon={['fab', 'twitter-square']} /></span>
                            <span><FontAwesomeIcon icon={['fab', 'linkedin']} /></span>
                            <span><FontAwesomeIcon icon={['fab', 'dribbble-square']} /></span>
                            <span><FontAwesomeIcon icon={['fab', 'youtube-square']} /></span>
                            <span><FontAwesomeIcon icon={['fab', 'google-plus-square']} /></span>
                        </li>
                        <li className="shortcode-txt">
                            <p>Shortcode <span>[SMF - “01”]</span><a href="" className="copyClick"><FontAwesomeIcon icon={['far', 'copy']} /></a></p>
                        </li>
                    </ul>
                    
                    <ul>
                        <li className="stream-sl active"><span>2</span></li>
                        <li className="stream-name">Stream - 02</li>
                        <li className="action-btn">
                            <a href="" className="edit"><FontAwesomeIcon icon={['fas', 'edit']} /></a>
                            <a href="" className="trash"><FontAwesomeIcon icon={['far', 'trash-alt']} /></a>
                        </li>
                        <li className="stream-type">
                            <span><FontAwesomeIcon icon={['fab', 'instagram']} /></span>
                            <span><FontAwesomeIcon icon={['fab', 'facebook']} /></span>
                            <span><FontAwesomeIcon icon={['fab', 'twitter-square']} /></span>
                        </li>
                        <li className="shortcode-txt">
                            <p>Shortcode <span>[SMF - “01”]</span><a href="" className="copyClick"><FontAwesomeIcon icon={['far', 'copy']} /></a></p>
                        </li>
                    </ul>
                </div>
            </div>
            
        )
    }
}

export default RexStreamList;