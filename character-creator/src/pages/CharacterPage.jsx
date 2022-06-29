import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom';


const CharacterPage = ({char, myCreation}) => {
  const [creator,setCreator]=useState('');

  useEffect(()=>{
    const getCreator = async()=>{
      const theCreator = await fetch(`http://localhost:5000/users/${char.creator}`);
      const data =await theCreator.json();
      setCreator(data.username);
    }
    getCreator();
  },[]
  )

  
  return (
    <div>
     
      <section className="CPageHeader">
        <h1>{char.name}</h1>
        <h4>Created by <Link to={`/user=${char.creator}`}>{creator}</Link></h4>
      </section>
      <section className="Main">
        {myCreation&&<Link to={`editor`}><button>Edit Character</button></Link>}
        <div>{char.description}</div>
        <div className="Relationships">
        </div>
      </section>
    </div>
  )
}

export default CharacterPage