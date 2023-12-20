import PropTypes from 'prop-types'


const Error = ({  message }) => {


    return (
        <div className='w-full h-full bg-background border-2 border-red-300 text-content my-20 flex flex-col justify-center items-center'>
            <h1 className='text-2xl'>{message}</h1>
            <p className=''>Something went wrong!!!!</p>
        </div>
    )
}

Error.propTypes = {
    message: PropTypes.string,
}

export default Error;