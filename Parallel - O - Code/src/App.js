import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import Home from "./components/pages/Home";
import IpPage from './components/pages/ip/ippage'
import {AlgoMenuPage,AlgoCardsPage,CpCardsPage} from './components/pages/algo/algopage'
import Footer from './components/Footer'

import Bubble from './components/pages/algo/bubble'
import Prime from './components/pages/algo/prime'
import Matrix from './components/pages/algo/matrix'
import Pascal from './components/pages/algo/pascal'
import Kruskal from './components/pages/algo/kruskal'

import Cf1 from './components/pages/algo/cf1'
import Cf2 from './components/pages/algo/cf2'
import Cf3 from './components/pages/algo/cf3'
import Cf4 from './components/pages/algo/cf4'
import Cf5 from './components/pages/algo/cf5'

import Negation from './components/pages/ip/negation'
import Blurring from './components/pages/ip/blurring'
import Edgedetection from './components/pages/ip/edge-detection'
import LoG from './components/pages/ip/LoG'

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/algopage" exact component={AlgoMenuPage} />
					<Route path="/standard" exact component={AlgoCardsPage} />
					<Route path="/cpcards" exact component={CpCardsPage} />
					<Route path="/ippage" exact component={IpPage} />

					<Route exact path="/algopage/bubble" component={Bubble}></Route>
					<Route exact path="/algopage/prime" component={Prime}></Route>
					<Route exact path="/algopage/matrix" component={Matrix}></Route>
					<Route exact path="/algopage/kruskal" component={Kruskal}></Route>
					<Route exact path="/algopage/pascal" component={Pascal}></Route>

					<Route exact path="/algopage/cf1" component={Cf1}></Route>
					<Route exact path="/algopage/cf2" component={Cf2}></Route>
					<Route exact path="/algopage/cf3" component={Cf3}></Route>
					<Route exact path="/algopage/cf4" component={Cf4}></Route>
					<Route exact path="/algopage/cf5" component={Cf5}></Route>


					<Route path="/ippage/negation" exact component={Negation} />
					<Route path="/ippage/blurring" exact component={Blurring} />
					<Route path="/ippage/edgedetection" exact component={Edgedetection} />
					<Route path="/ippage/LoG" exact component={LoG} />
				</Switch>
				<Footer/>
			</Router>
		</>
	);
}

export default App;
