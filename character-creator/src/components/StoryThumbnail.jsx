import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const StoryThumbnail = ({story}) => {
  
    const [creator,setCreator]=useState('[deleted]');

    useEffect(()=>{
      const getCreator = async()=>{
        if(creator!==-1){
          const theCreator = await fetch(`http://localhost:5000/users/${story.creator}`);
          const data =await theCreator.json();
          setCreator(data.username);
      }
    }
      getCreator();
    },[]
    )

    return (
    <div className="Thumbnail-story">
        <Link to={`/story=${story.id}`}>
          <img src={story.picture}/>
        <div>
            <h4>{story.title}</h4>
            <p>{creator}</p>
        </div>
        </Link>
    </div>
  )
}

export default StoryThumbnail