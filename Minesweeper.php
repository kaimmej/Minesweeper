

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Minesweeper</title>

		<script type="text/javascript" src="./function.js"></script>
		<script type="text/javascript" src="./class_minesweeper.js"></script>
		<script type="text/javascript" src="./class_cell.js"></script>
		<script type="text/javascript" src="./class_timer.js"></script>
		<link rel="stylesheet" href="styles.css">
	</head>
	
	
	<body>

		<div class="heading-container-flexbox">
			<button id="start">Start</button>

			<div class = "subheading-container-flexbox">
				<div class="counter-text">
					Bombs Remaining: <span bomb-count>0</span>
				</div>
				<div class="timer-display">
					<span time-count> </span>
				</div>
			</div>
		</div>


		<div class="board-container-flexbox">
			<span id="game_over" game_over> </span>
			<div id="board"></div>
		</div>
		

		<script>
		// START UP
		document.addEventListener('DOMContentLoaded', ()=> {
			// create the board 
			const timer = new Timer();
			const game = new Minesweeper(timer);

			let startButton = document.querySelector('#start');
			startButton.onclick = () => {
				
				// create a new timer and start it.
				
				timer.startTimer();

				// unlock all buttons on the page.
				game.unlock();

				// change the text of the start button to "reset"
				startButton.innerHTML = "reset";

				// the start/reset button now needs to restart the game (but not generate new bombs everywhere)
				game.reset();

		}


	})
		</script>


		
	</body>
</html>