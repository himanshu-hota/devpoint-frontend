import { useState } from 'react';
import './image.css';
import PropTypes from 'prop-types';

const tempPath = ''

const Image = ({ imagePath, altText,classes }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    return (
        <>
             <img
                src={isImageLoaded ? imagePath : tempPath}
                alt={altText}
                onLoad={handleImageLoad}
                className={`image ${isImageLoaded ? 'loaded' : ''} ${classes}`}
            />
        </>
    );
};

Image.propTypes = {
    imagePath: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
    classes: PropTypes.string,
};

export default Image;
