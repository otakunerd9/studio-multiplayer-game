import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";
//import Animation from "./Animation.js"
export default class guessThatWord extends GameComponent {
	constructor(props) {
		super(props);
		this.state = { word: "", displayWord: "" };

		this.updateWord = this.updateWord.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	onKeyPress(e) {
		// if (e.key === "d") {
		// }
	}

	newSubmit() {
		this.getSessionDatabaseRef().set({ displayWord: this.state.word });
	}

	updateWord(e) {
		this.setState({ word: e.target.value });
	}

	onSessionDataChanged(data) {
		console.log(data.displayWord);
		this.setState({ displayWord: data.displayWord });
	}

	handleSubmit() {
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
		var wordLength = this.state.displayWord.length;
		var newString = "";
		for (var i = 0; i < wordLength; i++) {
			newString += "_ ";
		}

		var creator = UserApi.getName(this.getSessionCreatorUserId());
		if (this.state.displayWord === "") {
			return (
				<div>
					<p>Session ID: {id}</p>
					<p>Session creator: {creator}</p>
					<p>Session users:</p>
					<ul>{users}</ul>
					<p>{status}</p>
					<input type="text" onChange={this.updateWord} />
					<input type="submit" onClick={this.handleSubmit} />
					<p>{this.state.displayWord} </p>
				</div>
			);
		} else {
			return (
				<div>
					<p>{newString} </p>
					<input type="text" onChange={this.guessedWord} />
					<input type="submit" onClick={this.newSubmit} />
				</div>
			);
		}
	}
}
