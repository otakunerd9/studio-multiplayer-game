import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";
//import Animation from "./Animation.js"
export default class spaceInvaders extends GameComponent {
	componentDidMount() {
		const canvas = this.refs.canvas;
		const ctx = canvas.getContext("2d");
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "white";
		var x = 100;
		ctx.fillRect(100, 500, 20, 100);
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
				<canvas ref="canvas" width="1300" height="600" />;
			</div>
		);
	}
}
