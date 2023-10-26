import { createSlice } from '@reduxjs/toolkit'
import data from '../../data/data'
import { Idata } from '../../constants/types/types';

// Define a type for the state
interface MainState {
  data: Idata[]
  filtershapes: string[]
  filterColors: string[]
  filterSizes: string[]
  favouriteToys: boolean
  year: { min: number; max: number }
  count: { min: number; max: number }
  sortValue: string
  clearFilter: boolean
  selectedToys: number[]
  isAudioPlaying: boolean
  isSnowing:boolean
}

const initialState: MainState = {
  data: data,
  filtershapes: [],
  filterColors: [],
  filterSizes: [],
  favouriteToys: false,
  year: { min: 1940, max: 2020 },
  count: { min: 1, max: 12 },
  sortValue: '',
  clearFilter: false,
  selectedToys: [],
  isAudioPlaying: false,
  isSnowing:false
  }

const mainslice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
    setFilters: (
      state,
      action: {
        payload: {
          filters: string[]
          type: 'filtershapes' | 'filterColors' | 'filterSizes'
        }
      }
    ) => {
      state[action.payload.type] = action.payload.filters;
    },
    filterData: (state) => {
      if (
        state.filterColors.length > 0 ||
        state.filtershapes.length > 0 ||
        state.filterSizes.length > 0
        ) {
          if (state.filterColors.length > 0) {
            state.data = data.filter((item) =>
            state.filterColors.includes(item.color)
            )
            if (state.filtershapes.length > 0 && state.data.length < 60) {
              localStorage.setItem('data', JSON.stringify(state.data))
              state.data = state.data.filter((item) =>
              state.filtershapes.includes(item.shape)
              )
            }

            if (state.filterSizes.length > 0 && state.data.length < 60) {
            localStorage.setItem('data', JSON.stringify(state.data))
            state.data = state.data.filter((item) =>
            state.filterSizes.includes(item.size)
            )
          }
        }
        
        if (state.filtershapes.length > 0) {
          state.data = data.filter((item) =>
            state.filtershapes.includes(item.shape)
          )
          if (state.filterColors.length > 0 && state.data.length < 60) {
            localStorage.setItem('data', JSON.stringify(state.data))
            state.data = state.data.filter((item) =>
              state.filterColors.includes(item.color)
              )
            }
            
            if (state.filterSizes.length > 0 && state.data.length < 60) {
              localStorage.setItem('data', JSON.stringify(state.data))
              state.data = state.data.filter((item) =>
              state.filterSizes.includes(item.size)
              )
            }
        }

        if (state.filterSizes.length > 0) {
          state.data = data.filter((item) =>
            state.filterSizes.includes(item.size)
            )
            if (state.filterColors.length > 0 && state.data.length < 60) {
              localStorage.setItem('data', JSON.stringify(state.data))
            state.data = state.data.filter((item) =>
            state.filterColors.includes(item.color)
            )
          }
          
          if (state.filtershapes.length > 0 && state.data.length < 60) {
            localStorage.setItem('data', JSON.stringify(state.data))
            state.data = state.data.filter((item) =>
              state.filtershapes.includes(item.shape)
            )
          }
        }
      } else {
        state.data = data
      }

      if (state.data.length < 60) {
        state.data = state.data.filter((item) => {
          if (
            +item.count <= state.count.max &&
            +item.count >= state.count.min &&
            +item.year >= state.year.min &&
            +item.year <= state.year.max
          ) {
            return true
          } else {
            return false
          }
        })
      } else {
        state.data = data.filter((item) => {
          if (
            +item.count <= state.count.max &&
            +item.count >= state.count.min &&
            +item.year >= state.year.min &&
            +item.year <= state.year.max
          ) {
            return true
          } else {
            return false
          }
        })
      }

      if (state.data.length < 60) {
          if (state.favouriteToys) {
            state.data = state.data.filter((item) => item.favorite)
          }
      } else {
        if (state.favouriteToys) {
          state.data = data.filter((item) => item.favorite)
        }
      }
      
    },
    setSliderFilter: (
      state,
      action: {
        payload: {
          values: { min: number; max: number }
          type: 'year' | 'count'
        }
      }
      ) => {
        state[action.payload.type] = action.payload.values;
    },
    setFavourite: (state) => {
      state.favouriteToys = !state.favouriteToys;
    },
    setSelectSort: (state, action:{payload:string}) => {
      state.sortValue = action.payload;
    },
    selectSort: (state) => {
      if (state.sortValue) {
        if (state.sortValue == 'StartToEnd') {
          state.data = state.data.sort((a, b) => a.name.localeCompare(b.name))
        } else if (state.sortValue == 'EndToStart') {
          state.data = state.data.sort((a, b) => b.name.localeCompare(a.name))
        } else if (state.sortValue == 'orderToIncrease') {
          state.data = state.data.sort((a, b) => +a.count - +b.count)
        } else {
          state.data = state.data.sort((a, b) => +b.count - +a.count);
        }
      }
    },
    setClearFilter: (state) => {
      state.clearFilter = true;
    },
    setSelectedToys: (state, action:{payload:number[]}) => {
      state.selectedToys = action.payload;
    },
    setAudioPlaying: (state) => {
      state.isAudioPlaying = !state.isAudioPlaying;
    },
    setIsSnowing: (state) => {
      state.isSnowing = !state.isSnowing
    }
  },
  })
  
  export default mainslice.reducer
export const {
  setFilters,
  filterData,
  setSliderFilter,
  setFavourite,
  setSelectSort,
  selectSort,
  setClearFilter,
  setSelectedToys,
  setAudioPlaying,
  setIsSnowing
} = mainslice.actions
