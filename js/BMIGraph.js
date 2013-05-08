

		var BMIGraph = (function(){

			var trans = 0.4;

			var graphSettings;
			var measurements;

			return {
				init: function(){
					graphSettings = gGraph.getSettings();

					
				},
				plotBMI: function(userHeight){
				
					
					var topBMI = gGraph.round(Math.pow(userHeight,2)*40, 0);
					var bottomWeight = gGraph.round(Math.pow(userHeight,2)*15, 0);
		
					var startCoord = gGraph.convertCoords({x:bottomWeight, y:15});
					var endCoords = gGraph.convertCoords({x: topBMI, y: 40 });

					var BMILine = new Kinetic.Line({
						points: [startCoord.x, startCoord.y, endCoords.x, endCoords.y],
						stroke: '#000',
						strokeWidth: 2,
					})
					layer.add(BMILine);
					stage.add(layer);

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
					layer.add(veryObese);

					var obese = new Kinetic.Rect({
			        	x: gGraph.convertXCoord(0),
			        	y: gGraph.convertYCoord(35),
				        width: graphSettings.width,
				        height: 5*gGraph.getDistances().y,
				        fill: 'red',
				        opacity: trans		        
				    });
					layer.add(obese);

					var overweight = new Kinetic.Rect({
			        	x: gGraph.convertXCoord(0),
			        	y: gGraph.convertYCoord(30),
				        width: graphSettings.width,
				        height: 5*gGraph.getDistances().y,
				        fill: 'orange',
				        opacity: trans
				        
				        
				    });
					layer.add(overweight);

					var normal = new Kinetic.Rect({
			        	x: gGraph.convertXCoord(0),
			        	y: gGraph.convertYCoord(25),
				        width: graphSettings.width,
				        height: 6.5*gGraph.getDistances().y,
				        fill: 'green',
				        opacity: trans
				        
				        
				    });
					layer.add(normal);

					var underweight = new Kinetic.Rect({
			        	x: gGraph.convertXCoord(0),
			        	y: gGraph.convertYCoord(18.5),
				        width: graphSettings.width,
				        height: 2.5*gGraph.getDistances().y,
				        fill: 'orange',
				        opacity: trans
				    });
					layer.add(underweight);

					var veryUnderweight = new Kinetic.Rect({
			        	x: gGraph.convertXCoord(0),
			        	y: gGraph.convertYCoord(16),
				        width: graphSettings.width,
				        height: 1*gGraph.getDistances().y,
				        fill: 'red',
				        opacity: trans
				    });
					layer.add(veryUnderweight);
					stage.add(layer);

				}
			}
		})();
