import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";
//import Animation from "./Animation.js"
export default class guessThatWord extends GameComponent {
	constructor(props) {
		super(props);
		this.state = { word: "" };

		this.updateWord = this.updateWord.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	onKeyPress(e) {
		// if (e.key === "d") {
		// }
	}

	updateWord(e) {
		this.setState({ word: e.target.value });
	}

	onSessionDataChanged(data) {
		console.log(data.word);
	}

	handleSubmit() {
		this.getSessionDatabaseRef().set({ word: this.state.word });
		// console.log(this.state.word);
	}

	render() {
		var id = this.getSessionId();
		var users = this.getSessionUserIds().map(user_id => (
			<li key={user_id}>{UserApi.getName(user_id)}</li>
		));
		var status = "";
		if (this.getMyUserId() === this.getSessionCreatorUserId()) {
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
				<input type="text" onChange={this.updateWord} />
				<input type="submit" onClick={this.handleSubmit} />
			</div>
		);
	}
}
