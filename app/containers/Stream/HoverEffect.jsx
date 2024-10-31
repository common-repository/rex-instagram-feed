import React, { Component } from 'react';
import {Button, FormControl, InputGroup, Form } from "react-bootstrap";
import { ChromePicker } from 'react-color';
import RexColorPicker from "./ColorPicker";


class RexHoverEffect extends Component {
    render() {
        return (
            <form>
                <div className="content-wrapper">
                    <div className="rex-form-group">
                        <span className="input-title">Hover Overlay Background:</span>
                        <RexColorPicker/>
                    </div>
                    <div className="rex-form-group">
                        <span className="input-title">Instagram Icon:</span>
                        <RexColorPicker/>
                    </div>
                    <div className="rex-form-group">
                        <span className="input-title">Like Comment Share Text:</span>
                        <RexColorPicker/>
                    </div>
                    <div className="rex-form-group">
                        <span className="input-title">Divider Color:</span>
                        <RexColorPicker/>
                    </div>
                </div>
                
                <div className="rex-form-group save-button">
                    <button type="submit">Save settings</button>
                </div>
            </form>
            
        )
    }
}

export default RexHoverEffect;