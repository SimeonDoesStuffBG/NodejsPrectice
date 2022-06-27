import React from 'react'

const StoryThumbnail = ({story}) => {
  
    const [creator,setCreator]=useState('');

    useEffect(()=>{
      const getCreator = async()=>{
        const theCreator = await fetch(`http://localhost:5000/users/${story.creator}`);
        const data =await theCreator.json();
        setCreator(data.username);
      }
      getCreator();
    },[]
    )

    return (
    <div className="Thumbnail-story">
        <img src={story.picture}/>
        <div>
            <h4>{story.name}</h4>
            <p>{creator}</p>
        </div>
    </div>
  )
}

export default StoryThumbnail