import React, { useState, useEffect } from "react";
// import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
	const [click, setClick] = useState(false);
	const [, setButton] = useState(true);

	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);

	const showButton = () => {
		if (window.innerWidth <= 960) {
			setButton(false);
		} else {
			setButton(true);
		}
	};

	useEffect(() => {
		showButton();
	}, []);

	window.addEventListener("resize", showButton);

	return (
		<>
			<nav className="_navbar">
				<div className="_navbar-container">
					<Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
						PARALLEL-O-CODE
					</Link>
					<div className="menu-icon" onClick={handleClick}>
						<i className={click ? "fas fa-times" : "fas fa-bars"} />
					</div>
					<ul className={click ? "nav-menu active" : "nav-menu"}>
						<li className="_nav-item">
							<Link to="/" className="nav-links" onClick={closeMobileMenu}>
								Home
							</Link>
						</li>
						<li className="_nav-item">
							<Link to="/algopage" className="nav-links" onClick={closeMobileMenu}>
								Algorithms
							</Link>
						</li>
						<li className="_nav-item">
							<Link to="/ippage" className="nav-links" onClick={closeMobileMenu}>
								Image Processing
							</Link>
						</li>
					</ul>
					{/* {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>} */}
				</div>
			</nav>
		</>
	);
}

export default Navbar;
