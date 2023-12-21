import { useMutation, useQuery } from "@tanstack/react-query"
import { getBlogs, getBlog,  createBlog, queryClient, deleteBlog, getBloggers, getBlogger, updateProfile, loginUser, registerUser, updateBlog, getUserProfile } from "./api"
import { toast } from "react-toastify"

// AUTH LOGIN, REGISTER

export const useLogin = (navigate) => {

    return useMutation({
        mutationKey: ['loginUser'],
        mutationFn: loginUser,
        onSuccess: () => {
            toast('Login successful!!!');
            navigate('/');
        },
        onError: (error) => {
            toast(error.toString());

        }
    });

}

export const useRegister = (navigate) => {

    return useMutation({
        mutationKey: ['registerUser'],
        mutationFn: registerUser,
        onSuccess: () => {
            toast('Registeration successful!!!');
            navigate('/login');
        },
        onError: (error) => {
            toast(error.toString());
        }
    });

}


// TOKEN VALIDATION

export const useGetProfile = () => {

    return useQuery({
        queryKey: ['getProfile'],
        queryFn: getUserProfile,
    });
}

// ALL BLOGS

export const useGetBlogs = () => {
    return useQuery({
        queryKey: ['getBlogs'],
        queryFn: getBlogs,
    })
}


// BLOG - CREATE, EDIT/UPDATE , DELETE

export const useGetBlog = (blogId) => {
    return useQuery({
        queryKey: ['getBlog'],
        queryFn: ({ signal }) => getBlog({ signal, blogId }),
    })
}

export const useCreateBlog = (navigate) => {

    return useMutation({
        mutationKey: ['createBlog'],
        mutationFn: createBlog,
        onSuccess: () => {
            queryClient.invalidateQueries(['getBlogs']);
            toast('Blog Created Succesfully');
            navigate('/');
        },
        onError: () => {
            toast('Failed to create blog');
        }
    });

}


export const useUpdateBlog = (navigate, postId) => {

    return useMutation({
        mutationKey: ['updateBlog'],
        mutationFn: updateBlog,
        onSuccess: () => {
            queryClient.invalidateQueries(['getBlog', 'getBlogs']);
            toast('Blog Updated Succesfully');
            navigate(`/blog/${postId}`);
        },
        onError: () => {
            toast('Failed to update blog');
        }
    });

}

export const useDeleteBlog = (navigate) => {

    return useMutation({
        mutationKey: ['deleteBlog'],
        mutationFn: deleteBlog,
        onSuccess: () => {
            queryClient.invalidateQueries(['getBlogs']);
            toast('Blog deleted Succesfully');
            navigate('/');
        },
        onError: () => {
            toast('Failed to delete blog');
        }
    });

}


// ALL BLOGGERS

export const useGetBloggers = () => {

    return useQuery({
        queryKey: ['getBloggers'],
        queryFn: getBloggers,
    })
}

// SINGLE BLOGGER

export const useGetBlogger = (bloggerId) => {

    return useQuery({
        queryKey: ['getBlogger'],
        queryFn: ({ signal }) => getBlogger({ signal, bloggerId })
    })
}

// PROFILE

export const useUpdateProfile = (navigate) => {

    return useMutation({
        mutationKey: ['updateProfile'],
        mutationFn: updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries(['getProfile', 'getBlogs', 'getBloggers','getBlogger']);
            toast('Profile updated succesfully');
            navigate('/profile');
        },
        onError: () => {
            toast('Failed to update profile');
        }
    });

}

