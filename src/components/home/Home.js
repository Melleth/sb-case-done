import React from 'react';
import CreatePost from '../createpost/CreatePost';
import ViewPosts from '../viewposts/ViewPosts';

// 50/50 split view of create and view posts.
function Home({ onSubmit, setCurrentPage, posts, newIds, categories }) {
   // Not a fan of inline styling, but its super convenient here.
   const widthStyle = {
      width: '50%',
   };

   return (
      <div className='content-wrapper'>
         <CreatePost
            categories={categories}
            style={widthStyle}
            onSubmit={onSubmit} />
         <ViewPosts
            style={widthStyle}
            posts={posts}
            setCurrentPage={setCurrentPage}
            newIds={newIds} />
      </div>
   );
}

export default Home;