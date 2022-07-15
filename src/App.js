import { useEffect, useState } from 'react'

const width = 8
const candyColors = [
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'yellow'
]

const App = () => {
const [currentColorArrangment, setCurrentColorArrangment] = useState([]) 
const [squareBeingDragged, setSquareBeingDragged] = useState(null)
const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
const cheakForColumsOfFour = () => {
  for (let i = 0; i <= 39; i++) {
    const colummOfFour = [i, i + width, i + width * 2, i + width * 3]
    const decidecColor = currentColorArrangment[i]

    if (colummOfFour.every(square => currentColorArrangment[square] === decidecColor)) {
      colummOfFour.forEach(square => currentColorArrangment[square] = '')

    }
  }
}  

const cheakForColumsOfThree = () => {
  for (let i = 0; i <= 47; i++) {
    const colummOfThree = [i, i + width, i + width * 2]
    const decidecColor = currentColorArrangment[i]

    if (colummOfThree.every(square => currentColorArrangment[square] === decidecColor)) {
      colummOfThree.forEach(square => currentColorArrangment[square] = '')

    }
  }
}  

const cheakForRowOfFour = () => {
  for (let i = 0; i < 64; i++) {
    const rowOfFour = [i, i + 1, i + 2, i +3]
    const decidecColor = currentColorArrangment[i]
    const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 61, 62, 63]

    if (notValid.includes(i)) continue

    if (rowOfFour.every(square => currentColorArrangment[square] === decidecColor)) {
      rowOfFour.forEach(square => currentColorArrangment[square] = '')

    }
  }
}  
const cheakForRowOfThree = () => {
  for (let i = 0; i < 64; i++) {
    const rowOfThree = [i, i + 1, i + 2]
    const decidecColor = currentColorArrangment[i]
    const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63]

    if (notValid.includes(i)) continue

    if (rowOfThree.every(square => currentColorArrangment[square] === decidecColor)) {
      rowOfThree.forEach(square => currentColorArrangment[square] = '')

    }
  }
}  

const moveIntoSquareBelow = () => {
  for (let i = 0; i <= 55; i++ ) {
    const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
    const isFirstRow = firstRow.includes(i)

    if (isFirstRow && currentColorArrangment[i] === '') {
      let randomNumber = Math.floor(Math.random() * candyColors.length)
      currentColorArrangment[i] = candyColors[randomNumber]
    }
 
    if ((currentColorArrangment[i + width]) === '') {
      currentColorArrangment[i + width] = currentColorArrangment[i]
      currentColorArrangment[i] = ''

    }
  }
}

const dragStart = (e) => {
  setSquareBeingDragged(e.target)
}
const dragDrop = (e) => {
  setSquareBeingReplaced(e.target)
}
const dragEnd = () => {
  const squareBeingReplacedID = parseInt(squareBeingReplaced.getAttribute('data-id'))
  const squareBeingDraggedID = parseInt(squareBeingDragged.getAttribute('data-id'))
  console.log(squareBeingDraggedID, "dragged")
  console.log(squareBeingReplacedID, "replaced")
}

const createBoard = () => {
    const randomColorArrangement = []
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArrangement.push(randomColor)
    }
    setCurrentColorArrangment(randomColorArrangement)
  }

  useEffect(() => {
    createBoard()
   }, [])

   useEffect(() => {
    const timer = setInterval(() => {
      cheakForColumsOfFour()
      cheakForColumsOfThree()
      cheakForRowOfFour()
      cheakForRowOfThree()
      moveIntoSquareBelow()
      setCurrentColorArrangment([...currentColorArrangment])
    }, 100)
    return () => clearInterval(timer)

   }, [cheakForColumsOfFour, cheakForColumsOfThree, cheakForRowOfFour, cheakForRowOfThree, moveIntoSquareBelow, currentColorArrangment])


  return (
    <div className="app">
      <div className="game">
        {currentColorArrangment.map((candyColor, index) => (
          <img
          key={index}
          style={{backgroundColor: candyColor}}
          alt={candyColor}
          data-id={index}
          draggable={true}
          onDragStart={dragStart}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
          onDragLeave={(e) => e.preventDefault()}
          onDrop={dragDrop}
          onDragEnd={dragEnd}

          />
        ))}

      </div>
    </div>
  );
}


export default App;
