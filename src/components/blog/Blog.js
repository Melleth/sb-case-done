import React from 'react';
import ViewPosts from '../viewposts/ViewPosts';

// Fullscreen view of posts.
function Blog({ setCurrentPage, posts, newIds }) {
   return (
      <div className='content-wrapper'>
         <ViewPosts
            style={undefined}
            posts={posts}
            setCurrentPage={setCurrentPage}
            newIds={newIds} />
      </div>
   )
}

export default Blog;