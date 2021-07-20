import React, { useEffect, useState } from 'react';
import Photo from './Photo';
import './App.css';


const clientID=`?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainURL=`https://api.unsplash.com/photos`;
const searchURL=`https://api.unsplash.com/search/photos`;


function App() {

  const[loading,setLoading]=useState(false);
  const[photos,setPhotos]=useState([]);
  const[page,setPage]=useState(0);
  const[query,setQuery]=useState('');

  const fetchImages=async()=>{
    setLoading(true);
    let url;
    const urlPage=`&page=${page}`;
    const urlQuery=`&query=${query}`;

   
    //if there is alue in search query then we will use search url otherwise use main url which load diffrent images
    if(query)
    {
      url=`${searchURL}${clientID}${urlPage}${urlQuery}`;
    }
    else
    {
     url=`${mainURL}${clientID}${urlPage}`;
    }

    try{
      const response= await fetch(url);
      const data=await response.json();
      setPhotos((oldPhotos)=>
      {
        if(query && page===1)
        {
          return data.results;
        }
        //if we perform search data is in diffrent format which is in result array of object so we use if else
        else if(query)
        {
            return [...oldPhotos,...data.results];
        }
        else
        {
          return[...oldPhotos,...data];
        }
      });
      setLoading(false);
    }
    catch(error)
    {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchImages();
    // eslint-disable-next-line 
  },[page]);


  useEffect(()=>{
    const event=window.addEventListener('scroll',()=>{
     if(!loading && window.innerHeight+window.scrollY>=document.body.scrollHeight-2)
     {
        setPage((oldPage)=>{
          return oldPage+1;
        });
     }
    });
    return ()=>window.removeEventListener('scroll',event);
    // eslint-disable-next-line
  },[]);

  const handleSubmit=(e)=>
  {
    e.preventDefault();
    setPage(1);
  }
  return (
    <main>
      <h1>Search Photos
      <section className="search">
        <form className="search-form">
          <input type="text" className="form-input" placeholder="search" value={query} onChange={(e)=>
                                                                                                setQuery(e.target.value)}></input>
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
          <i class="fa fa-search" aria-hidden="true"></i>
          </button>
        </form>
      </section>
      </h1>
          
      <section className="photos">
        <div className="photos-column">
          {photos.map((image)=>{
             return <Photo key={image.id} image={image}/>
          }
          )}
        </div>
      </section>
      </main>
  );
}

export default App;
