<!DOCTYPE html>
<html lang="en">
	<head>
		<link rel="shortcut icon" href="/img/favicon.ico" />

		<title>BMI calculator</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<!-- Bootstrap -->
		<link href="css/bootstrap.min.css" rel="stylesheet" media="screen">

	</head>
	<body>
		<div class="row">
			<div class="span3 offset1">
				<h2>BMI-Calculator</h2>
			</div>
		</div>
		<div class="row">
			<div class="span3 offset1">
				
				<form id="calc_BMI">
					<fieldset>
						<h3>Calculate BMI</h3>

						<label for="height">Your height:</label>
						<input type="text" id="height" placeholder="Centimeters"/>
						<label for="weight">Your weight:</label>
						<input type="text" id="weight" placeholder="Kilograms"/>
						<br />
						<input type="submit" class="btn btn-primary" value="Calculate" />

					</fieldset>

				</form>
				<div id="resultDiv" style="display:none;">
					<h3>Result:</h3>

					<p>
						Your BMI is <span class="resultField" id="bmiField"></span><br />
						This puts you in the category <br />"<span class="resultField" id="catField"></span>""
					</p>

					<p>
						Your ideal upper weight: <span class="resultField" id="upperWeight"></span><br />
						Your ideal lower weight: <span class="resultField" id="lowerWeight"></span>

					</p>
				</div>
			</div>
			<div class="offset1 span7">
				<h3>Your Ideal Weight:</h3>
				<div id="graphContainer" style="border: 1px solid #aaa;height:500px;width:800px;"></div>
  
			</div>
		</div>
		
	</body>
	<script src="http://code.jquery.com/jquery.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="http://d3lp1msu2r81bx.cloudfront.net/kjs/js/lib/kinetic-v4.4.3.min.js"></script>
  	<script src="js/gGraph.js" ></script>
  	<script src="js/BMIGraph.js"></script>

	<script type="text/javascript">
		var height;
		var weight;
		var BMI;


		//Initialiser Stage
		var stage = new Kinetic.Stage({
	        container: 'graphContainer',
	        width: 790,
	        height: 500
	      });

      var layer = new Kinetic.Layer();
      
      	//Tegn grafen

      	gGraph.init({
			xMax: 110, 
			yMax:50,
		});

      	BMIGraph.init();

		gGraph.drawGraph();
		BMIGraph.plotIntervals();


		$('document').ready(function(){
			
			$('#calc_BMI').on('submit', function(e){

				e.preventDefault();
				
				height = $('#height').val()/100;
				weight = $('#weight').val();
				weight = weight.replace(",",".");
				BMI = (weight/Math.pow(height,2));
				
				BMI = gGraph.round(BMI, 2);
					
				if(BMI<15)
					cat = "Very severely underweight";
				if(BMI>=15 && BMI <16)
					cat = "Severely underweight";
				if(BMI>=16 && BMI < 18.5)
					cat = "Underweight";
				if(BMI>=18.5 && BMI < 25)
					cat = "Normal (healthy weight)";
				if(BMI>=25 && BMI < 30)
					cat = "Overweight";
				if(BMI>=30 && BMI < 35)
					cat = "Moderately obese";
				if(BMI>=35 && BMI < 40)
					cat = "Severely obese";
				if(BMI > 40)
					cat = "Very severely obese";

				
				
				var idealUpperWeight = gGraph.round(25*Math.pow(height, 2),1);
				var idealLowerWeight = gGraph.round(18.5*Math.pow(height,2),1);

				
				

				$('#bmiField').text(BMI);
				$('#catField').text(cat);

				$('#lowerWeight').text(idealLowerWeight);
				$('#upperWeight').text(idealUpperWeight);
				$('#resultDiv').fadeIn();
				var BMICoords = gGraph.convertCoords({x:weight, y:gGraph.round(BMI, 1)})

				var thisBMI = new Kinetic.Circle({

					x:BMICoords.x,
					y:BMICoords.y,
					radius:5,
					stroke: '#000',
					strokeWidth: '2'


				})
				layer.add(thisBMI);
				stage.add(layer);



				BMIGraph.plotBMI(height);

				return false;

			})



		})



	</script>

</html>

