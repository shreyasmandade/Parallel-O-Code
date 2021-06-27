import React, { useEffect, useState } from "react";
import anime from "animejs/lib/anime.es.js";
import { Alert, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

import axiosConfig from "./config";

import "./Form.css";
import Loader from "./Loader";

export default function Form({ EventName }) {
	const Events = [
		{
			EventName: "CodeKombat",
			EventLabel: "CodeKombat ₹60",
			Amount: 60,
			disabled: true,
		},
		{
			EventName: "WebCipher",
			EventLabel: "WebCipher ₹40",
			Amount: 40,
			disabled: true,
		},
		{
			EventName: "ELIPTAS",
			EventLabel: "ELIPTAS ₹30",
			Amount: 30,
			disabled: true,
		},
		{
			EventName: "Auslander",
			EventLabel: "Auslander ₹25",
			Amount: 25,
			disabled: true,
		},
		{
			EventName: "CodeTracer",
			EventLabel: "CodeTracer ₹50",
			Amount: 50,
			disabled: true,
		},
		// {
		// 	EventName: "Tech talk",
		// 	EventLabel: "Tech talk FREE",
		// 	Amount: 0,
		// },
	];

	const [state, setState] = useState({ isSending: false, anim: false });
	const [name, setName] = useState("");
	const [event, setEvent] = useState("");
	const [amount, setAmount] = useState("");
	const [email, setEmail] = useState("");
	const [contact, setContact] = useState("");
	const [college, setCollege] = useState("");
	const [idProof, setIdProof] = useState("");
	const [error, setError] = useState(null);
	const [paymentDone, setPaymentDone] = useState(-1);
	const [loading, setLoading] = useState(false);

	const RenderError = ({ error }) => {
		return (
			<Alert variant="danger" dismissible onClose={() => setError(null)}>
				<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
				<p>{error}</p>
			</Alert>
		);
	};

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://checkout.razorpay.com/v1/checkout.js";
		document.body.appendChild(script);
		window.scrollTo({ top: 0 });
		// script.onload = () => console.log("script loaded");
		// script.onerror = () => console.log("script not loaded");
	}, []);

	const razorpay = (e) => {
		e.preventDefault();

		axiosConfig
			.post("/razorpay", {
				name,
				email,
				event,
				amount,
				contact,
				college,
				idProof,
			})
			.then((res) => {
				setLoading(false);
				const razorPaymentModal = () => {
					if (res.data === "Tech Talk") {
						document.getElementById("update").innerHTML = "";
						setPaymentDone(1);
						return;
					}
					const data = res.data;
					const options = {
						key: process.env.REACT_APP_RAZORPAY_API_KEY,
						currency: data.currency,
						amount: data.amount,
						name: data.name,
						email: data.email,
						contact: data.contact,
						description: event,
						order_id: data.id,

						handler: function (response) {
							const element = document.createElement("a");
							element.setAttribute(
								"href",
								"data:text/plain;charset=utf-8," +
									encodeURIComponent(`Your Registeration Details are as follows - 
			1. Payment Id: ${response.razorpay_payment_id}
			2. Order Id: ${response.razorpay_order_id}
			3. Payment Signature: ${response.razorpay_signature}
			4. Event Name : ${event}
										`)
							);
							element.setAttribute("download", "Event_Registeration.txt");

							element.style.display = "none";
							document.body.appendChild(element);

							element.click();
							document.body.removeChild(element);

							document.getElementById("update").innerHTML = "";
							setPaymentDone(1);
						},
						modal: {
							ondismiss: function () {
								document.getElementById("update").innerHTML = "";
								setPaymentDone(0);
							},
						},
						prefill: {
							name: data.name,
							email: data.email,
							contact: data.contact,
						},
					};

					const paymentObj = new window.Razorpay(options);
					paymentObj.open();
				};

				timeline().then(razorPaymentModal); // payment modal will appear after animation
			})
			.catch((err) => {
				// console.log("Error", err.response.data, typeof err.response.data);
				setError(JSON.stringify(err.response.data));
				setLoading(false);
			});
	};

	const timeline = () => {
		return new Promise((resolve) => {
			const moo = () => {
				setState({ isSending: true, anim: false });
			};
			let t1 = anime.timeline({
				easing: "easeInOutSine",
				changeComplete: function () {
					window.scrollTo({ top: 0 });
					moo();
					resolve();
				},
			});
			t1.add({
				targets: ".heading",
				translateX: "100%",
				opacity: [1, 0],
				easing: "easeInOutSine",
				duration: 150,
			})
				.add({
					targets: "#submit",
					borderWidth: "0px",
					duration: 0,
					easing: "easeInOutSine",
				})
				.add({
					targets: ".submit-btn",
					opacity: [1, 0],
					duration: 150,
				})
				.add({
					targets: ".input-effect",
					translateY: (el, i, l) => `${150 * (l - i)}%`,
					opacity: [1, 0],
					easing: "easeInOutSine",
					duration: 700,
					delay: anime.stagger(-300, { start: 900 }), //(el, i, l) => 300 * (l - i),
				})
				.add(
					{
						targets: ".siz",
						translateY: "70px",
						translateX: "50px",
						scale: 8,
						duration: 1300,
						delay: 0,
					},
					"-=1300"
				)
				.add({
					targets: ".siz",
					translateY: "-800px",
					easing: "easeInOutQuad",
					duration: 1200,
				})
				.add(
					{
						targets: ".siz",
						opacity: [1, 0],
						duration: 200,
					},
					"-=250"
				)
				.add(
					{
						targets: "#p1",
						fill: "#ed143d",
						duration: 800,
					},
					"-=600"
				)
				.add({
					targets: ".siz",
					translateY: "-2000px",
					duration: 1,
				});
		});
	};
	const send = (e) => {
		e.preventDefault();
		setLoading(true);
		if (name.length < 5 || name.trim().split(/\s+/).length < 2) {
			setError(`Name too short! Enter your full name...`);
			return;
		} else if (event === "" || amount === "") {
			setError("Select an event to register");
		} else {
			setError("");
		}
		setState({ anim: true, isSending: true });
		razorpay(e);
	};

	const handleEventChange = (e) => {
		setEvent(e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text);
		setAmount(e.nativeEvent.target[e.nativeEvent.target.selectedIndex].value);
	};

	const RenderPaymentDone = ({ isPaymentSuccess }) => {
		return (
			<div className="paymentDone">
				{isPaymentSuccess ? (
					<p className="text-success">
						Your Event Registeration has been completed successfully ! <br />
						The Event Registeration details will be mailed to you and further updates will be notified
						shortly !{" "}
					</p>
				) : (
					<p className="text-danger">
						Payment Checkout form was closed.
						<br /> Event Registeration unsuccessful !
					</p>
				)}
				<a href="/">
					<Button variant="primary" size="lg">
						Go To Home Page
					</Button>
				</a>
				{isPaymentSuccess ? null : (
					<Link to="/events/register">
						<Button size="lg" variant="success" onClick={() => window.location.reload()}>
							Retry Registeration
						</Button>
					</Link>
				)}
			</div>
		);
	};

	return (
		<>
			{loading ? <Loader /> : null}
			{error ? <RenderError error={error} /> : ""}
			{state.isSending && !state.anim && (
				<div id="update">
					<p>
						Your registeration details are packed and ready to be delivered to us! Please complete the
						payment to fuel the rocket.
					</p>
				</div>
			)}
			{paymentDone === 1 ? <RenderPaymentDone isPaymentSuccess={true} /> : null}
			{paymentDone === 0 ? <RenderPaymentDone isPaymentSuccess={false} /> : null}
			<form id="contactform" onSubmit={send} autoComplete="on">
				<h1 className="heading">Event Registeration Form</h1>

				<div className="input-effect">
					<input
						id="name"
						className="effect-21"
						type="text"
						placeholder=" "
						value={name}
						onChange={(e) => setName(e.target.value)}
						autoFocus
						required
					/>
					<label htmlFor="name">Name</label>
					<span className="focus-border">
						<i></i>
					</span>
				</div>

				<div className="input-effect">
					<input
						id="email"
						className="effect-21"
						type="email"
						placeholder=" "
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<label htmlFor="email" className="long-label">
						Email Address
					</label>
					<span className="focus-border">
						<i></i>
					</span>
				</div>

				<div className="input-effect">
					<input
						id="contact"
						className="effect-21"
						type="text"
						placeholder=" "
						value={contact}
						onChange={(e) => setContact(e.target.value)}
						required
					/>
					<label htmlFor="contact">Contact</label>
					<span className="focus-border">
						<i></i>
					</span>
				</div>

				<div className="input-effect">
					<input
						id="college"
						className="effect-21"
						type="text"
						placeholder=" "
						value={college}
						onChange={(e) => setCollege(e.target.value)}
						required
					/>
					<label htmlFor="college" className="long-label">
						College Name
					</label>
					<span className="focus-border">
						<i></i>
					</span>
				</div>
				<OverlayTrigger
					placement="top"
					delay={{ show: 250, hide: 400 }}
					onEntering={(e) => {
						e.children[1].style.border = "1px solid white";
					}}
					overlay={(props) => (
						<Tooltip id="button-tooltip" {...props}>
							You can upload google drive link for id proof
						</Tooltip>
					)}>
					<div className="input-effect">
						<input
							id="idProof"
							className="effect-21"
							type="url"
							value={idProof}
							placeholder=" "
							onChange={(e) => {
								setIdProof(e.target.value);
							}}
							required
						/>

						<label htmlFor="idProof" className="long-label-xl">
							URL of College Id Proof or LinkedIn Profile
						</label>
						<span className="focus-border">
							<i></i>
						</span>
					</div>
				</OverlayTrigger>

				<div className="input-effect">
					<select name="plan" id="plan" required onChange={handleEventChange} defaultValue="">
						<option disabled value="">
							Select Event
						</option>
						{Events.map((Event, idx) =>
							Event.disabled ? (
								<option label={Event.EventLabel} key={idx} value={Event.Amount} disabled>
									{Event.EventName}
								</option>
							) : (
								<option label={Event.EventLabel} key={idx} value={Event.Amount}>
									{Event.EventName}
								</option>
							)
						)}
					</select>
					<span className="focus-border">
						<i></i>
					</span>
				</div>

				<button id="submit" type="submit">
					<div className="siz">
						<span className="submit-btn">REG</span>
						<svg
							id="Capa_1"
							height="37"
							viewBox="0 0 512.056 512.056"
							width="40"
							xmlns="http://www.w3.org/2000/svg"
							fill="#fff">
							<path
								id="p1"
								d="m350.038 120.265c-7.206-36.687-27.738-70.157-57.939-92.992l-36.071-27.273-36.071 27.272c-30.201 22.835-50.733 56.305-57.939 92.992h188.02z"
							/>
							<path fill="#ffa500" d="m394.777 252.144v151.096h77.609v-69.027z" />
							<path
								fill="crimson"
								d="m337.633 221.387c-11.732 0-21.277 9.545-21.277 21.278v145.279h48.422v-145.279c0-11.732-9.545-21.278-21.277-21.278z"
							/>
							<path
								fill="crimson"
								d="m195.701 242.665c0-11.732-9.545-21.278-21.277-21.278h-5.867c-11.732 0-21.277 9.545-21.277 21.278v145.279h48.422v-145.279z"
							/>
							<path fill="#ffa500" d="m117.279 252.144-77.609 82.069v69.027h77.609z" />
							<path
								fill="#ffff00"
								d="m286.355 417.944v-175.279c0-28.275 23.003-51.278 51.277-51.278h5.867c3.213 0 6.353.311 9.403.879v-42.001h-193.75v42.001c3.051-.568 6.19-.879 9.403-.879h5.867c28.274 0 51.277 23.003 51.277 51.278v175.279h-54.474c-2.706 12.642-2.828 26.509 3.811 38.389l4.293 7.683h25.264c5.605 13.589 18.466 35.112 45.957 45.893l5.477 2.148 5.477-2.148c27.491-10.781 40.352-32.303 45.957-45.893h25.264l4.294-7.683c6.638-11.88 6.516-25.747 3.81-38.389z"
							/>
						</svg>
						<span className="submit-btn">STER</span>
					</div>
				</button>
			</form>
		</>
	);
}
