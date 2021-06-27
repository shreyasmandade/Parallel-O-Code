import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";


export const AlgoMenu= () =>{
	return(
		<div className="cards" id="events">

			<ul className="cards__items prereqs">
						<h1 className="text-success">Prerequisites</h1>
							<pre>
								{`
						For Linux Users:
				1)First step is getting gcc compiler installed in your Ubuntu.For that in your terminal,run:
							sudo apt install gcc

				2)Make suru you save the codes in .c or .cpp format and keep it in same folder.

				3)For running the codes,first go to the folder where the codes are kept.Open terminal from the respective folder and perform the 
				following steps:
					a)If the saved format is .c,then -
					##Compile
							gcc filename.c 
					##run
							./a.out
					b)If the saved format is .cpp,then -
					##Compile
							g++ filename.c 
					##run
							./a.out

				For Windows Users:
				The following codes will be implemented in Dev Cpp.So make sure to install Dev Cpp.Link:
				`}
				<a href="https://sourceforge.net/projects/orwelldevcpp/" target="_blank"  rel="noopener noreferrer"> click here to download DevCpp </a>
				{`
				1)After installation,to make Dev Cpp compatible for supporting openMP follow the steps given in below youtube link:
				`}

				<a href="https://youtu.be/nk90tEbdl3Q" target="_blank"  rel="noopener noreferrer"> Next Steps Here </a>
					

				{`
				2)Now open any code in Dev Cpp,and to compile and run the code click on Execute ->Compile and Run(F11) to check working of code.

				`}
							</pre>
				<pre>
					
				
				</pre>
				
							
			</ul>
				
				<div className="cards__container">
					<div className="cards__wrapper">
	
						
						<h1 className="text-success">Choose Section</h1>
						
						<ul className="cards__items">
							<CardItem
								src="images/code1.jpg"
								text="Standard Algorithms"
								path="/standard"
								
							/>
							<CardItem
								src="images/cf.jpg"
								text="Competitive Coding Questions"
								path="/cpcards"
								
							/>
							
						</ul>
	
						
					</div>
				</div>
			</div>
	);
}
 export const AlgoCards=()=> {
	return (
		<div className="cards" id="events">
			<h1 className="text-success">Choose Algorithm Type</h1>
			<div className="cards__container">
				<div className="cards__wrapper">

					{/* Algorithm will go here */}

					<ul className="cards__items">
						<CardItem
							src="images/code2.jpg"
							text="Prime Number"
							path="/algopage/prime"
							
						/>
						<CardItem
							src="images/code1.jpg"
							text="Matrix Multiplication"
							path="/algopage/matrix"
							
						/>
						
					</ul>
					<ul className="cards__items">
						<CardItem
							src="images/code1.jpg"
							text="PI Value Calculation"
							path="/algopage/pascal"
							
						/>
						<CardItem
							src="images/code2.jpg"
							text="Kruskal's Algorithm"
							path="/algopage/kruskal"
							
						/>
					</ul>

					
					<ul className="cards__items" style={{maxWidth:"20vw"}}>
						
						<CardItem
							src="images/code2.jpg"
							text="Bubble Sort"
							path="/algopage/bubble"
							
						/>
					
						
					</ul>
				</div>
			</div>
		</div>
	);
};

export const CpCards=()=> {
	return (
		<div className="cards" id="events">
			<h1 className="text-success">Choose Algorithm Type</h1>
			<div className="cards__container">
				<div className="cards__wrapper">

					<ul className="cards__items">
						<CardItem
							src="images/cf.jpg"
							text="Codeforces Question 1"
							path="/algopage/cf1"
							
						/>
						<CardItem
							src="images/cf.jpg"
							text="Codeforces Question 2"
							path="/algopage/cf2"
							
						/>
						
					</ul>

					<ul className="cards__items">
						<CardItem
							src="images/cf.jpg"
							text="Codeforces Question 3"
							path="/algopage/cf3"
							
						/>
						<CardItem
							src="images/cc.webp"
							text="Codechef Question 4"
							path="/algopage/cf4"
							
						/>
						
					</ul>

					<ul className="cards__items" style={{maxWidth:"20vw"}}>
						<CardItem
							src="images/cc.webp"
							text="Codechef Question 5"
							path="/algopage/cf5"
							
						/>
					
						
					</ul>

					
				</div>
			</div>
		</div>
	);
};

