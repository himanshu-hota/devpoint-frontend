
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <section className='h-full w-full flex justify-center items-center flex-col px-10 '>
      <h1 className='text-3xl mb-2 font-semibold'>Probbaly you landed on space station 😕 </h1>
      <div className="h-max w-full md:h-1/3 md:w-auto shadow-lg">
        <img src="https://images.pexels.com/photos/41162/moon-landing-apollo-11-nasa-buzz-aldrin-41162.jpeg?auto=compress&cs=tinysrgb&w=600" alt='space-station' className='h-full w-full rounded-lg' />
      </div>
      <Link to={'/'} className='mt-6 px-6 py-4 bg-content text-background rounded-md hover:bg-card font-semibold'>Go to Home</Link>
    </section>
  )
}

export default ErrorPage;