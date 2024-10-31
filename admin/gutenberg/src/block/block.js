import "./style.scss";
import "./editor.scss";

import { Stream } from "./Stream.jsx";
import { Icon } from "./Icon.jsx";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, PlainText } = wp.blocks; // Import registerBlockType() from wp.blocks
const { Component } = wp.element;
const el = wp.element.createElement;



registerBlockType("rxsmf/instagram-feed", {
        title: __("WP Instagram Feed"),
        icon: <Icon/>,
    category: "common",
    keywords: [__("WP Instagram Feed")],

    attributes: {
    selectedStream: {
        type: "string"
    }
},

edit: class extends Component {
    constructor(props) {
        super(...arguments);
        this.props = props;

        this.updateSelectedStream = this.updateSelectedStream.bind(this);
    }

    updateSelectedStream(selectedStream) {
        this.props.setAttributes({ selectedStream });
    }

    render() {
        const {
            className,
            attributes: { blockTitle = "", selectedStream = "" } = {}
        } = this.props;

        return (
            <div className={className}>
            <Stream
        selectedStream={selectedStream}
        updateSelectedStream={this.updateSelectedStream}
        setAttributes={this.props.setAttributes}
    />
    </div>
    );
    }
},
save: () => {
    return null;
}
});
