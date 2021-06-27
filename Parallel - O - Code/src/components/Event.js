import React, { useEffect } from "react";
import "./Event.css";

import { Link } from "react-router-dom";
import { Zoom } from "react-reveal";
import Tada from "react-reveal/Tada";
import Container from "react-bootstrap/Container";
import { Row, Col, Image, Accordion, Card, Button } from "react-bootstrap";

export default function Event({ EventName, EventData, insighto }) {
	const createMarkup = (data) => {
		return { __html: data };
	};

	useEffect(() => {
		var startTime = new Date().getTime();
		const interval = setInterval(() => {
			if (new Date().getTime() - startTime > 1000) {
				clearInterval(interval);
				return;
			}
			window.scrollTo({ top: 0 });
		}, 100);
	});
	return (
		<Container className="event_container">
			<Row className="event_header">
				<Col>
					<Zoom cascade>
						<h1 className="event_name">{EventName}</h1>
					</Zoom>
				</Col>
			</Row>

			<Row className="event_row">
				<Col xs={12} lg={6} className="event_img_col">
					<Image src={EventData.img} className="event_image" fluid alt="event" />
				</Col>

				<Col className="event_details">
					<h1>Description</h1>
					<hr />
					<div dangerouslySetInnerHTML={createMarkup(EventData.description)} />
					<Accordion className="accordian">
						<Card>
							<Accordion.Toggle as={Card.Header} eventKey="0">
								<b>
									<span role="img" aria-label="hand-symbol">
										&#128073;
									</span>{" "}
									{!insighto ? "Structure" : "About The Speaker"}
								</b>
							</Accordion.Toggle>
							<Accordion.Collapse eventKey="0">
								<Card.Body>
									<div dangerouslySetInnerHTML={createMarkup(EventData.structure)} />
								</Card.Body>
							</Accordion.Collapse>
						</Card>
						{!insighto ? (
							<Card>
								<Accordion.Toggle as={Card.Header} eventKey="1">
									<b>
										<span role="img" aria-label="hand-symbol">
											&#128073;
										</span>{" "}
										Rules
									</b>
								</Accordion.Toggle>

								<Accordion.Collapse eventKey="1">
									<Card.Body>
										<div dangerouslySetInnerHTML={createMarkup(EventData.rules)} />
									</Card.Body>
								</Accordion.Collapse>
							</Card>
						) : null}

						<Card>
							<Accordion.Toggle as={Card.Header} eventKey="2">
								<b>
									<span role="img" aria-label="hand-symbol">
										&#128073;
									</span>{" "}
									Contact Us
								</b>
							</Accordion.Toggle>
							<Accordion.Collapse eventKey="2">
								<Card.Body>
									<div dangerouslySetInnerHTML={createMarkup(EventData.contact)} />
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					</Accordion>
					{!insighto ? (
						<Tada delay={5000}>
							<Link to="/events/register" style={{ textDecoration: "none" }}>
								<Button variant="primary" size="lg" block className="register_button">
									Register
								</Button>
							</Link>
						</Tada>
					) : null}
				</Col>
			</Row>
		</Container>
	);
}
