import {useNavigate} from 'react-router-dom';

const Starter = () => {
  const navigate = useNavigate();

  const navigateToToys = () => {
    navigate('Toys');
  }
  return (
    <>
      <div className="ball ball1"></div>
      <div className="ball ball2"></div>
      <div className='absolute left-[500px] top-[300px] text-center'>
        <h1 className='backdropFilter text-gray-50 text-5xl w-[600px] h-[250px] flex items-center justify-center border-2 rounded-3xl border-[aqua] text-center leading-normal font-medium'>
          Новогодняя игра <br /> «Наряди ёлку»
        </h1>
        <button className='startBtn backdropFilter text-[#fff] text-4xl border-4 border-[#278D9F] mt-[80px] w-[320px] py-2 rounded-3xl' onClick={navigateToToys}>
          Начать
        </button>
      </div>
    </>
  )
}

export default Starter