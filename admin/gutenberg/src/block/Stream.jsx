const { BlockIcon } = wp.blocks;
const { Component } = wp.element;
import * as api from "./utills/fetchWP";

export class Stream extends Component {
	constructor(props) {
		super(props);
		this.props = props;

		this.state = {
			posts: [],
			loading: false,
			type: "post",
			types: [],
			filter: "",
			filterLoading: false,
			filterPosts: [],
			pages: {},
			pagesTotal: {},
			paging: false,
			initialLoading: false,
			streams: {}
		};
	}

	componentDidMount() {
		this.setState({
			loading: true,
			initialLoading: true
		});

		api.getStreams().then(streams => {
			this.setState({
				streams: streams
			});

			if (Object.keys(streams).length > 0) {
				if (!this.props.selectedStream) {
					let selectedStream = Object.keys(streams)[0];
					this.props.setAttributes({ selectedStream });
				}
			}
		});
	}

	updateSelectedStream(event) {
		this.props.updateSelectedStream(event.target.value);
	}

	render() {
		const { selectedStream } = this.props;

		return (
			<div className="stream-select">
				<select
					name="options"
					id="options"
					onChange={this.updateSelectedStream.bind(this)}
					value={selectedStream}
				>
					<option value="">Select Stream</option>
					{Object.keys(this.state.streams).length < 1 ? (
						<option value="">No stream created yet</option>
					) : (
						Object.keys(this.state.streams).map(key => (
							<option key={key} value={key}>
								{this.state.streams[key].name}
							</option>
						))
					)}
				</select>
			</div>
		);
	}
}
