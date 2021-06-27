import React from "react";
import "../App.css";
import "./HeroSection.css";

function HeroSection() {
	return (
		<div className="hero-container">
			<video src="https://firebasestorage.googleapis.com/v0/b/crwn-db-e8117.appspot.com/o/openMP%2Fvideo%2Fvideo-1.mp4?alt=media&token=de5e71dc-810f-4613-a32a-3a4e769de31e" autoPlay loop muted />
			<h1>PARALLEL-O-CODE</h1>
			<p>Shreyas Mandade<br></br>Aditya Gadadhani<br></br>Abhishek More </p>
			<p className="guide">Guided By- <br></br>Asst.Prof.P.D.Mundada</p>
		</div>
	);
}

export default HeroSection;
