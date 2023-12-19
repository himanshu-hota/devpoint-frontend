import {Suspense } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

const Lazy = ({children}) => {
  return (
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
  )
}

Lazy.propTypes = {
    children:PropTypes.node
}

export default Lazy