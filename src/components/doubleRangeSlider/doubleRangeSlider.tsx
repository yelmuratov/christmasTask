import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react'
import './doubleRangeSlider.css'
import { useAppDispatch } from '../helpers';
import { MultiRangeSliderProps } from '../../constants/types/types';
import { filterData, setSliderFilter } from '../../reducer/mainSlice/mainSlice';

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({ min, max, type,step }) => {
  const dispatch = useAppDispatch();
  const [minVal, setMinVal] = useState(min)
  const [maxVal, setMaxVal] = useState(max)
  const minValRef = useRef(min)
  const maxValRef = useRef(max)
  const range = useRef<HTMLDivElement>(null)

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  )

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current)

    if (range.current) {
      range.current.style.left = `${minPercent}%`
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [minVal, getPercent])

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current)
    const maxPercent = getPercent(maxVal)

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [maxVal, getPercent])

  if (type === 'year') {
    useEffect(() => {
      dispatch(
        setSliderFilter({ values: { min: minVal, max: maxVal }, type })
      )
    }, [minVal, maxVal])
  } else if (type === 'count') {
     useEffect(() => {
       dispatch(setSliderFilter({ values: { min: minVal, max: maxVal }, type }))
     }, [minVal, maxVal])
  }

  useEffect(() => {
    dispatch(filterData())
  }, [minVal, maxVal])

  return (
    <>
      <input
        type='range'
        min={min}
        max={max}
        value={minVal}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = Math.min(Number(event.target.value), maxVal)
          setMinVal(value)
          minValRef.current = value
        }}
        step={step}
        className={`thumb thumb--left ${
          minVal > max - 100 ? 'thumb--zindex-5' : ''
        }`}
      />
      <input
        type='range'
        min={min}
        max={max}
        value={maxVal}
        step={step}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = Math.max(Number(event.target.value), minVal)
          setMaxVal(value)
          maxValRef.current = value
        }}
        className='thumb thumb--right'
      />

      <div className='slider'>
        <div className='slider__track'></div>
        <div ref={range} className='slider__range'></div>
        <div className='slider__left-value border border-[#278D9F]'>
          {minVal}
        </div>
        <div className='slider__right-value border border-[#278D9F]'>
          {maxVal}
        </div>
      </div>
    </>
  )
}

export default MultiRangeSlider
