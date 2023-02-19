import { createAction, createReducer, nanoid } from '@reduxjs/toolkit'
import { initalPostList } from 'constants/blog'
import { Post } from 'types/blog.type'

interface BlogState {
  postList: Post[]
  editingPost: Post | null
}

const initallState: BlogState = {
  postList: [],
  editingPost: null
}

// khai báo action

export const addPost = createAction('bolg/addPost', function (post: Omit<Post, 'id'>) {
  return {
    payload: {
      ...post,
      id: nanoid()
    }
  }
})

export const deletePost = createAction<string>('bolg/deletePost')
export const cancelEditingPost = createAction('/blog/cancelEditingPost')
export const finishEditingPost = createAction<Post>('/blog/finishEditingPost')

export const startEditingPost = createAction<string>('bolg/startEditingPost')

const blogReducer = createReducer(initallState, (builder) => {
  // console.log('builder callback ', builder)

  builder
    .addCase(addPost, (state, action) => {
      const post = action.payload
      console.log(state)
      state.postList.push(post)
    })
    .addCase(deletePost, (state, action) => {})
})

export default blogReducer
