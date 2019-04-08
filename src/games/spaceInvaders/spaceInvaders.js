import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";

export default class TicTacToe extends GameComponent {
	render() {
		var id = this.getSessionId();
		var users = this.getSessionUserIds().map(user_id => (
			<li key={user_id}>{UserApi.getName(user_id)}</li>
		));
		var status = "";
		if (this.getMyUserId() && this.getSessionCreatorUserId()) {
			status = "I am host";
		} else {
			status = "I am guest";
		}
		var creator = UserApi.getName(this.getSessionCreatorUserId());
		return (
			<div>
				<p>Session ID: {id}</p>
				<p>Session creator: {creator}</p>
				<p>Session users:</p>
				<ul>{users}</ul>
				<p>{status}</p>
			</div>
		);
	}
}
