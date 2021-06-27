import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";

function Cards() {
	return (
		<div className="cards" id="events">
				<ul className="cards__items prereqs">
				<h1 className="text-success">Prerequisites</h1>
							<pre>
								{`
				The following codes were implemented in Linux Ubuntu Terminal.So before performing the Image Processing operation 
				make sure you install Ubuntu within your system.

				1)First step is getting gcc compiler installed in your Ubuntu.For that in your terminal,run:
							sudo apt install gcc

				2)Second step is getting libpng installed in your Ubuntu.For that in your terminal,run:
					For libpng, run:
							sudo apt-get install libpng-dev
					For zlib, run:
							sudo apt-get install zlib1g-dev

				3)Make suru you save the codes in .c format.Download .png format images and keep it in same folder where the codes 
				are kept and rename it the format "cat (i).png" where i denotes the the ith image in the sequence.

				4)For running the codes,first go to the folder where the codes and images are kept.Open terminal from the respective
				folder and perform the following steps:
					##Compile
							gcc -o filename -fopenmp filename.c -lpng
					##run
							./filename

				5)Post running the codes, you can notice new .png image file with name "out (i).png" is created which is the result 
				of IP operation that was performed on "cat (i).png" in the same folder.Number of output files generated are same as 
				that of input image files.

								`}
							</pre>
							
						</ul>
			<div className="cards__container">
				<div className="cards__wrapper">

					<h1 className="text-success">Choose Image Processing Technique</h1>

					<ul className="cards__items">
						<CardItem
							src="gif/negation/superman.gif"
							text="Image Negation"
							path="/ippage/negation"
							
						/>
						<CardItem
							src="gif/blurr/spidey.gif"
							text="Blurring"
							path="/ippage/blurring"
							
						/>
						
					</ul>
					<ul className="cards__items">
						<CardItem
							src="gif/edge/peak.gif"
							text="Edge Detection using Sobel Operator"
							path="/ippage/edgedetection"
							
						/>
						<CardItem
							src="gif/LoG/thanos.gif"
							text="Edge Detection using LoG"
							path="/ippage/LoG"
							
						/>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Cards;
