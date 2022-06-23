import React, { useState} from 'react'

const UserPage = ({user}) => {
    console.log(user.username);

    const [characters, setCharacters]=useState([]);
    const [stories, setStories]=useState([]);
  return (
    <div>
        <h1>{user.username}</h1>
        <div class="charSheet">
            <h4>Characters</h4>
        </div> 
        <div class="storySheet">
            <h4>Stories</h4>
        </div>
    </div>
  )
}

export default UserPage