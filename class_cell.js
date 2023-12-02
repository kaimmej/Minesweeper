class Cell{

	// These are hte possible status's the cell can have 
	// CELL STATUS {
	// 		'unopened',
	// 		'bomb',
	// 		'flagged',
	// 		'empty'
	// 	} 

    // 
	// 
	// 	PROPERTIES

	xPos		// (int) the x position of this cell in the boardspace
	yPos		// (int) the y position of this cell in the boardspace
	DOMElement	// (object) the DOM object that represents this cell to the html webpage
	bomb		// (boolean) whether or not this cell contains a bomb


    // 
	// 
	// 	METHODS
	constructor(xPos, yPos, DOMElement, chanceOfBomb)
    {
		this.xPos = xPos
		this.yPos = yPos
		this.DOMElement = DOMElement  // we manipulate the dom element attached to each cell in order to faciliate displaying it to the screen. 
		DOMElement.dataset.status = 'unopened'

		this.bomb = this.rand_setBomb(chanceOfBomb)
	
		// if(this.bomb){
		// 	console.log(this.xPos + " : " + this.yPos + " BOMB:"+ this.bomb)
		// }
    }

	get status() {
		return this.DOMElement.dataset.status
	}


	set status(value) {
		this.DOMElement.dataset.status = value
	}

	
	get bomb() {
		return this.bomb
	}

	// opens itself. 
	// the game must be active
	// the cell must be either unopened or a question-mark to be eligable to be opened
	openCell(board, gameStatus){

		if(gameStatus === true && (this.status === 'unopened' || this.status === '?')){
			if(this.bomb){
				this.status = 'bomb'
				return 'bomb'
			} 

		// if the tile was not a bomb.. we need to figure out how bombs are next to this tile. 
		const adjacentCells = this.neighboringCells(board)

		// and now we need to figure out if there are bombs next to this cell.. 
		// so we want to search through the adjacentCells array and see if any are mines. 
		// we will use Array.prototype.filer in order to only return the array elements that are bombs
		const bombs = adjacentCells.filter(c => c.bomb)
		const num_adjacentBombs = bombs.length

		// if(num_adjacentBombs === 0){
		// 	// if this cell is empty, we want to recursivley call the openCell function on all the adjacent neighbors
		// 	this.status = 'empty'
		// 	adjacentCells.forEach(cell => cell.openCell(board))
		// 	return
		// } 
		switch(num_adjacentBombs) {
			case 0:
				this.status = 'empty'
				adjacentCells.forEach(cell => cell.openCell(board, gameStatus))
				return
			case 1:
				this.status = '1'
				return
			case 2:
				this.status = '2'
				return
			case 3:
				this.status = '3'
				return
			case 4:
				this.status = '4'
				return
			case 5:
				this.status = '5'
				return
			case 6:
				this.status = '6'
				return
			case 7:
				this.status = '7'
				return
			case 8:
				this.status = '8'
				return

		}

		}
	}
	flagCell(gameStatus){

		if(gameStatus === true && (this.status === 'unopened' || this.status === 'flagged'|| this.status === '?')){ 

			// otherwise we need to set the status to flagged. 
			if(this.status === 'unopened'){
				this.status = 'flagged'
				return
			}

			// if the cell is already flagged, we want to unflag it. 
			if(this.status === 'flagged'){
				this.status = '?'
				return
			}

			// or if its a ? we want to make it a flag again...
			if(this.status === '?'){
				this.status = 'flagged'
			}
		} 
	}

	rand_setBomb(chanceOfBomb) {
		let randomNumber = Math.floor(Math.random()*100) // generates a random integer between 0-100
		let bombThreashold = Math.floor(chanceOfBomb*100)

		return(randomNumber < bombThreashold)
	}


	neighboringCells(board){
		const neighbors = []

		// we need to get the cells within 1 of this cell. 
		for(let x=-1; x<=1 ; x++){
			for(let y=-1 ; y<=1 ; y++){
				// we need to grab the cell that is at the the designated position and add it to the neighbors array
				// .? is optional chaining syntax
				const cell = board[this.xPos + x]?.[this.yPos + y] // means if there is an element available, then grab the y element.
				if(cell) {neighbors.push(cell)}
			}
		}


		return neighbors
	}
}