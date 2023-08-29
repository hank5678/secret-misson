import { useState, useEffect } from 'react'

const getRandomColor = () => {
  const colorCode = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
  return `#${new Array(6).fill("").map(() => (colorCode[Math.floor(Math.random()*(colorCode.length-1))])).join("")}`
}

function Home() {
  const [color, setColor] = useState("")
  const [answers, setAnswers] = useState([])
  const [userSelected, setUserSelected] = useState("")
  
  const setupQuestion = () => {
    const randomColor = getRandomColor()
    setColor(randomColor)
    
    setAnswers([{
      color: randomColor,
      fail: false
    }, {
      color: getRandomColor(),
      fail: false
    }, {
      color: getRandomColor(),
      fail: false
    }].sort(() => Math.random() - 0.5))
    setUserSelected("")
  }

  const onAnswersClick = (answer) => {
    setUserSelected(answer)
  }

  useEffect(() => {
    if( userSelected !== "" ) {
      if( userSelected === color ) {
        setupQuestion()
      } else {
        setAnswers((answers) => (answers.map((ans) => (ans.color === userSelected ? {...ans, fail: true} : ans))))
      }
    }
  }, [userSelected, color])

  useEffect(() => {
    setupQuestion()
  }, [])

  return (
    <>
      <div className="w-full h-full fixed top-0 left-0" style={{backgroundColor: color}} />
      <div className="flex w-full h-screen relative items-center justify-center">
        <div>
          {answers.map((answer) => (
            <button className="bg-white w-32 h-12 mx-2 rounded-md shadow-lg text-xl text-neutral-800 border border-neutral-100 relative" key={answer} onClick={onAnswersClick.bind(this, answer.color)}>{answer.fail ? "❌" : answer.color}</button>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
