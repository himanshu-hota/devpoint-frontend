import PropTypes from 'prop-types';
import './Input.module.css';

const Input = ({ type,label,placeholder,validations, register }) => {
  return <input type={type} placeholder={placeholder} {...register(label, {...validations })} />;
};

Input.propTypes = {
  type: PropTypes.string,
  register: PropTypes.func, 
  validations:PropTypes.object,
  label:PropTypes.string,
  placeholder:PropTypes.string
};

export default Input;