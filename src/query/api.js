import { QueryClient } from "@tanstack/react-query";


export const getBlogs = async () => {

    const res = await fetch(`http://localhost:4000/blogs`);
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

    const res = await fetch(`http://localhost:4000/blogs/${blogId}`, { signal });
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
        headers: { 'Content-Type': 'application/json' },

    };
    const res = await fetch('http://localhost:4000/auth/profile', options, { signal });
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

export const createBlog = async ({ formData }) => {

    const options = {
        method: "POST",
        body: formData,
        credentials: 'include'
    }

    const res = await fetch('http://localhost:4000/blog/create', options);
    const data = await res.json();
    if (!res.ok) {
        const error = new Error('Could not create your blog');
        error.status = res.status;
        error.message = data.message;

        throw error;
    }


    return data;


};

export const deleteBlog = async (blogId) => {

    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    };
    const url = `http://localhost:4000/blog/delete/${blogId}`;
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

    const res = await fetch('http://localhost:4000/user/bloggers');
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


    const res = await fetch(`http://localhost:4000/user/bloggers/${bloggerId}`, { signal });
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
        credentials: 'include'
    }


    const res = await fetch('http://localhost:4000/user/update', options)
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
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    }

    const res = await fetch('http://localhost:4000/auth/login', options);
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

    const res = await fetch('http://localhost:4000/auth/register', options)
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