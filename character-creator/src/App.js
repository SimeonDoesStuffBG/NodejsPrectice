import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Main from './pages/Main';
import Nav from './components/Nav';
import React, {useState, useEffect} from 'react';
import Login from './pages/Login';
import UserPage from './pages/UserPage';
import CharacterCreator from './pages/CharacterCreator';
import CharacterPage from './pages/CharacterPage';
import StoryCreator from './pages/StoryCreator';
import StoryPage from './pages/StoryPage';

function App() {
  const serverURL = "http://localhost:5000/";

  const [users, setUsers]= useState([]);
  const [user,setUser] = useState(-1);
  const [characters,setCharacters]=useState([]);
  const [stories, setStories]=useState([]);
 
  useEffect(() => {
    const getUsers = async()=>{
      const usersFromServer = await fetchUsers();
      setUsers(usersFromServer);
    }

    getUsers();
  },[]);

  const fetchUsers = async()=>{
    const res = await fetch(`${serverURL}users`);
    let data = await res.json();

    return data;
  }

  const fetchCharacter = async(id)=>{
    const res = await fetch(`${serverURL}characters/${id}`);
    const data = await res.json();

    return data;
  }

  const userExists = async(username,email)=>{
    let users = await fetchUsers();
    let data=users.filter(user=>user.username===username||user.email===email);

    //console.log(data[0]);
    return data[0];
  }

  const onLogIn = async(username, password)=>{
    const user = await userExists(username, '');
    if(user===undefined || user.password!=password){
      alert("Wrong Username or Password");
      return false;
    }
    setUser(user.id);
    return true;
  }

  const onSignIn = async (user)=>{
    if(await userExists(user.username, user.email)!=undefined){
      alert("User already exists");
      return false;
    }
    const res = await fetch(`${serverURL}users`,{
      method:'POST',
      headers:{ 
        'Content-type':'application/json'
      },
      body:JSON.stringify(user)
    })
    
    const newUser= await res.json();
    setUsers([...users, newUser]);

    return true;
  }

  const onCreateCharacter=async (char,filler)=>{
    const res=await fetch(`${serverURL}characters`,{
      method:'POST',
      headers:{ 
        'Content-type':'application/json'
      },
      body:JSON.stringify(char)
    })
    setCharacters([...characters,res.json()]);
    return true;
  }

  const onCreateStory = async (story, id)=>{
    const res=await fetch(`${serverURL}stories`,{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(story)
    })
    updateCharacterInStory(res.json());
    setStories([...stories,res.json()]);
  } 

  const onEditStory = async(story, id)=>{
    const storyToUpdate = await fetchStory(id);
    const upStory = {...storyToUpdate, 
      title:story.title,
      characters:story.characters,
      updatedOn:story.updatedOn
    }

    const res = await fetch(`${serverURL}stories/${id}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(upStory)
    });

    

    const data=await res.json();
    updateCharacterInStory(data);

    setStories(stories.map(story=>story.id===id?{...story,
      title:data.title,
      characters:data.characters,
      updatedOn:data.updatedOn
    }:story))
  };

  const updateCharacterInStory = (story)=>{
    story.characters.forEach(async(char)=>{
      const charToEdit = await fetchCharacter(char.id);
      let featuredStories=charToEdit.featuredIn;
      featuredStories.push({id:story.id,title:story.title})
      
      featuredStories=featuredStories.sort((a, b)=>a-b).filter((a,b)=>{return b+1>=featuredStories.length||a.id!=featuredStories[b+1].id});
      
      const uppChar = {...charToEdit, 
        featuredIn:featuredStories}//.sort((a,b)=>{a.id-b.id}).filter((a,b)=>a.id!==b.id)}

      const res = await fetch(`${serverURL}characters/${char.id}`, {
        method:'PUT',
        headers:{
          "Content-type":"application/json",
        },
        body:JSON.stringify(uppChar)
      })
      const data = await res.json();
      setCharacters(characters.map(charac=>charac.id===char.id?{...charac,featuredIn:data.featuredIn}:charac))
    })
  }

  const onEditCharacter = async (character, id)=>{
    const charToUpdate = await fetchCharacter(id);
    const upChar = {...charToUpdate,
       name:character.name, 
       gender:character.gender,
       description:character.description,

       relationships:{
        Friends:character.relationships.Friends,
        Enemies:character.relationships.Enemies,
        Family:character.relationships.Family,
        Lovers:character.relationships.Lovers 
          },
      featuredIn:character.featuredIn,
      updatedOn:character.updatedOn 
      }

      console.log(upChar);
    const res = await fetch(`${serverURL}characters/${id}`,{
      method:'PUT',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(upChar)
    })

    const data = await res.json();

    setCharacters(characters.map(char=>
      character.id===char.id?{...char,
        name:data.name, 
        gender:data.gender,
        description:data.description,
 
        relationships:{
         Friends:data.relationships.Friends,
         Enemies:data.relationships.Enemies,
         Family:data.relationships.Family,
         Lovers:data.relationships.Lovers 
  },
  featuredIn:data.featuredIn,
  updatedOn:data.updatedOn
}:char))
  }

  useEffect(()=>{
    const Init = async()=>{
      const chars = await fetchCharacters();
      const stories = await fetchStories();
      setStories(stories);
      setCharacters(chars);
    } 

    Init();
  },[])

  const fetchCharacters = async()=>{
    const chars = await fetch(`${serverURL}characters`);
    const data = await chars.json();
    
    return data;
  } 

  const fetchStories = async()=>{
    const stories = await fetch(`${serverURL}stories`);
    const data = await stories.json();

    return data;
  }

  const fetchStory = async(id)=>{
    const story = await fetch(`${serverURL}stories/${id}`);
    const data = await story.json();

    return data;
  }
  return (
    <Router className="App">
      <Nav loggedUser={user}/>
      <Routes>
        <Route path="/" exact element={<Main characters={characters} stories={stories}/>}/>
        <Route path="/signin" element={<SignIn onSignIn={onSignIn}/>}/>
        <Route path="/login" element={<Login onLogIn={onLogIn}/>}/>
        <Route path="/character-creator" element={<CharacterCreator onCreate={onCreateCharacter} creator={user} otherChars={characters.filter(char=>char.creator===user)}/>}/>
        <Route path="/story-creator" element={<StoryCreator onCreate={onCreateStory} creator={user} characters={characters.filter(char=>char.creator===user)}/>}/>
        
        {characters.map(character=>
          <React.Fragment key={character.id}>
            <Route 
              path={`/character=${character.id}`} 
              element={<CharacterPage char={character}
               myCreation={user===character.creator}
               
              />}/>
              <Route
                path={`/character=${character.id}/editor`}
                element={<CharacterCreator
                curChar={character}
                onCreate={onEditCharacter}
                otherChars={characters.filter(char=>(char.creator===character.creator && char.id!==character.id))}
                creator={character.creator}/>}/>
            </React.Fragment>
            )}

        {stories.map(story=>
          <React.Fragment key={story.id}>
            <Route path={`/story=${story.id}`} element={<StoryPage story={story} myStory={story.creator===user}/>}/>
            <Route path={`/story=${story.id}/editor`} element={<StoryCreator curStory={story} onCreate={onEditStory} creator={user} characters={characters.filter(char=>char.creator===story.creator)}/>}/>
          </React.Fragment>
        )}

        {users.map(thisUser=>
          <Route key={thisUser.id} 
            path={`/user=${thisUser.id}`} 
            element={<UserPage user={thisUser} 
            isLogged={thisUser.id===user} 
            characters={characters.filter(char=>char.creator===thisUser.id)} 
            stories={stories.filter(story=>story.creator===thisUser.id)}/>}/>)}
      
        
      </Routes>
    </Router>
  );
}

export default App;
