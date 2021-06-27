import React from "react";
import Event from "../Event";
import Form from "../Form";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../Background.css";

import EventData from "../EventData";

function EventPage() {
	return (
		<BrowserRouter>
			<div className="stars-container">
				<div id="stars"></div>
				<div id="stars2"></div>
				<div id="stars3"></div>
				<Switch>
					{EventData.map((event) => (
						<Route path={`/events/${event.eventName.replace(/\s/g, "")}`} key={event.id}>
							<Event EventName={event.eventName} EventData={event} insighto={event.id === 6} />
						</Route>
					))}

					<Route path={"/events/register"} component={Form} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default EventPage;
