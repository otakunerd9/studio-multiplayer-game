import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";
//import Animation from "./Animation.js"
export default class guessThatWord extends GameComponent {
	constructor(props) {
		super(props);
		this.state = { word: "", displayWord: "", guessedLetter: "", guesses: [] };
		this.getSessionDatabaseRef().set({
			displayWord: this.state.word,
			guesses: []
		});
		this.updateWord = this.updateWord.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.guessedLetter = this.guessedLetter.bind(this);
		this.newSubmit = this.newSubmit.bind(this);
	}

	newSubmit() {
		var letter = this.state.guessedLetter;
		var guesses = this.state.guesses;
		if (guesses === undefined) {
			guesses = [];
		}
		guesses.push(letter);
		this.getSessionDatabaseRef().update({
			guesses: guesses
		});
	}

	guessedLetter(e) {
		this.setState({ guessedLetter: e.target.value });
	}

	updateWord(e) {
		this.setState({ word: e.target.value });
	}

	onSessionDataChanged(data) {
		console.log("data: ", data);
		if (data.guesses === undefined) {
			data.guesses = [];
		}

		this.setState({
			displayWord: data.displayWord,
			guesses: data.guesses
		});
	}

	handleSubmit() {
		this.getSessionDatabaseRef().set({ displayWord: this.state.word });
		// console.log(this.state.word);
	}

	render() {
		function letterInList(l, guesses) {
			for (var i = 0; i < guesses.length; i++) {
				if (guesses[i] === l) return true;
			}
			s;
			return false;
		}
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

		console.log(this.state);
		var wordLength = this.state.displayWord.length;
		var displayWord = this.state.displayWord;
		var newString = "";
		for (var i = 0; i < wordLength; i++) {
			var char = displayWord[i];
			if (letterInList(char, this.state.guesses)) {
				newString += char + " ";
			} else {
				newString += "_ ";
			}
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
					<input type="text" onChange={this.guessedLetter} />
					<input type="submit" onClick={this.newSubmit} />
				</div>
			);
		}
	}
}
