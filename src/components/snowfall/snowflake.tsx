import Snow from '../../../public/assets/svg/snow.svg';

const Snowflake = (props: {
  id: number
  style: { animationDelay: string; fontSize:string}
}) => {
  return (
    <span className='Snowflake' id={`item${props.id}`} style={props.style}>
      <img src={Snow} alt="snow" className='w-[24px]'/>
    </span>
  )
}

export default Snowflake
