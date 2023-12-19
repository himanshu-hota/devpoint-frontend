import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 
    
];


const ReactQuillComp = ({ value, onChange }) => {

    return (
        <div className="quil-container ">
        <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
            />
        </div>        
    );
};


ReactQuillComp.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default ReactQuillComp;
