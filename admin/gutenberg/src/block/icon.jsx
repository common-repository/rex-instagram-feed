const { Component } = wp.element;

export class Icon extends Component {
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

    render() {
        return (
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAOVBMVEUAAAAjHyAjHyAjHyAj HyAjHyAjHyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjHyAAAAD///8xhbqpAAAAEHRSTlMA EIDfz79gQGAwn68QIN/vjhDcCAAAAAFiS0dEEnu8bAAAAAAHdElNRQfjBAoINgRGW4H8AAAAcElE QVQY032Q2w4DIQhER0C3S6vi//9sddt6Sc2eJ3ISCDOAI7YOkwOcmKeOmDiQBXSORzACyzAo5fSM agf6fJF9VdSUNLbpp2IulRwnpeVCJ5U+Kt2rzeLm/OaJiarYr0p4jQ202LUcGeX4Vs5/hW9Cwges Ap+/pgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0wNC0xMFQwODo1NDowNCswMzowMH6ZjwYAAAAl dEVYdGRhdGU6bW9kaWZ5ADIwMTktMDQtMTBUMDg6NTQ6MDQrMDM6MDAPxDe6AAAAGXRFWHRTb2Z0 d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg=="/>
        )
    }
}
