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

  const createBoard = () => {
    const randomColorArrangement = []
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArrangement.push(randomColor)
    }
  console.log(randomColorArrangement)
  }

createBoard()

  return (
    <div>
      <h1>nbnbnbnbnbnbnb!</h1>
    </div>
  );
}


export default App;
