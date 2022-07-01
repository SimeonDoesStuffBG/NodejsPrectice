import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom';


const CharacterPage = ({char, myCreation}) => {
  const [creatorName,setCreatorName]=useState('[deleted]');

  useEffect(()=>{
    const getCreator = async()=>{
      if(char.creator!==-1){
        const creator = await fetch(`http://localhost:5000/users/${char.creator}`);
        const data =await creator.json();
        setCreatorName(data.username);
      }
          
  }
    getCreator();
  },[]
  )

 
  return (
    <div>
     
      <section className="CPageHeader">
        <h1>{char.name}</h1>
        <h4>Created by {char.creator!==-1?<Link to={`/user=${char.creator}`}>{creatorName}</Link>:creatorName}</h4>
      </section>
      <section className="Main">
        {myCreation&&<Link to={`editor`}><button>Edit Character</button></Link>}
        <div>{char.description}</div>
        <div className="Relationships">
        </div>
      </section>

      {char.featuredIn.length>0 && <section className="featured Stories">
        <h4>The Character features in the following stories:</h4>
        <ul>
          {char.featuredIn.map(story=>
            <li key={story.id}><Link to={`/story=${story.id}`}>{story.title}</Link></li>)}
        </ul>
      </section>}
      
      <section className="list-relations">
        <div><h4>Friends:</h4>
          <ul>
            {char.relationships.Friends.map(friend=>
              <li key={friend.id}>{friend.name}</li>
            )}
          </ul>
        </div>

        <div><h4>Enemies:</h4>
          <ul>
            {char.relationships.Enemies.map(enemy=>
              <li key={enemy.id}>{enemy.name}</li>
            )}
          </ul>
        </div>

        <div><h4>Family:</h4>
          <ul>
            {char.relationships.Family.map(relative=>
              <li key={relative.id}>{relative.name}</li>
            )}
          </ul>
        </div>

        <div><h4>Lovers:</h4>
          <ul>
            {char.relationships.Lovers.map(lover=>
              <li key={lover.id}>{lover.name}</li>
            )}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default CharacterPage