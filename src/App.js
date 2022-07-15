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
const cheakForColumsOfThree = () => {
  for (let i = 0; i < 47; i++) {
    const colummOfThree = [i, i + width, i + width * 2]
    const decidecColor = currentColorArrangment[i]

    if (colummOfThree.every(square => currentColorArrangment[square] === decidecColor)) {
      colummOfThree.forEach(square => currentColorArrangment[square] = '')

    }
  }
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
      cheakForColumsOfThree()
      setCurrentColorArrangment([...currentColorArrangment])
    }, 100)
    return () => clearInterval(timer)

   }, [cheakForColumsOfThree, currentColorArrangment])


  return (
    <div className="app">
      <div className="game">
        {currentColorArrangment.map((candyColor, index) => (
          <img
          key={index}
          style={{backgroundColor: candyColor}}
          alt={candyColor}

          />
        ))}

      </div>
    </div>
  );
}


export default App;
