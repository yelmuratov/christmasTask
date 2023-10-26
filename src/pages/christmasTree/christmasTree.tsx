import { useState,useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '../../components/helpers';
import data from '../../data/data';
import Snowfall from '../../components/snowfall/snowfall';
import { useAppDispatch } from '../../store';
import { setAudioPlaying, setIsSnowing } from '../../reducer/mainSlice/mainSlice';

const ChristmasTree = () => {
  const trees: number[] = []
  const dispatch = useAppDispatch();
  for (let i = 1; i < 7; i++) {
    trees.push(i)
  }
  const backgrounds: number[] = [];
  for (let i = 1; i < 11; i++){
    backgrounds.push(i);
  }

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlaying = useAppSelector(state => state.isAudioPlaying);
  const isSnowing = useAppSelector(state => state.isSnowing);

  if (audioRef.current) {
    if (isPlaying) { 
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }

  const onHandleAudio = () => {
    audioRef.current && (audioRef.current.currentTime = 0)
    dispatch(setAudioPlaying());
  }

  const onHandleSnowing = () => {
    dispatch(setIsSnowing());
  }
  

  const [selectedBg, setSelectedBg] = useState<number>(backgrounds[0]);
  const [selectedTree, setSelectedTree] = useState<number>(trees[0]);
  const [garland, setGarland] = useState<boolean>(false);
  const selectedToys = useAppSelector(state => state.selectedToys);
  const toysStore: number[] = [];
  for (let i = 1; i < 21; i++){
    toysStore.push(i);
  }
  
  return (
    <div className='bg-blur px-14 grid-container grid overflow-hidden'>
      <div className='h-[91vh]'>
        <div className='effects flex my-[40px]'>
          <audio src='assets/audio/audio.mp3' ref={audioRef}></audio>
          <img
            src='assets/icons/noun_Speaker_248990 1.png'
            alt='sound'
            className={`audio ${
              isPlaying ? 'active' : ''
            } cursor-pointer mr-[40px]`}
            onClick={onHandleAudio}
          />
          <img
            src='assets/icons/noun_Snowflake_4336155 1.png'
            alt='snowflake'
            className={`snow ${isSnowing ? 'active' : ''} cursor-pointer`}
            onClick={onHandleSnowing}
          />
        </div>
        <div className='trees'>
          <p className='text-[white] font-normal text-2xl uppercase'>
            Выберите ёлку
          </p>
          <div className='trees w-[380px] grid grid-cols-3 mt-4'>
            {trees.map((item) => (
              <div
                className='christmastree w-[115px] h-[115px] p-6 rounded-xl bg-[#ffffff80] flex items-center mb-4 cursor-pointer'
                key={uuidv4()}
                onClick={() => setSelectedTree(item)}
              >
                <img
                  src={`assets/tree/${item}.png`}
                  alt='christMasTree'
                  className='w-[100px]'
                />
              </div>
            ))}
          </div>
        </div>
        <p className='text-[white] font-normal text-2xl uppercase'>
          Выберите фон
        </p>
        <div className='backgrounds grid grid-cols-5 w-[405px] mt-5'>
          {backgrounds.map((item) => (
            <div
              className='background w-[65px] h-[65px] mb-3 rounded-xl overflow-hidden border cursor-pointer'
              key={uuidv4()}
              onClick={() => setSelectedBg(item)}
            >
              <img
                src={`assets/bg/${item}.jpg`}
                alt='bg'
                className='w-full h-full'
              />
            </div>
          ))}
        </div>
        <div className='garland'>
          <p className='text-[white] font-normal text-2xl mt-2 mb-4 uppercase'>
            Гирлянда
          </p>
          <div className='garlands'>
            <button className='first garland'></button>
            <button className='second garland'></button>
            <button className='third garland'></button>
            <button className='fourth garland'></button>
            <button className='fiveth garland'></button>
            <button
              className={`${
                garland ? 'active' : ''
              } switch overflow-hidden text-[#666] rounded-2xl bg-[#EEEEEE] ml-4 text-[16px] w-[90px] h-[35px] text-xl relative`}
              onClick={() => setGarland((prev) => !prev)}
            >
              Выкл
            </button>
          </div>
        </div>
      </div>
      <div
        className='h-[91vh] bg-cover bg-no-repeat flex items-center justify-center'
        style={{ backgroundImage: `url(assets/bg/${selectedBg}.jpg)` }}
      >
        {isSnowing ? <Snowfall /> : null}
        <img src={`assets/tree/${selectedTree}.png`} alt='treeImg' />
      </div>
      <div className='h-[91vh]'>
        <p className='text-[white] font-normal text-2xl mt-8 ml-8 uppercase'>
          Игрушки
        </p>
        <div className='toys grid grid-cols-4 ml-7 mt-7'>
          {(selectedToys.length > 0 ? selectedToys : toysStore).map((toy) => (
            <div
              className='toy relative christmastree w-[84px] h-[84px] p-4 rounded-xl bg-[#ffffff80] flex items-center mb-4 cursor-pointer'
              key={uuidv4()}
            >
              <img src={`assets/toys/${toy}.png`} alt='toy' />
              <span className='amount text-[#fff] font-medium absolute right-[6px] bottom-0 z-[100]'>
                {data[toy - 1].count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChristmasTree
