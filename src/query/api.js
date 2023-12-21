import { QueryClient } from "@tanstack/react-query";

const API_ENDPOINT = import.meta.env.VITE_ENDPOINT;
const token = localStorage.getItem('devPToken');

export const getBlogs = async () => {

    const res = await fetch(`${API_ENDPOINT}/blogs`);
    const fetchedPosts = await res.json();

    if (!res.ok) {
        const error = new Error('Could not fetch blogs from the server');
        error.status = res.status;
        error.message = fetchedPosts.message;
        throw error;
    }

    return fetchedPosts;

}


export const getBlog = async ({ signal, blogId }) => {

    const headers = new Headers({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', 
    });

    const options = {
        method: 'GET',
        headers: headers,
    };

    const res = await fetch(`${API_ENDPOINT}/blogs/${blogId}`, options,{ signal });
    const data = await res.json();

    if (!res.ok) {
        const error = new Error('Could not fetch blog from the server');
        error.status = res.status;
        error.message = data.message;
        throw error;
    }

    return data;
}

export const isTokenValid = async ({ signal, token }) => {

    const tokenInfo = { token };
    const options = {
        method: 'POST',
        body: JSON.stringify(tokenInfo),
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},

    };
    const res = await fetch(`${API_ENDPOINT}/auth/profile`, options, { signal });
    const data = await res.json();
    if (res.ok) {
        // setUser(data.data);
        // setIsLoggedIn(true);
    } else {
        localStorage.removeItem('devPToken');
        const error = new Error('Could not fetch user data');
        error.status = res.status;
        error.message = data.message;
        throw error;
    }


    return data;
    // toast('Something went wrong!!!');

};

export const createBlog = async ({ values, textAreaContent }) => {

    const formData = new FormData();

    const { title, summary, file } = values;

    formData.set('title', title);
    formData.set('summary', summary);
    formData.set('content', textAreaContent);
    formData.set('file', file[0]);

    const options = {
        method: "POST",
        body: formData,
        headers: { 'Authorization': `Bearer ${token}` }
    }

    const res = await fetch(`${API_ENDPOINT}/blog/create`, options);
    const data = await res.json();
    if (!res.ok) {
        const error = new Error('Could not create your blog');
        error.status = res.status;
        error.message = data.message;
        throw error;
    }


    return data;


};

export const updateBlog = async ( formDatas ) => {

    const formData = new FormData();
    const { title, summary, file, textAreaContent, postId } = formDatas;

    formData.set('title', title);
    formData.set('summary', summary);
    formData.set('content', textAreaContent);
    formData.set('postId', postId);
    if (file && file[0]) {
        formData.set('file', file[0]);
    }

    const options = {
        method: "PUT",
        body: formData,
        headers: { 'Authorization': `Bearer ${token}` }
    }

    const res = await fetch('http://localhost:4000/blog/update', options);
    const data = await res.json();

    if (!res.ok) {
        const error = new Error('Could not create your blog');
        error.status = res.status;
        error.message = data.message;

        throw error;

        // toast('Blog Updated successfully!!!');
        
    }


    return data;

};



export const deleteBlog = async (blogId) => {

    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    };
    const url = `${API_ENDPOINT}/blog/delete/${blogId}`;
    const res = await fetch(url, options);
    const data = await res.json();

    if (!res.ok) {
        const error = new Error('Could not delete your blog');
        error.status = res.status;
        error.message = data.message;
        throw error;
    }

    return data;


};


export const getBloggers = async () => {

    const options = {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    }

    const res = await fetch(`${API_ENDPOINT}/user/bloggers` , options);
    const data = await res.json();

    if (!res.ok) {
        const error = new Error('Could not get all bloggers');
        error.status = res.status;
        error.message = data.message;
        throw error;
    }

    return data;

}



export const getBlogger = async ({ signal, bloggerId }) => {


    const options = {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    }

    const res = await fetch(`${API_ENDPOINT}/user/bloggers/${bloggerId}`, options, { signal });
    const blogger = await res.json();


    if (!res.ok) {
        const error = new Error('Could not get all bloggers');
        error.status = res.status;
        error.message = blogger.message;
        throw error;
    }

    return blogger;


}

export const updateProfile = async (values) => {

    const { name, currentpassword, password, confirmpassword, file } = values;

    const formData = new FormData();

    formData.set('name', name);
    formData.set('currentpassword', currentpassword);
    formData.set('password', password ? password : '');
    formData.set('confirmpassword', confirmpassword ? confirmpassword : '');
    formData.set('file', file[0]);

    const options = {
        method: "POST",
        body: formData,
        headers: { 'Authorization': `Bearer ${token}` }
    }


    const res = await fetch(`${API_ENDPOINT}/user/update`, options)
    const data = await res.json();

    if (!res.ok) {
        const error = new Error('Could not get all bloggers');
        error.status = res.status;
        error.message = data.message;
        throw error;
    }

    return data;
}


export const loginUser = async ({ formData, login }) => {
    const { email, password } = formData;
    const options = {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    }

    const res = await fetch(`${API_ENDPOINT}/auth/login`, options);
    const data = await res.json();

    if (res.ok) {
        const token = data?.token;
        login(data.data, token);
    } else {
        const error = new Error('Login failed!!!');
        error.status = res.status;
        error.message = data.message;
        throw error;
    }


    return data;
}


export const registerUser = async ({ formData }) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
    }

    const res = await fetch(`${API_ENDPOINT}/auth/register`, options)
    const data = await res.json();


    if (!res.ok) {
        const error = new Error('Registerataion failed!!!');
        error.status = res.status;
        error.message = data.message;
        throw error;
    }

    return data;
}





export const queryClient = new QueryClient();