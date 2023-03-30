import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { url } from 'inspector'
import { Post } from './blog.reducer'
export const blogApi = createApi({
  reducerPath: 'blogApi',
  tagTypes: ['Posts'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
  endpoints: (buider) => ({
    // generic type theo thu tu laf kie response tra ve va agurment
    getPosts: buider.query<Post[], void>({
      query: () => 'posts',
      providesTags(result) {
        if (result) {
          const final = [
            ...result.map(({ id }) => ({ type: 'Posts' as const, id })),
            { type: 'Posts' as const, id: 'LIST' }
          ]
          return final
        }
        // c1 const final=[{type:"post" as const,id:"LIST"}]
        // return final
        // c2 return truc tiep
        return [{ type: 'Posts', id: 'LIST' }]
      }
    }),

    addPosts: buider.mutation<Post, Omit<Post, 'id'>>({
      query(body) {
        return {
          url: 'posts',
          method: 'POST',
          body: body
        }
      },
      invalidatesTags: (result, error, body) => [{ type: 'Posts', id: 'LIST' }]
    }),
    get1Post: buider.query<Post, string>({
      query: (id) => `posts/${id}`
    }),
    updatePost: buider.mutation<Post, { id: string; body: Post }>({
      query({ id, body }) {
        return { url: `posts/${id}`, method: 'PUT', body: body }
      },
      invalidatesTags: (result, error, data) => [{ type: 'Posts', id: data.id }]
    }),
    deletePost: buider.mutation<{}, string>({
      query(id) {
        return { url: `posts/${id}`, method: 'DELETE' }
      },
      invalidatesTags: (result, error, id) => [{ type: 'Posts', id: id }]
    })
  })
})

export const { useGetPostsQuery, useUpdatePostMutation, useAddPostsMutation, useGet1PostQuery, useDeletePostMutation } =
  blogApi
