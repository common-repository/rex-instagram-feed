import React, { Component } from "react";
import { Button, FormControl, InputGroup, Form } from "react-bootstrap";
import { ChromePicker } from "react-color";
import reactCSS from "reactcss";

class RexColorPicker extends Component {
  state = {
    displayColorPicker: false,
    color: {
      r: "241",
      g: "112",
      b: "19",
      a: "1"
    }
  };
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = color => {
    this.setState({ color: color.rgb });
    console.log(this.state.color);
  };

  render() {
    const { color, onColorChange, itemKey } = this.props;
    const styles = reactCSS({
      default: {
        color: {
          width: "50px",
          height: "48px",
          borderRadius: "3px 0 0 3px",
          background: `rgba(${color ? color.r : 255}, ${
            color ? color.g : 255
          }, ${color ? color.b : 255}, ${color ? color.a : 1})`
        },
        swatch: {
          background: "#fff",
          height: "48px",
          borderRadius: "3px 0 0 3px",
          display: "inline-block",
          cursor: "pointer"
        },
        popover: {
          position: "absolute",
          zIndex: "2",
          top: "45px"
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px"
        }
      }
    });

    return (
      <div className="rex-color-picker">
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <ChromePicker
              color={color}
              onChange={onColorChange.bind(this, itemKey)}
            />
          </div>
        ) : null}
        <span className="select-color">Select color</span>
      </div>
    );
  }
}

export default RexColorPicker;
