import React from "react";
import "./Footer.css";


import { Link } from "react-router-dom";

function Footer() {
	return (
		<div className="footer-container">
			<section class="social-media">
				<div class="social-media-wrap">
					<div class="footer-logo">
						<Link to="/" className="social-logo" style={{ letterSpacing: "5px" }}>
							Parallel-O-Code
						</Link>
					</div>
					<small class="website-rights">Parallel-O-Code © 2020</small>
					
				</div>
			</section>
		</div>
	);
}

export default Footer;
