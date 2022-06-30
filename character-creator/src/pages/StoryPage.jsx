import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const StoryPage = ({story, myStory}) => {

  const [creatorName,setCreatorName]=useState('');

  useEffect(()=>{
    const getCreator = async()=>{
      const res = await fetch(`http://localhost:5000/users/${story.creator}`);
      const creator = await res.json();
      setCreatorName(creator.username);
      //console.log(creator);
    }
    getCreator();
  },[])

  return (
    <div>
      <h1>{story.title}</h1>
      <p>created by <Link to={`/user=${story.creator}`}>{creatorName}</Link></p>
     {myStory&&<Link to={`editor`}><button>Edit Story</button></Link>}
     </div>
  )
}

export default StoryPage