var gGraph = (function(){
	

		var settings;
		var measurements = {};
		var coordSystem;
		var data;

		var defaults = {
			xMin: 0, //Implementeret
			xMax: 120, //Implementeret
			yMin: 0, //Implementeret
			yMax: 44, //Implementeret
			xStart: 50, //Implementeret
			yStart: 10, //Implementeret
			xScale: 2,
			xUpperScale: 5, //Implementeret
			yScale: 1,
			yUpperScale: 5, // Implementeret
			lineColor: "#000", //Implementeret
			lineWidth: 2, //Implemnteret
			textColor: "#000", //Implementeret
			width: 700, //Implementeret
 			height: 410, //Implementeret
 			xLabel: "",
 			yLabel : "",
 			showLabel: true,
		}




	return {
		init: function(options){
			coordSystem = new Kinetic.Layer();
			settings = jQuery.extend({}, defaults, options);

			measurements.xPoints = settings.xMax-settings.xMin;
			measurements.xDist = settings.width/measurements.xPoints;

			measurements.yPoints = settings.yMax - settings.yMin;
			measurements.yDist = settings.height/measurements.yPoints;

		},
		drawGraph: function(options){
			drawXAxis();
			drawYAxis();
			stage.add(coordSystem);
		}, 
		getSettings: function(){
			return settings;
		},
		round: function(number, decimals){
			var factor = Math.pow(10, decimals);
			return Math.round(number*factor)/factor;
		},
		plotLine: function(dataSet, options){
			data = new Kinetic.Layer();
			var defaultOptions = {
				lineColor: "#0f0",
			}

			var graphOptions = jQuery.extend({}, defaultOptions, options);

			var line = new Array();
			for(i in dataSet){
				var item = dataSet[i];
				
				newItem = this.convertCoords(item)
				line.push(newItem.x);
				line.push(newItem.y);
				var thisPoint = new Kinetic.Circle({

					x:newItem.x,
					y:newItem.y,
					radius:3,
					stroke: lineColor,
					strokeWidth: '2'
				})
				data.add(thisPoint);
			}

			var history = new Kinetic.Line({
      			points: line,
		        stroke: "#000",
		        strokeWidth: 2,
		        lineCap: 'round'

      		})
			data.add(history);
			stage.add(data);
			coordSystem.moveToTop();
		},
		plotColumns: function(dataSet, options){
			data = new Kinetic.Layer();
			var defaultOptions = {
				borderColor: "#000",
				fillColor: "#0f0",
				width: 10
			}
			var graphOptions = jQuery.extend({}, defaultOptions, options);

			for(i in dataSet){
				var thisItem = dataSet[i];
				var thisData = new Kinetic.Rect({
					x: this.convertXCoord(thisItem.x)-graphOptions.width/2,
					y: this.convertYCoord(thisItem.y),
					width: graphOptions.width,
					fill: graphOptions.fillColor,
					height: measurements.yDist*thisItem.y,
					stroke: graphOptions.borderColor,
					strokeWidth: 1

				})
				data.add(thisData);
				
				if(settings.showLabel){
					var label = new Kinetic.Text({
		      			x: this.convertXCoord(thisItem.x)-(graphOptions.width/2)-3,
		      			y: this.convertYCoord(thisItem.y)-18,
		      			text: thisItem.y,
		      			fontFamily: 'Georgia',
		      			fontSize: 14,
		      			fill: settings.textColor,
      				})
      				data.add(label);
      			}
			}
			stage.add(data);
			coordSystem.moveToTop();

		},
		plotPoint: function(pointCoords){
			newCoords = this.convertCoords(pointCoords);

			var thisBMI = new Kinetic.Circle({

				x:newCoords.x,
				y:newCoords.y,
				radius:3,
				stroke: '#000',
				strokeWidth: '2'


			})
			
			data.add(thisBMI);
			stage.add(data);
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

		coordSystem.add(xAxis);

      	for(var i = 1; i<=measurements.xPoints; i++){

      		xPos = 50+settings.xMin+measurements.xDist*i;
      		
			if(i%settings.xUpperScale == 0){
      			stroke = 2;
				var xScale = new Kinetic.Text({
	      			x: xPos+5,
	      			y: settings.height+30,
	      			text: i,
	      			fontFamily: 'Georgia',
	      			fontSize: 12,
	      			fill: settings.textColor,
	      			rotationDeg: 45

	      		})
	      		coordSystem.add(xScale);
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
      		coordSystem.add(xDash);

      		var label = new Kinetic.Text({
      			x: 350,
      			y: 470,

      			text: settings.xLabel,
      			fontFamily: 'Georgia',
	      			fontSize: 14,
	      			fill: settings.textColor,
	      			

      		})
      		coordSystem.add(label);
      	
      	}

	}

	function drawYAxis(){
		var yAxis = new Kinetic.Line({
	        points: [50, settings.height+30, 50, 10],
	        stroke: settings.lineColor,
	        strokeWidth: settings.lineWidth,
	        lineCap: 'round'

     	});
      	coordSystem.add(yAxis);


      	//
      	for(var i=1; i<=measurements.yPoints; i++){
      		
      		yPos = settings.height+20-(settings.yMin+measurements.yDist*i);
      		if(i%settings.yUpperScale == 0){
      			stroke = 2;
				var yScale = new Kinetic.Text({
	      			x: 20,
	      			y: yPos+6,
	      			text: i,
	      			align: "right",
	      			fontFamily: 'Georgia',
	      			fontSize: 12,
	      			fill: settings.textColor,
	      			rotationDeg: -45

	      		})
	      		coordSystem.add(yScale);


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
      		coordSystem.add(yDash);

      		var label = new Kinetic.Text({
      			x: 20,
      			y: 200,

      			text: settings.yLabel,
      			fontFamily: 'Georgia',
	      			fontSize: 12,
	      			fill: settings.textColor,
	      			rotationDeg: 90

      		})
      		coordSystem.add(label);
      	}
	}

	function plotLine(settings){

	}

})();