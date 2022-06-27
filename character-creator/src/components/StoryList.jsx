import React, { useState } from 'react'

const StoryList = ({stories}) => {
    const [filter, setFilter] = useState('');

    const lookFor = (string,filter)=>{
        return filter==='' || string.toUpperCase().includes(filter.toUpperCase());
    }

    return (
    
    <div className="list-container">
        <input type="text" value={filter} onChange={e=>setFilter(e.target.value)} placeholder="SearchStory"/>
        <div className="list">{stories.filter(story=>lookFor(story.name,filter)).map(story=><storyThumbnail key={story.id} story={story}/>)}</div>
    </div>
  )
}

export default StoryList