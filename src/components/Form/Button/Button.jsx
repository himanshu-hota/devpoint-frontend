import PropTypes from 'prop-types';


const Button = ({children,clickHandler,classes}) => {
  return (
    <button className={`${classes} rounded-md hover:opacity-80 active:scale-95 my-4 font-semibold text-xl `} onClick={clickHandler}>{children}</button>
  )
}

Button.propTypes = {
  children:PropTypes.node.isRequired,
  clickHandler:PropTypes.func,
  classes:PropTypes.string,
  
}

export default Button;