import React, { useRef, useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import './post.css';

function Post({ post, firstInNew }) {
   const ref = useRef(null);
   const [show, setShow] = useState(false);

   // Used to toggle the transition after render.
   useEffect(() => {
      if (!show) {
         setShow(true)
      }
      if (firstInNew) {
         ref.current.scrollIntoView();
      }
   }, [show, firstInNew]);

   // Make sure there is a category, default to empty string
   //  if there isn't.
   if (null == post.category) {
      post.category = { name: "" };
   }

   return (
      <CSSTransition 
      in={show}
      timeout={500}
      classNames='item'
      nodeRef={ref}>
         <li className='post' ref={ref}>
            <div className='post-banner' style={{ backgroundImage: `url(${post.img_url.concat(`=${post.id}`)})`, }}>
               <p>{new Date(post.created_at).toLocaleDateString()}</p>
               <p>{post.category.name}</p>
            </div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
         </li>
      </CSSTransition >
   );
}

export default Post