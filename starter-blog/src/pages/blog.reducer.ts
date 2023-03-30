import { createAction, createAsyncThunk, createReducer, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { initalPostList } from 'constants/blog'
import http from 'utils/http'

export interface Post {
  title: string
  description: string
  publishDate: string
  id: string
  featuredImage: string
  published: boolean
}
interface BlogState {
  postList: Post[]
  editingPost: null | Post
  postId: string
}

const intialState: BlogState = {
  postList: [],
  editingPost: null,
  postId: ''
}
export type keyId = Pick<Post, 'id'>
// create action
export const addPost = createAction('blgog/addPost', function (post: Omit<Post, 'id'>) {
  return { payload: { ...post, id: nanoid() } }
})

export const getPostList = createAsyncThunk('blog/getPostList', async (_, thunkAPI) => {
  const res = await http.get<Post[]>('posts', {
    signal: thunkAPI.signal
  })
  return res.data
})
export const addPostList = createAsyncThunk('blog/addPostList', async (body: Omit<Post, 'id'>, thunkAPI) => {
  const res = await http.post<Post>('posts', body, {
    signal: thunkAPI.signal
  })
  return res.data
})

export const updatePost = createAsyncThunk(
  'blog/updatePost',
  async ({ id, body }: { id: string; body: Post }, thunkAPI) => {
    const res = await http.put<Post>('posts/' + id, body, {
      signal: thunkAPI.signal
    })
    return res.data
  }
)
export const deletePost = createAsyncThunk('blog/deletePost', async (id: string, thunkAPI) => {
  const res = await http.delete<Post>('posts/' + id, {
    signal: thunkAPI.signal
  })
  return res.data
})

const blogslice = createSlice({
  name: 'blog',
  initialState: intialState,
  reducers: {
    editPost: (state, action) => {
      const id = action.payload
      const editingPost = state.postList.find((post) => post.id === id) || null
      state.editingPost = editingPost
    },
    cancelPost: (state) => {
      state.editingPost = null
    },
    startEditingPost: (state, action: PayloadAction<string>) => {
      state.postId = action.payload
    },
    cancelEditingPost: (state) => {
      state.postId = ''
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getPostList.fulfilled, (state, action) => {
        state.postList = action.payload
      })
      .addCase(addPostList.fulfilled, (state, action) => {
        state.postList.push(action.payload)
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        const id = action.meta.arg
        const postListUpdate = state.postList.findIndex((item) => item.id === id)
        if (postListUpdate !== -1) {
          state.postList.splice(postListUpdate, 1)
        }
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.postList.find((item, index) => {
          if (item.id === action.payload.id) {
            state.postList[index] = item
            return true
          }
          return false
        })
        state.editingPost = null
      })
      .addMatcher(
        (action) => action.type.includes('cancel'),
        (state, action) => {
          console.log('helo')
        }
      )
      .addDefaultCase((state, action) => {
        console.log('k vafo cai nao')
      })
  }
})

const blogReducer = blogslice.reducer
console.log(blogReducer)

export default blogReducer
export const { cancelPost,cancelEditingPost,startEditingPost, editPost } = blogslice.actions
