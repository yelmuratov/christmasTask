import queryString from 'query-string';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { colors, shapes, sizes } from '../../constants/enums/enums';
import { useAppDispatch } from '../../store';
import { ChangeEvent, useEffect, useState } from 'react';
import { filterData, selectSort, setClearFilter, setFavourite, setFilters, setSelectSort, setSelectedToys} from '../../reducer/mainSlice/mainSlice';
import { useAppSelector } from '../../components/helpers';
import MultiRangeSlider from '../../components/doubleRangeSlider/doubleRangeSlider';

const Toys = () => {
  const { search } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const state = useAppSelector(data => data);
  const items = state.data; 
  
  const onHandleFilter = (item: string, type: string) => {
    let existingParams = searchParams.get(type)?.split(',') || [];

    if (!existingParams.includes(item)) {
      existingParams.push(item);
    } else {
      existingParams = existingParams.filter((param) => param !== item);
    }

    const newSearch = {
      ...queryString.parse(search),
      [type]: existingParams.join(','),
    };
    searchParams.delete(type);

    navigate({ search: queryString.stringify(newSearch) });
  };

  const shapeFilter = () => {
    let arr = searchParams.get('shape')?.split(',').filter(shape => shape.trim().length > 0)||[];
    dispatch(setFilters({ filters: arr, type: 'filtershapes' }));
  }

  useEffect(() => {
    shapeFilter()
  }, [searchParams.get('shape')]);

  const colorFilter = () => {
    let arr =
      searchParams
        .get('color')
        ?.split(',')
        .filter((color) => color.trim().length > 0) || []
    dispatch(setFilters({ filters: arr, type: 'filterColors' }))
  }

  useEffect(() => {
    colorFilter()
  }, [searchParams.get('color')])

  const sizeFilter = () => {
    let arr = searchParams.get('size')?.split(',').filter((size) => size.trim().length > 0) || [];
    dispatch(setFilters({ filters: arr, type: 'filterSizes' }));
  }
  
  useEffect(() => {
    sizeFilter()
  }, [searchParams.get('size')]);

  useEffect(() => {
    dispatch(filterData())
  }, [
    searchParams.get('shape'),
    searchParams.get('color'),
    searchParams.get('size'),
  ])

  const onHandleFavourite = () => {
    dispatch(setFavourite());
    dispatch(filterData());
  }

  const onHandleSelect = (event: ChangeEvent<HTMLSelectElement>)=>{
    const target = event.target;
    dispatch(setSelectSort(target.value));
    dispatch(selectSort());
  }

  const [favoriteToys, setFavouriteToys] = useState<number[]>((JSON.parse(localStorage.getItem('favouriteToys') as string)||[])
  )
  
  useEffect(() => {
    localStorage.setItem('favouriteToys', JSON.stringify(favoriteToys));
    dispatch(setSelectedToys(favoriteToys));
  }, [favoriteToys]);

  const onHandleActive = (number:number) => {
    if (favoriteToys.includes(number)) {
      setFavouriteToys(prev => prev.filter(item => item != number));
    } else {
      setFavouriteToys((prev) => [...prev, number]);
    }
  }

  const onHandleClear = () => {
    navigate('/toys');
    dispatch(setClearFilter());
  }
  
  return (
    <>
      <div className='filter flex gap-8 px-8 mt-3 mb-8'>
        {/* Filter */}
        <div className='w-1/3 filterCard rounded h-[300px]'>
          <h1 className='select-none text-[#fff] uppercase font-medium text-2xl mt-6 ml-5'>
            ФИЛЬТРЫ ПО ЗНАЧЕНИЮ
          </h1>
          {/* shapes */}
          <div className='text-[#fff] text-xl ml-5 mt-4 font-medium flex items-center gap-3'>
            Форма:
            {shapes.map((shape) => (
              <button
                key={uuidv4()}
                onClick={() => onHandleFilter(shape.shape, 'shape')}
                className={`${
                  state.filtershapes.includes(shape.shape) ? 'shapeActive' : ''
                }`}
              >
                <img
                  src={shape.src}
                  alt='shapeImg'
                  className={`w-[40px] h-[40px]`}
                />
              </button>
            ))}
          </div>
          {/* colors */}
          <div className='colors text-[#fff] text-xl ml-5 mt-5 font-medium flex items-center gap-5'>
            Цвет:
            {Object.keys(colors).map((color: string) => (
              <span
                className={`${color} color ${
                  state.filterColors.includes((colors as any)[color])
                    ? 'active'
                    : ''
                } w-[30px] h-[30px] rounded border border-[aqua] cursor-pointer relative select-none`}
                key={uuidv4()}
                onClick={() => onHandleFilter((colors as any)[color], 'color')}
              ></span>
            ))}
          </div>
          {/* sizes */}
          <div className='sizes text-[#fff] text-xl ml-5 mt-4 font-medium flex items-center gap-5'>
            Размер:
            {sizes.map((size) => (
              <span
                className={`${
                  state.filterSizes.includes(size) ? 'shapeActive' : ''
                } w-[50px] h-[50px] bg-contain cursor-pointer  select-none`}
                style={{ backgroundImage: "url('assets/svg/ball.svg')" }}
                key={uuidv4()}
                onClick={() => onHandleFilter(size, 'size')}
              ></span>
            ))}
          </div>
          {/* Favourite */}
          <div className='text-[#fff] text-xl ml-5 mt-5 font-medium flex items-center gap-5'>
            Только любимые :{' '}
            <span
              className={`checkbox ${
                state.favouriteToys ? 'active' : ''
              } w-[30px] h-[30px] border border-[aqua] rounded cursor-pointer relative`}
              onClick={onHandleFavourite}
            ></span>
          </div>
        </div>
        {/* Filter */}
        <div className='w-1/3 filterCard rounded h-[300px] realative'>
          <h1 className='select-none text-[#fff] uppercase font-medium text-2xl mt-6 ml-5'>
            ФИЛЬТРЫ ПО ДИАПАЗОНУ
            <div className='absolute top-32 ml-[112px]  '>
              <MultiRangeSlider min={1} max={12} type='count' step={1} />
            </div>
          </h1>
          <p className='select-none text-[#fff] uppercase font-medium text-[16px] mt-6 ml-5'>
            Количество экземпляров:
          </p>
          <div className='absolute right-[130px] top-[140px]'></div>
          <p className='select-none text-[#fff] uppercase font-medium text-[16px] mt-6 ml-5 absolute top-[180px]  '>
            Год приобретения:
          </p>
          <div className='absolute right-[130px] top-[240px]'>
            <MultiRangeSlider min={1940} max={2020} type='year' step={10} />
          </div>
        </div>
        {/* Sorting */}
        <div className='w-1/3 filterCard rounded h-[300px]'>
          <h1 className='select-none text-[#fff] uppercase font-medium text-2xl mt-6 ml-5'>
            СОРТИРОВКА
            <select
              id='inputLanguage'
              className={`bg-[rgba(0,0,0,0.15)] mt-4 border border-[aqua] text-xl rounded-3xl block p-2.5 cursor-pointer transition-bg duration-1000 transition-color-1000 font-mono`}
              onChange={onHandleSelect}
            >
              <option className='font-mono' value={'StartToEnd'}>
                По названию от «А» до «Я»
              </option>
              <option className='font-mono' value={'EndToStart'}>
                По названию от «Я» до «А»
              </option>
              <option className='font-mono' value={'orderToIncrease'}>
                По количеству по возрастанию
              </option>
              <option className='font-mono' value={'orderToDecrease'}>
                По количеству по убыванию
              </option>
            </select>
            <button
              className='border border-[aqua] rounded-3xl px-8 py-1 font-medium mt-[120px]'
              onClick={onHandleClear}>
              Сброс фильтров
            </button>
          </h1>
        </div>
      </div>
      {/* Toys */}
      <div>
        <div className='grid grid-cols-5 max-w-[1600px] w-full gap-[20px] my-0 mx-auto pb-8'>
          {items.map((item) => (
            <div
              className={`${favoriteToys.includes(+item.num)?'active':''} w-[304px] relative h-[280px] filterCard border border-[aqua] rounded-xl card 
              select-none cursor-pointer`}
              key={uuidv4()}
              onClick={() => onHandleActive(+item.num)}
            >
              <h1 className='text-[#fff] text-[22px] font-medium mt-2 ml-4'>
                {item.name}
              </h1>
              <img
                src={`assets/toys/${item.num}.png`}
                alt='toyImg'
                className='w-[90px] h-[90px] mt-8 ml-6 inline'
              />
              {/* cardDescription */}
              <div className='inline absolute top-[50px] right-[15px] text-xl text-[#fff] leading-normal'>
                <div className='count'>
                  Количество: <span>{item.count}</span>
                </div>
                <div className='year'>
                  Год покупки: <span>{item.year}</span>
                </div>
                <div className='shape'>
                  Форма: <span>{item.shape}</span>
                </div>
                <div className='color'>
                  Цвет:<span>{item.color}</span>
                </div>
                <div className='size'>
                  Размер: <span>{item.size}</span>
                </div>
                <div className='favourite'>
                  Любимая: <span>{item.favorite ? 'да' : 'нет'}</span>
                </div>
              </div>
              <div className='ribbon'></div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
};

export default Toys;
