import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../helpers';


const Header = () => {
  const navigate = useNavigate();
  const selectedToys = useAppSelector(state => state.selectedToys);
  return (
    <>
      <nav className=' flex items-center justify-between'>
        <ul className='flex items-center'>
          <li
            className='home tree bg-contain bg-no-repeat h-14 cursor-pointer'
            style={{ backgroundImage: "url('assets/svg/tree.svg')" }}
            onClick={() => navigate('/')}
          >
            <NavLink to='/' className='tree mx-7'></NavLink>
          </li>
          <li className='toys relative'>
            <NavLink
              to='Toys'
              className='text-gray-50 mx-7 text-2xl uppercase hover:text-[#278D9F] nav-item'
            >
              Игрушки
            </NavLink>
          </li>
          <li className='christmasTree relative'>
            <NavLink
              to='christmasTree'
              className='text-gray-50 mx-7 text-2xl uppercase hover:text-[#278D9F] nav-item'
            >
              Ёлка
            </NavLink>
          </li>
        </ul>
        <div className='flex items-center gap-7 relative'>
          <input
            type='text'
            id='full-name'
            name='full-name'
            className='w-[400px] bg-[#16363B]  text-[#fff] font-mono h-9 rounded-2xl border border-[aqua]  outline-none py-1 px-3 '
          />
          <i className='fa-solid fa-magnifying-glass text-[#fff] text-2xl absolute right-24'></i>
          <div
            style={{
              background: "url('assets/svg/ball-2.svg')",
              backgroundSize: '48px 60px',
              backgroundPosition: 'left -8px',
              backgroundRepeat: 'no-repeat',
            }}
            className='w-[48px] h-[60px] bg-no-repeat flex items-center'
          >
            <span
              className='text-gray-50 text-xl min-w-[40px] h-[40px] rounded-full text-center pt-1 ml-1'
              style={{ backgroundColor: '#278D9F' }}
            >
              {selectedToys.length}
            </span>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header