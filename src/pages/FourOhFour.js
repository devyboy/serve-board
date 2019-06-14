import React, { Component } from "react";


class Thread extends Component {
    render() {
        return(<h1>{this.props.location.pathname} not found.</h1>);
    }
}

export default Thread;