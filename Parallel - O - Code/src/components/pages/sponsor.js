import React from "react";
import "./sponser.css";
import "../Background.css";

export default function Sponsor() {
	return (
		<div className="stars-container">
			<div id="stars"></div>
			<div id="stars2"></div>
			<div id="stars3"></div>
			<h1 style={{ color: "green", transform: "translateY(15vmin)" }}>Educational Sponsors </h1>
			<div className="sponser-container">
				<a
					href="https://practice.geeksforgeeks.org/"
					target="_blank"
					rel="noopener noreferrer"
					className="sponser-container-inner">
					geeksforgeeks
				</a>
			</div>
		</div>
	);
}
