import PropTypes from 'prop-types';
import './FormButton.module.css';

const FormButton = ({disabled,children}) => {
  return (
    <button disabled={disabled}>{children}</button>
  )
}

FormButton.propTypes = {
    children:PropTypes.string,
    disabled:PropTypes.bool
}

export default FormButton