import {  useMutation, useQuery } from "@tanstack/react-query"
import { getBlogs, getBlog, isTokenValid, createBlog, queryClient, deleteBlog, getBloggers, getBlogger, updateProfile, loginUser, registerUser } from "./api"
import { toast } from "react-toastify"

export const useGetBlogs = () => {
    return useQuery({
        queryKey:['getBlogs'],
        queryFn: getBlogs,
    })
}


export const useGetBlog = (blogId) => {
    return useQuery({
        queryKey: ['getBlog'],
        queryFn: ({ signal }) => getBlog({ signal, blogId }),
    })
}

export const useValidateToken = (token) => {

    return useQuery({
        queryKey: ['getProfile', token],
        queryFn: ({ signal }) => isTokenValid({ signal, token }),
    })
}

export const useGetBloggers = () => {

    return useQuery({
        queryKey: ['getBloggers'],
        queryFn: getBloggers,
    })
}

export const useGetBlogger = (bloggerId) => {

    return useQuery({
        queryKey: ['getBloggers'],
        queryFn: ({ signal }) => getBlogger({ signal, bloggerId })
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


export const useUpdateProfile = (navigate) => {

    return useMutation({
        mutationKey: ['updateProfile'],
        mutationFn: updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries(['getProfile']);
            toast('Profile updated succesfully');
            navigate('/profile');
        },
        onError: () => {
            toast('Failed to update profile');
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
