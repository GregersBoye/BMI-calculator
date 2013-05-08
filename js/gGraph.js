var gGraph = (function(){
	

		var settings;
		var measurements = {};

		var defaults = {
			xMin: 0,
			xMax: 120,
			yMin: 0,
			yMax: 44,
			xStart: 50, //Implementeret
			yStart: 10, //Implementeret
			xScale: 1,
			xUpperScale: 5, //Implementeret
			yScale: 1,
			yUpperScale: 5, // Implementeret
			lineColor: "#000", //Implementeret
			lineWidth: 2, //Implemnteret
			textColor: "#000", //Implementeret
			width: 700,
			height: 410,
		}




	return {
		init: function(options){
			settings = jQuery.extend({}, defaults, options);

			measurements.xPoints = settings.xMax-settings.xMin;
			measurements.xDist = settings.width/measurements.xPoints;

			measurements.yPoints = settings.yMax - settings.yMin;
			measurements.yDist = settings.height/measurements.yPoints;

		},
		drawGraph: function(options){
			drawXAxis();
			drawYAxis();
			stage.add(layer);
		}, 
		getSettings: function(){
			return settings;
		},
		round: function(number, decimals){
			var factor = Math.pow(10, decimals);
			return Math.round(number*factor)/factor;
		},
		getDistances: function(){
			return {x: measurements.xDist, y: measurements.yDist}
		},
		convertCoords: function(coords){
		
			var y = this.convertYCoord(coords.y);
			var x = this.convertXCoord(coords.x);
			
			return {x:x, y:y};
		},
		convertXCoord: function(xCoord){
			return 50+measurements.xDist*(xCoord-settings.xMin);
		},
		convertYCoord: function(yCoord){
			return (settings.height+20)-measurements.yDist*(yCoord-settings.yMin);
		}


	};

	function drawXAxis(){
		
		
		var xAxis = new Kinetic.Line({  
	        points: [40, settings.height+20, 760, settings.height+20],
	        stroke: settings.lineColor,
	        strokeWidth: settings.lineWidth,
	        lineCap: 'round'

      	});

		layer.add(xAxis);

      	for(var i = 1; i<=measurements.xPoints; i++){

      		xPos = 50+settings.xMin+measurements.xDist*i;
      		
			if(i%settings.xUpperScale == 0){
      			stroke = 2;
				var xScale = new Kinetic.Text({
	      			x: xPos-5,
	      			y: settings.height+30,
	      			text: i,
	      			fontFamily: 'Georgia',
	      			fontSize: 12,
	      			fill: settings.textColor

	      		})
	      		layer.add(xScale);
      		}
      		else
      			stroke = 1;

			//Dashes on the x-axis.
      		
      		
      		var xDash = new Kinetic.Line({
      			points: [xPos, settings.height+15, xPos, settings.height+25],
		        stroke: settings.lineColor,
		        strokeWidth: stroke,
		        lineCap: 'round'

      		})
      		layer.add(xDash);
      	
      	}

	}

	function drawYAxis(){

		

		var yAxis = new Kinetic.Line({
	        points: [50, settings.height+30, 50, 10],
	        stroke: settings.lineColor,
	        strokeWidth: settings.lineWidth,
	        lineCap: 'round'

     	});
      	layer.add(yAxis);


      	//
      	for(var i=1; i<=measurements.yPoints; i++){
      		
      		yPos = settings.height+20-(settings.yMin+measurements.yDist*i);
      		if(i%settings.yUpperScale == 0){
      			stroke = 2;
				var yScale = new Kinetic.Text({
	      			x: 25,
	      			y: yPos-6,
	      			text: i,
	      			fontFamily: 'Georgia',
	      			fontSize: 12,
	      			fill: settings.textColor
	      		})
	      		layer.add(yScale);


      		}
      		else
      			stroke = 1;

      		
      		
      		//Lines on the y-axis
      		var yDash = new Kinetic.Line({
      			points: [45, yPos, 55, yPos],
		        stroke: settings.lineColor,
		        strokeWidth: stroke,
		        lineCap: 'round'

      		})
      		layer.add(yDash);

      		if(i%5 == 0){
	      		
      		}
      	}
	}


})();