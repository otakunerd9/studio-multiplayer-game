import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";
//import Animation from "./Animation.js"
export default class spaceInvaders extends GameComponent {
	constructor(props) {
		super(props);
		this.state = { width: 50 };
	}
	// componentDidMount() {
	// 	const canvas = this.refs.canvas;
	// 	const ctx = canvas.getContext("2d");
	// 	ctx.fillStyle = "black";
	// 	ctx.fillRect(0, 0, canvas.width, canvas.height);
	// 	ctx.fillStyle = "white";
	// 	var x = 100;
	// 	ctx.fillRect(100, 500, 20, 100);
	// ctx.clearRect(0, 0, canvas.width, canvas.height);

	// for (x = 100; x < 1000; x++) {
	// 	ctx.fillRect(x, 500, 20, 100);

	// }

	// if (keyIsDown(LEFT_ARROW)) {
	// 	x -= 10
	// }
	// if (keyIsDown(RIGHT_ARROW)) {
	// 	x += 10
	// }
	// if (x > 1299) {
	// 	x = 0
	// } else if (x <= 1) {
	// 	x = 1298
	// }
	// if (keyIsDown(UP_ARROW)) {
	// 	bullets.push(new Bullet(x, height));
	// }
	//	}

	onKeyPress(e) {
		if (e.key === "d") {
			this.setState({ width: width + 5 });
		}
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
			<div
				style={{
					backgroundColor: "black",
					width: "1300px",
					height: "600px",
					bottom: "10px"
				}}
			>
				<p>Session ID: {id}</p>
				<p>Session creator: {creator}</p>
				<p>Session users:</p>
				<ul>{users}</ul>
				<p>{status}</p>
				<input type="text" id="one" onKeyPress={this.onKeyPress} />
				<div
					className="player"
					style={{
						backgroundColor: "white",
						width: this.state.width.toString() + "px",
						height: "50px",
						bottom: "10px",
						position: "absolute"
					}}
				>
					{" "}
				</div>
			</div>
		);
	}
}
