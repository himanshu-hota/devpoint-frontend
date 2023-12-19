import PropTypes from 'prop-types';

const Portal = ({children}) => {
  return (
      <section className="portal absCenter w-[90%] h-[60%]  bg-gray-900 flex flex-col  justify-center items-center px-20 opacity-95 rounded-md">
        {children}
      </section>
  )
}

Portal.propTypes = {
    children:PropTypes.node.isRequired
}

export default Portal;