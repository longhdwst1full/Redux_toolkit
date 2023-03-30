import { useSelector } from 'react-redux'
import PostItem from '../PostItem'
import { RootState, useAppDispatch } from 'store'
import { Fragment, useEffect } from 'react'
import { getPostList, startEditingPost } from 'pages/blog.reducer'
import { useGetPostsQuery } from 'pages/blog.server'
import SkeletonPost from '../SkeletonPost'

export default function PostList() {
  // const postList = useSelector((state: RootState) => state.blog.postList)
  const dispatch = useAppDispatch()
  
  // useEffect(() => {
  //   const respone = dispatch(getPostList())
  //   return () => {
  //     respone.abort()
  //   }
  // }, [dispatch])

  // isloading danh cho lan 1 fetch dau tien
  // is fetching la moi lan goi API
  const { data, isLoading, isFetching } = useGetPostsQuery()
  const startEdit = (id: string) => {
    dispatch(startEditingPost(id))
  }
  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12'>
      <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
        <div className='mb-10 md:mb-16'>
          <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>Được Dev Blog</h2>
          <p className='mx-auto max-w-screen-md text-center text-gray-500 md:text-lg'>
            Đừng bao giờ từ bỏ. Hôm nay khó khăn, ngày mai sẽ trở nên tồi tệ. Nhưng ngày mốt sẽ có nắng
          </p>
        </div>
        <div className='grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8'>
          {isFetching && (
            <Fragment>
              <SkeletonPost />
              <SkeletonPost />
              <SkeletonPost />
            </Fragment>
          )}

          {!isFetching && data && data.map((item) => <PostItem post={item} key={item.id} startEdit={startEdit} />)}
        </div>
      </div>
    </div>
  )
}
