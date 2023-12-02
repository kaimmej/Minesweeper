class Minesweeper
{

	static get SIZE()  { return 15; }
	// 
	// 
	// 	PROPERTIES
	rows = 0
	columns = 0
	bombs = 0
	probability_chance = 0
	board = [] // cells is a 1d array where each element is another element. 
	bombsRemainingText
	activeGame = false
	timerObject

	
	// 
	// 
	// 	METHODS
    constructor(timer, rows = Minesweeper.SIZE, columns = Minesweeper.SIZE, probability_chance = 0.1)
    {
        // PLACE YOUR PROPERTIES BELOW
		this.timerObject = timer
		this.rows = rows
		this.columns = columns
		this.probability_chance = probability_chance
		// PLACE YOUR PROPERTIES ABOVE

		this.board = this.init_board()
		this.display_board()
    }
    
    init_board()
    {

		for(let i=0;i<this.columns;i++){
			const row = []
			for(let j=0; j<this.rows; j++){
				let xPos = i
				let yPos = j
				const newDOMElement = document.createElement("div") // we need an element to display onto the screen. So we create a "div" and pass this to the cell being created. 
				const newCell = new Cell(xPos, yPos, newDOMElement, this.probability_chance)
				row.push(newCell)
			}
			this.board.push(row)
		}

		// count the number of bombs that were created. Set bombs variable to the number that were randomly generated. 
		this.bombs = this.count_bombs()
		this.bombsRemainingText = document.querySelector("[bomb-count]")
		this.bombsRemainingText.textContent = this.bombs

		return this.board
	}
	display_board()
    {
		const boardDisplay = document.querySelector("#board")

		// we need to set the grid sizing of our board CSS to be consistent wtih the number of rows and columns.
		boardDisplay.style.setProperty("--WIDTH", this.columns)
		boardDisplay.style.setProperty("--HEIGHT", this.rows)

		// and then we add the 'DIV' element of each cell into the HTML of our main page. 
		this.board.forEach(row => {
			row.forEach(cell => {
				cell.DOMElement.addEventListener('click', () => {

					// when we click on a cell, we need to pass the board in too. The cell needs to calculate what is around it.
					// So that it can recursively open the cells that are around it if it is empty. 
					// if a cell opens and it returns a bomb string, we know that a bomb was just opened and we start the lost condition... 
					if(cell.openCell(this.board, this.activeGame) === 'bomb')
					{
						this.lose_gameOver()
					}
					this.check_for_win()
					// and everytime we open a time, we want to check whether the game is over (either clicked a bomb or the last tile was revealed.)

				})
				cell.DOMElement.addEventListener('contextmenu', e => {
					e.preventDefault()
					cell.flagCell(this.activeGame)
					this.bombs_remaining()
				})
				boardDisplay.append(cell.DOMElement)
			})
		})
	}
	
	unlock(){
		this.activeGame = true
	}

	// if we reset the game, we simple chance every block back to unopened... 
	reset(){
		this.board.forEach(row => {
			row.forEach(cell => {
				cell.status = 'unopened'
			})
		})

		// make sure the win/lose condition words are changed back to hidden
		const gameOverText = document.querySelector("[game_over]")
		gameOverText.textContent = ""

		// reset the timer
	}
	check_for_win()
	{
		// we check the current board state to see if we have won or lost.
		const win = this.win_condition(this.board)

		if(win) {
			this.activeGame = false
			const gameOverText = document.querySelector("[game_over]")
			gameOverText.textContent = "WIN"
			gameOverText.style.display = "block"

			// stop the timer
			this.timerObject.stopTimer()
		}
	}

	lose_gameOver(){
		this.activeGame = false
		const gameOverText = document.querySelector("[game_over]")
		gameOverText.textContent = "LOSE"
		gameOverText.style.color = 'red';
		gameOverText.style.display = "block"
		this.timerObject.stopTimer()
	}

	win_condition(board){
		// and then we add the 'DIV' element of each cell into the HTML of our main page. 
		this.board.forEach(row => {
			row.forEach(cell => {
				// check whether there are any cells that are still "empty" or "?". You cannot win if that is the case
				if(cell.status === 'unopened' || cell.status === '?'){
					return false
				}
				// check whether the current bomb total is 0 
				if(this.bombsRemainingText !== '0'){
					return false
				}
				// if both are true - you win! 
				return true
			})
		})
	}

	count_bombs(){
		let bomb_count = 0

		this.board.forEach(row => {
			row.forEach(cell => {
				if(cell.bomb){
					bomb_count ++
				}
			})
		})

		return bomb_count
	}

	bombs_remaining(){
		// we need to count the number of flagged cells, and reduce the bomb counter by that number 


		const flaggedCells = this.board.reduce((sum, row) => {
			return sum + row.filter(cell => cell.status === 'flagged').length
		}, 0)

		this.bombsRemainingText.textContent = this.bombs - flaggedCells
	}
}
