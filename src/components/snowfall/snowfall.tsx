import Snowflake from './snowflake';
import './snowfall.css';
import { v4 as uuidv4 } from 'uuid'

const Snowfall = () => {
  const arr:number[] = [];
  for (let i = 0; i < 90; i++){
    arr.push(i);
  }
  const snow = () => {
    let animationDelay = '0s'
    let fontSize = '100px'
    return arr.map((_, i) => {
      animationDelay = `${(Math.random() * 16).toFixed(2)}s`
      fontSize = `${Math.floor(Math.random() * 10) + 10}px`
      let style = {
        animationDelay,
        fontSize,
      }
      return <Snowflake key={uuidv4()} id={i} style={style} />
    })
  }
  return (
    <div className='w-[45%] fixed top-0 text-center'>
      {snow()}
    </div>
  )
}

export default Snowfall