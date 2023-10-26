export interface Ishape {
  shape: string
  src: string
  colorru: string
  coloren: string,
  selected:boolean,
  selectedColor: boolean
}

export interface Isize {
  size: string
  src: string
  selectedSize: boolean
}

export interface Idata {
  num: string,
  name: string,
  count: string,
  year: string,
  shape: string
  color: string,
  size: string,
  favorite: boolean,
}

export interface IColor {
  white: string
  yellow: string
  red: string
  green: string
  blue: string
}

export interface Ifilter{
  shape?: string,
  color?: string,
  size?:string,
}

export interface MultiRangeSliderProps {
  min: number
  max: number
  type: string
  step:number
}