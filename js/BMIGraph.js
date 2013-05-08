

		var BMIGraph = (function(){

			var trans = 0.4;
			var width = 700;
			var height = 400;

			return {
				plotBMI: function(height){
					console.log(height)
					var topBMI = gGraph.round(120/Math.pow(height,2), 0);
					var bottomBMI = gGraph.round(50/Math.pow(height,2),0);
					var startCoord = gGraph.convertCoords({x:50, y:bottomBMI});
					var endCoords = gGraph.convertCoords({x: 120, y: topBMI });

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
			        	x: 50,
			        	y: 110,
				        width: width,
				        height: 50,
				        fill: 'darkred',
				        opacity: trans
				    });
					layer.add(veryObese);

					var obese = new Kinetic.Rect({
			        	x: 50,
			        	y: 160,
				        width: width,
				        height: 50,
				        fill: 'red',
				        opacity: trans		        
				    });
					layer.add(obese);

					var overweight = new Kinetic.Rect({
			        	x: 50,
			        	y: 210,
				        width: width,
				        height: 50,
				        fill: 'orange',
				        opacity: trans
				        
				        
				    });
					layer.add(overweight);

					var normal = new Kinetic.Rect({
			        	x: 50,
			        	y: 260,
				        width: width,
				        height: 65,
				        fill: 'green',
				        opacity: trans
				        
				        
				    });
					layer.add(normal);

					var underweight = new Kinetic.Rect({
			        	x: 50,
			        	y: 325,
				        width: width,
				        height: 15,
				        fill: 'orange',
				        opacity: trans
				    });
					layer.add(underweight);

					var veryUnderweight = new Kinetic.Rect({
			        	x: 50,
			        	y: 340,
				        width: width,
				        height: 10,
				        fill: 'red',
				        opacity: trans
				    });
					layer.add(veryUnderweight);
					stage.add(layer);

				}
			}
		})();
