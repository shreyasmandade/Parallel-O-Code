import React from "react";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import './Cards.css'

function CardItem(props) {
	return (
		<>
			<Fade left>
				<li className={`cards__item ${props.className}`}>
					<Link className="cards__item__link" to={props.path}>
						<figure className="cards__item__pic-wrap" style={{background:'transparent'}} data-category={props.label}>
							<img className="cards__item__img" alt={props.label} src={props.src} />
							<button style={{position:'absolute',padding:5,top:0,right:5,boxSizing:'border-box',background:'transparent',outline:'none',border:'none',color:'#fff'}}></button>
						</figure>
						<div className="cards__item__info">
							<h5 className="cards__item__text">{props.text}</h5>
							{/* <h6 className="cards__item__text__sm">{props.contact}</h6>
							<h6 className="cards__item__text__sm">Mode:Online</h6>
							<h6 className="cards__item__text__sm">...Learn More</h6> */}
						</div>
					</Link>
				</li>
			</Fade>
		</>
	);
}

export default CardItem;
