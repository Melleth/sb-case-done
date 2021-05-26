import React, { useState } from 'react';
import { apiPost } from '../../util';

import './createpost.css';

function CreatePost({ categories, style, onSubmit }) {
   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const [categoryId, setCategoryId] = useState(0);

   // Borrowed from https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces/50971250
   function isStringEmpty(string) {
      return !string.replace(/\s/g, '').length
   }

   // Very basic validation beyond the pattern attrib
   //  - Could also be a stub for more.
   function validateInput(target) {
      target.classList.toggle("invalid", isStringEmpty(target.value));
      return !isStringEmpty(target.value)
   }

   // API says category is a required field, so we enforce it.
   function validateSelect(target) {
      target.classList.toggle("invalid", !(target.value > 0));
      return target.value > 0
   }

   function submitPost(event) {
      // The page flickered when a post was submitted, this prevents it.
      event.preventDefault();

      // Do validation outside of if statement to get around
      //  && short-circuiting as we need the required field
      //  indicator/border to show up.
      const validatedTitle = validateInput(event.target[0]);
      const validatedCategory = validateSelect(event.target[1]);
      const validatedContent = validateInput(event.target[2]);

      if (validatedTitle && validatedCategory && validatedContent) {
         const body = {
            title: title,
            category_id: parseInt(categoryId),
            content: content,
         };

         // API post new post, update the App state if response ok.
         apiPost("/posts", body).then(json => {
            const post = {
               id: json.id,
               title: json.title,
               content: json.content,
               created_at: json.created_at,
               category: { name: json.category.name },
               img_url: json.img_url,
            };
            onSubmit(post);
         });

         // Reset the fields.
         setTitle("");
         setContent("");
         setCategoryId(0);
      }
   }

   return (
      <div className="container" style={style === undefined ? {} : style}>
         <form onSubmit={submitPost}>
            <label>
               Titel
               <input
                  type="text"
                  name="title"
                  pattern="\S+.*"
                  placeholder="Geen titel"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={(e) => validateInput(e.target)} />
            </label>
            <label>
               Categorie
                    <select
                  name="category_id"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  onBlur={(e) => validateSelect(e.target)}>
                  <option key={0} value={0} disabled>Geen categorie</option>
                  {
                     categories.map(category =>
                        <option key={category.id} value={category.id}>
                           {category.name}
                        </option>)
                  }
               </select>
            </label>
            <label className="fill-parent">
               Bericht
                  <textarea
                     type="text"
                     name="content"
                     placeholder="Voer hier uw tekst in..."
                     pattern="\S+.*"
                     value={content}
                     onChange={(e) => setContent(e.target.value)}
                     onBlur={(e) => validateInput(e.target, e.target.value)} />
            </label>
            <button type="submit">
               Bericht aanmaken
            </button>
         </form>
      </div>
   );
}

export default CreatePost;