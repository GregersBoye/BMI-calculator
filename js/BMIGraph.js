

		var BMIGraph = (function(){
			var BmiData;
			var trans = 0.4;

			var graphSettings;
			var measurements;

			return {
				init: function(){
					BmiData = new Kinetic.Layer;
					graphSettings = gGraph.getSettings();
				},
				plotBMI: function(userHeight){

					var topWeight = Math.pow(userHeight,2)*40;
					var topBMI = 40;

					var bottomWeight = Math.pow(userHeight,2)*15;
					var bottomBMI = 15;
					
					if(topWeight > graphSettings.xMax){
						topWeight = graphSettings.xMax;
						topBMI = topWeight/Math.pow(userHeight,2);
					}

					if(bottomWeight < graphSettings.xMin){
						bottomWeight = graphSettings.xMin;
						bottomBMI = bottomWeight/Math.pow(userHeight, 2);
					}

					var startCoord = gGraph.convertCoords({x:bottomWeight, y:bottomBMI});
					var endCoords = gGraph.convertCoords({x: topWeight, y: topBMI });

					var BMILine = new Kinetic.Line({
						points: [startCoord.x, startCoord.y, endCoords.x, endCoords.y],
						stroke: '#000',
						strokeWidth: 2,
					})
					BmiData.add(BMILine);
					stage.add(BmiData);

				},

			
				plotIntervals: function(){
					
					var veryObese = new Kinetic.Rect({
			        	x: gGraph.convertXCoord(0),
			        	y: gGraph.convertYCoord(40),
				        width: graphSettings.width,
				        height: 5*gGraph.getDistances().y,
				        fill: 'darkred',
				        opacity: trans
				    });
					BmiData.add(veryObese);

					var obese = new Kinetic.Rect({
			        	x: gGraph.convertXCoord(0),
			        	y: gGraph.convertYCoord(35),
				        width: graphSettings.width,
				        height: 5*gGraph.getDistances().y,
				        fill: 'red',
				        opacity: trans		        
				    });
					BmiData.add(obese);

					var overweight = new Kinetic.Rect({
			        	x: gGraph.convertXCoord(0),
			        	y: gGraph.convertYCoord(30),
				        width: graphSettings.width,
				        height: 5*gGraph.getDistances().y,
				        fill: 'orange',
				        opacity: trans
				        
				        
				    });
					BmiData.add(overweight);

					var normal = new Kinetic.Rect({
			        	x: gGraph.convertXCoord(0),
			        	y: gGraph.convertYCoord(25),
				        width: graphSettings.width,
				        height: 6.5*gGraph.getDistances().y,
				        fill: 'green',
				        opacity: trans
				        
				        
				    });
					BmiData.add(normal);

					var underweight = new Kinetic.Rect({
			        	x: gGraph.convertXCoord(0),
			        	y: gGraph.convertYCoord(18.5),
				        width: graphSettings.width,
				        height: 2.5*gGraph.getDistances().y,
				        fill: 'orange',
				        opacity: trans
				    });
					BmiData.add(underweight);

					var veryUnderweight = new Kinetic.Rect({
			        	x: gGraph.convertXCoord(0),
			        	y: gGraph.convertYCoord(16),
				        width: graphSettings.width,
				        height: 1*gGraph.getDistances().y,
				        fill: 'red',
				        opacity: trans
				    });
					BmiData.add(veryUnderweight);
					stage.add(BmiData);

				}
			}
		})();
