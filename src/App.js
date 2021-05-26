import { React, useEffect, useState } from 'react';
import {
   BrowserRouter,
   Switch,
   Route,
   NavLink,
} from 'react-router-dom';

import { apiGet } from './util';
import Home from './components/home/Home';
import Blog from './components/blog/Blog';

import './App.css';


function App() {
   const [posts, setPosts] = useState([]);
   const [newIds, setNewIds] = useState([]);

   // Preload the available categories.
   const [categories, setCategories] = useState([]);
   useEffect(() => {
      apiGet('/categories').then(setCategories);
   }, []);

   // Load more posts hook.
   const [currentPage, setCurrentPage] = useState(1);
   useEffect(() => {
      apiGet(`/posts?page=${currentPage}`).then(newPosts => {
         setPosts(oldPosts => [...oldPosts, ...newPosts]);
         setNewIds(newPosts.map(({ id }) => id));
      });
   }, [currentPage]);

   return (
      <BrowserRouter>
         <div className='header'>
            <NavLink className='link' exact to='/' activeClassName='current-route'>Home</NavLink>
            <NavLink className='link' to='/blog' activeClassName='current-route'>Blog</NavLink>
         </div>

         <Switch>
            <Route exact path='/'>
               <Home
                  categories={categories}
                  onSubmit={(newPost) => {
                     setPosts([newPost, ...posts])
                     setNewIds([newPost.id]);
                  }}
                  setCurrentPage={setCurrentPage}
                  posts={posts}
                  newIds={newIds} />
            </Route>
            <Route path='/blog'>
               <Blog
                  setCurrentPage={setCurrentPage}
                  posts={posts}
                  newIds={newIds} />
            </Route>
         </Switch>
      </BrowserRouter>
   );
}



export default App;