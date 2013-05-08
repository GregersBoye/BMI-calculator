var gGraph = (function(){
		var trans = 0.4;
		var width = 700;
		var height = 400;


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
			textColor: "#000" //Implementeret
		}


	return {
		drawGraph: function(options){

			settings = jQuery.extend({}, defaults, options);
		

			drawXAxis(settings);
			drawYAxis(settings);
			stage.add(layer);
		}, 
		round: function(number, decimals){
			var factor = Math.pow(10, decimals);
			return Math.round(number*factor)/factor;
		},
		convertCoords: function(coords){
		
			var y = 410-10*(coords.y-10);
			var x = 50+10*(coords.x-50);
			
			return {x:x, y:y};
		}

	};

	function drawXAxis(){
		
		var xAxis = new Kinetic.Line({  
	        points: [40, 410, 760, 410],
	        stroke: settings.lineColor,
	        strokeWidth: settings.lineWidth,
	        lineCap: 'round'

      	});

		layer.add(xAxis);

      	for(var i = 1; i<=70; i++){
      		xPoint = 50+10*i;
			if(i%settings.xUpperScale == 0){
      			stroke = 2;
				var xScale = new Kinetic.Text({
	      			x: xPoint-5,
	      			y: 420,
	      			text: settings.xScale*i+settings.xStart,
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
      			points: [xPoint, 405, xPoint, 415],
		        stroke: settings.lineColor,
		        strokeWidth: stroke,
		        lineCap: 'round'

      		})
      		layer.add(xDash);
      		if(i%5 == 0){

	      		
	      	}
      	}

	}

	function drawYAxis(){
		var yAxis = new Kinetic.Line({
	        points: [50, 420, 50, 10],
	        stroke: settings.lineColor,
	        strokeWidth: settings.lineWidth,
	        lineCap: 'round'

     	});
      	layer.add(yAxis);


      	//
      	for(var i=1; i<40; i++){
      		yPoint = 00+(410-10*i);
      		if(i%settings.yUpperScale == 0){
      			stroke = 2;
				var yScale = new Kinetic.Text({
	      			x: 25,
	      			y: yPoint-6,
	      			text: settings.yScale*i+settings.yStart,
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
      			points: [45, yPoint, 55, yPoint],
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