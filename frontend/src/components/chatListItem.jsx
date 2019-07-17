import React, { Component } from "react";

export default class ChatListItem extends Component {
	constructor(props) {
		super(props);
		(this.body = this.props.body), (this.nickname = this.props.nickname);
	}

	render() {
		return (
			<div>
				<span>
					{this.nickname}: {this.body}
				</span>
			</div>
		);
	}
}