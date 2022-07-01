import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const PlotpointPage = ({plotpoint, myPlotpoint}) => {
    
    const [storyTitle,setStoryTitle]=useState('');
    const [creatorName, setCreatorName]=useState('[deleted]');

    useEffect(()=>{
        const init = async()=>{
            const res1= await fetch(`http://localhost:5000/stories/${plotpoint.story}`);
            const story= await res1.json();
            setStoryTitle(story.title);

            if(plotpoint.creator!==-1){
                const res2= await fetch(`http://localhost:5000/users/${plotpoint.creator}`);
                const creator=await res2.json();
                setCreatorName(creator.username);
            }
        }
        init();
    },[]);

  return (
    <div>
        <h1>{plotpoint.title}</h1>
        <p>Part of the Story <Link to={`/story=${plotpoint.story}`}>{storyTitle}</Link> created by {plotpoint.creator!==-1?<Link to={`/user=${plotpoint.creator}`}> {creatorName}</Link>:creatorName}</p>    
        {myPlotpoint&&<Link to={`editor`}><button>Edit plotpoint</button></Link>}
        <div className="list-container">
            <div>{plotpoint.description}</div>
            <div>Characters:
                <ul>
                    {plotpoint.characters.map(char=>
                        <li key={char.id} className="characterThing"><Link to={`/character=${char.id}`}>{char.name}</Link></li>)}
                </ul>
            </div>
        </div>

    </div>
  )
}

export default PlotpointPage