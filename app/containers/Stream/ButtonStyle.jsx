import React, { Component } from 'react';
import {Button, FormControl, InputGroup, Form } from "react-bootstrap";
import { ChromePicker } from 'react-color';
import RexColorPicker from "./ColorPicker";

class RexButtonStyle extends Component {
    render() {
        return (
            <form>
                <div className="content-wrapper btnStyle">
                    <h6 className="load-more-title">'Load More' Button Style</h6>
                    
                    <div className="rex-form-group">
                        <span className="input-title">Button Background:</span>
                        <RexColorPicker/>
                    </div>

                    <div className="rex-form-group btnTypho">
                        <span className="input-title">Button Font Size & Color:</span>
                        <input type="number" name="lodmrBtnFontSize" min="12" placeholder="14" />
                        <RexColorPicker/>
                    </div>
                    
                    <div className="rex-form-group">
                        <span className="input-title">Button Text:</span>
                        <input type="text" name="lodmrBtnText" placeholder="load more" />
                    </div>
                    
                    
                    <h6 className="iconBtn-title">'view on instagram' Button Style</h6>
                    <div className="rex-form-group">
                        <span className="input-title">Button Background:</span>
                        <RexColorPicker/>
                    </div>

                    <div className="rex-form-group btnTypho">
                        <span className="input-title">Button Font Size & Color:</span>
                        <input type="number" name="iconBtnFontSize" min="12" placeholder="14" />
                        <RexColorPicker/>
                    </div>
                    
                    <div className="rex-form-group">
                        <span className="input-title">Button Text:</span>
                        <input type="text" name="iconBtnText" placeholder="load more" />
                    </div>
                </div>
                
                <div className="rex-form-group save-button">
                    <button type="submit">Save settings</button>
                </div>
            </form>
            
        )
    }
}

export default RexButtonStyle;