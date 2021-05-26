import Post from '../post/Post.js';
import './viewposts.css'

export function ViewPosts({ posts, newIds, setCurrentPage, style }) {
   return (
      <div className='container' style={style === undefined ? {} : style} >
         <ul>
            {posts.map((post, i) => {
               return <Post key={post.id} post={post} firstInNew={firstInNew(post.id)}/>
            })}
         </ul>
         <button onClick={() => { setCurrentPage(value => value + 1) }}>Meer laden</button>
      </div>
   );

   // Can be used to see if a post the first in a newly loaded page.
   //  - not used at the moment.
   function firstInNew(id) {
      return newIds.indexOf(id) === 0;
   }
}

export default ViewPosts;