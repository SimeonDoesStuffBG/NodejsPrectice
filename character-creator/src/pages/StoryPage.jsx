import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const StoryPage = ({story, myStory, onDelete}) => {

  const [creatorName,setCreatorName]=useState('[deleted]');
  const nav= useNavigate();
  //const [possibleChars,setPossibleChars]=useState([]);
  useEffect(()=>{
    const getCreator = async()=>{
      if(story.creator!==-1){
        const res = await fetch(`http://localhost:5000/users/${story.creator}`);
        const creator = await res.json();
        setCreatorName(creator.username);
      }
      //const chars=await fetch(`http://localhost:5000/characters/${story.creator}`);
      //const charList = await chars.json();
      //setPossibleChars(charList.filter(char=>char.featuredIn.every(stor=>stor.id!==story.id)));
      //console.log(creator);
    }
    getCreator();
  },[])

  return (
    <div>
      <h1>{story.title}</h1>
      <p>created by {story.creator!==-1?<Link to={`/user=${story.creator}`}>{creatorName}</Link>:creatorName}</p>
     {myStory&&<div><Link to={`editor`}><button>Edit Story</button></Link>
     <button title="Delete this story and all of its plotpoints" onClick={()=>{onDelete(story.id, story.creator); nav(`/user=${story.creator}`)}}>Delete Story</button></div>
    }
     <div className="list-layout">
        <div>
          <h4>Characters</h4>
          {story.characters.map(char=>
          <li key={char.id}><Link to={`/character=${char.id}`}>{char.name}</Link></li>)}
        </div>
        <div>
          <h4>Plotpoints:</h4>
          {myStory && <Link to={'plotpoint-creator'}><button>Add Plotpoint</button></Link>}
          <ol>
            {story.plotpoints.map(plot=>
              <li key={plot.id}><Link to={`/plotpoint=${plot.id}`}>{plot.timeIndex + ' ' + plot.title}</Link></li>
            )}
          </ol>
        </div>
     </div>
     </div>
  )
}

export default StoryPage