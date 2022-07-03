import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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
import PlotpointPage from './pages/PlotpointPage';
import PlotpointCreator from './pages/PlotpointCreator';

function App() {
  const serverURL = "http://localhost:5000/";

  const [users, setUsers]= useState([]);
  const [changedUsers,setChangedUsers]=useState([]);
  const [user,setUser] = useState(-1);

  const [characters,setCharacters]=useState([]);
  const [changedChars,setChangedChars]=useState([]);

  const [stories, setStories]=useState([]);
  const [changedStories,setChangedStories]=useState([]);

  const [plotpoints, setPlotpoints]=useState([]);
  const [changedPlots,setChangedPlots]=useState([]);
  //const nav =useNavigate();

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

  const onLogOff = ()=> {
    setUser(-1);
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
    const data= await res.json();
    updateCharacterInStory(data);
    setStories([...stories,data]);
  } 

  const onCreatePlotpoint = async(plotpoint, id)=>{
    const res=await fetch(`${serverURL}plotpoints`,{
      method:'post',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(plotpoint)
    })
    const data = await res.json();
    updateStoryPlotpoint(data);
    setPlotpoints([...plotpoints,data]);
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

  const updateStoryPlotpoint = async plotpoint=>{
    
    const storyToFix=await fetchStory(plotpoint.story);
    const storyPlotpoints = storyToFix.plotpoints.filter(plot=>plot.id!==plotpoint.id);
    
    storyPlotpoints.push({id:plotpoint.id, title:plotpoint.title, timeIndex:plotpoint.timeIndex});

    storyPlotpoints.sort((a,b)=>a.timeIndex-b.timeIndex);
    const charsToAdd=plotpoint.characters.filter(char=>storyToFix.characters.every(ch=>ch.id!==char.id));
    
    const fixxedStory={...storyToFix,
      plotpoints:storyPlotpoints,
      characters:[...storyToFix.characters,...charsToAdd],
      updatedOn:new Date()
    }

    const res = await fetch(`${serverURL}stories/${storyToFix.id}`,{
      method:'PUT',
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify(fixxedStory)
    });

    const data = await res.json();
    
    updateCharacterInStory(data);
    setStories(stories.map(story=>story.id===data.id?
      {...story, plotpoints:data.plotpoints, characters:data.characters, updatedOn:data.updatedOn}:story))
  }
  
  const updateCharacterInStory = (story)=>{
    characters.filter(char=>story.characters.some(ch=>ch.id===char.id) && char.featuredIn.every(stor=>stor.id!==story.id)).forEach(async(char)=>{
      const charToEdit = await fetchCharacter(char.id);
      
      const uppChar = {...charToEdit, 
        featuredIn:[...charToEdit.featuredIn,{id:story.id,title:story.title}], 
      }

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

    characters.filter(char=>char.featuredIn.some(st=>st.id===story.id) && story.characters.every(ch=>char.id!==ch.id)).forEach(
      async char=>{
        const charToEdit = await fetchCharacter(char.id);
      
        const uppChar = {...charToEdit, 
          featuredIn:charToEdit.featuredIn.filter(stor=>stor.id!==story.id),
          updatedOn:new Date()
        }
  
        const res = await fetch(`${serverURL}characters/${char.id}`, {
          method:'PUT',
          headers:{
            "Content-type":"application/json",
          },
          body:JSON.stringify(uppChar)
        })
        const data = await res.json();
        setCharacters(characters.map(charac=>charac.id===char.id?{...charac,featuredIn:data.featuredIn,updatedOn:data.updatedOn}:charac))
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

const onEditPlotpoint = async(plotpoint,id)=>{
  const plotpointToUpdate= await fetchPlotpoint(id);
  const uppPlot = {...plotpointToUpdate,
    title:plotpoint.title,
    description:plotpoint.description,
    timeIndex:plotpoint.timeIndex,
    characters:plotpoint.characters,
    updatedOn:plotpoint.updatedOn
  }

  const res= await fetch(`${serverURL}plotpoints/${id}`,{
    method:'PUT',
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify(uppPlot)
  })
  const data = await res.json();
  updateStoryPlotpoint(data);
  setPlotpoints(plotpoints.map(plot=>plot.id===id?{
    title:data.title,
    description:data.description,
    timeIndex:data.timeIndex,
    characters:data.characters,
    updatedOn:data.updatedOn
  }:plot))
}

const onUserDeleteComplete = async(id)=>{
  onLogOff();
  stories.filter(story=>story.creator===id).forEach(async story=>{
    await fetch(`${serverURL}stories/${story.id}`,{
      method:'DELETE'
    })
  });

  setStories(stories.filter(story=>id!==story.id));

  characters.filter(char=>char.creator===id).forEach(async char=> {
    await fetch(`${serverURL}characters/${char.id}`,{ 
      method:'DELETE'
    })
  })

  setCharacters(characters.filter(char=>id!==char.id));

  plotpoints.filter(plotpoint=>plotpoint.creator===id).forEach(async plotpoint=>{
    await fetch(`${serverURL}plotpoints/${plotpoint.id}`,{
      method:'DELETE'
    })
  })

  setPlotpoints(plotpoints.filter(plot=>plot.id!==id));

  await fetch(`${serverURL}users/${id}`, {
    method:'DELETE'
  })

  setUsers(users.filter(user=>user.id!==id));
  
}

const onUserDeleteAccOnly = async(id)=>{
  onLogOff();
  stories.filter(story=>story.creator===id).forEach(async story=>{
    const editedStory = {...story, creator:-1, upDatedOn:new Date()}
    const res = await fetch(`${serverURL}stories/${story.id}`,{
      method:'PUT',
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify(editedStory)
    })
    const data = await res.json();

    setStories(stories.map(stor=>stor.id===data.id?{...stor,creator:data.creator,updatedOn:data.updatedOn}:stor));
  });

  characters.filter(char=>char.creator===id).forEach(async char=> {
    const editedChar = {...char, creator:-1, upDatedOn:new Date()}
    const res = await fetch(`${serverURL}characters/${char.id}`,{
      method:'PUT',
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify(editedChar)
    })
    const data =await res.json();

    setCharacters(characters.map(ch=>ch.id===data.id?{...ch,creator:data.creator,updatedOn:data.updatedOn}:ch));
  })

  plotpoints.filter(plotpoint=>plotpoint.creator===id).forEach(async plotpoint=>{
    const editedPlot = {...plotpoint, creator:-1, upDatedOn:new Date()}
    const res = await fetch(`${serverURL}plotpoints/${plotpoint.id}`,{
      method:'PUT',
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify(editedPlot)
    })
    const data =await res.json();

    setPlotpoints(plotpoints.map(plot=>plot.id===data.id?{...plot,creator:data.creator,updatedOn:data.updatedOn}:plot));
  })

 await fetch(`${serverURL}users/${id}`, {
    method:'DELETE'
  })

  setUsers(users.filter(user=>user.id!==id));
  
}

const onStoryDelete = async(id,creator)=>{
  plotpoints.filter(plot=>plot.story===id).forEach(async plot=>{
    await fetch(`${serverURL}plotpoints/${plot.id}`,{
      method:'DELETE'
    })
  }
  )

  setPlotpoints(plotpoints.filter(plot=>plot.story!==id));

  characters.filter(char=>creator===char.creator).forEach(async char=>{
    const uppChar = {...char, 
      featuredIn:char.featuredIn.filter(feat=>feat.id!==id),
      updatedOn:new Date()};
    
      const res = await fetch(`${serverURL}characters/${char.id}`,{
        method:'PUT',
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify(uppChar)
      })

      const data = await res.json();
      setCharacters(characters.map(char=>char.id===data.id?{...char,featuredIn:data.featuredIn, updatedOn:data.updatedOn}:char))
    })
  
  await fetch(`${serverURL}stories/${id}`,{
    method:'DELETE'
  });
  setStories(stories.filter(story=>story.id!==id))
}

const onCharacterDelete = async (id, creator)=>{
  plotpoints.filter(plot=>plot.creator===creator).forEach(async plot=>{
    const uppPlot = {...plot,characters:plot.characters.filter(char=>char.id===id),updatedOn:new Date()}

    const res = await fetch(`${serverURL}plotpoints/${plot.id}`,{
      method:'PUT',
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify(uppPlot)
    });

    const data = await res.json();
    setPlotpoints(plotpoints.map(pl=>pl.id===data.id?{...pl,characters:data.characters,updatedOn:data.updatedOn}:pl))
  })

  stories.filter(story=>story.creator===creator).forEach(async story=>{
    const uppStory={...story, characters:story.characters.filter(char=>char.id!==id), updatedOn:new Date()}
    const res = await fetch(`${serverURL}stories/${story.id}`,{
      method:'PUT',
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify(uppStory)
    });

    const data = await res.json();
    setStories(stories.map(st=>st.id===story.id?{...st,characters:data.characters, updatedOn:data.updatedOn}:st));
  })

  characters.filter(char=>char.creator===creator&&char.id!==id).forEach(async char=>{
    const uppchar = {...char,
      relationships:{
        Friends:char.relationships.Friends.filter(friend=>friend.id!==id),
        Enemies:char.relationships.Enemies.filter(enemy=>enemy.id!==id),
        Family:char.relationships.Family.filter(relative=>relative.id!==id),
        Lovers:char.relationships.Lovers.filter(lover=>lover.id!==id)
      },
      updatedOn:new Date()
    }

    const res = await fetch(`${serverURL}characters/${char.id}`,{
      method:'PUT',
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify(uppchar)
    })

    const data = await res.json();
    setCharacters(characters.map(ch=>ch.id===data.id?{...ch,relationships:data.relationships, updatedOn:data.updatedOn}:ch));
  })

  await fetch(`${serverURL}characters/${id}`,{
    method:'DELETE'
  })

  setCharacters(characters.filter(char=>char.id!==id));
}

const onPlotpointDelete = async (id,story)=>{
  const storyToUpdate = await fetchStory(story);
  const upStory = {...storyToUpdate,plotpoints:storyToUpdate.plotpoints.filter(plot=>plot.id!==id),updatedOn:new Date()};

  const res = await fetch(`${serverURL}stories/${story}`,{
    method:'PUT',
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify(upStory)
  })
  
  const data = await res.json();
  setStories(stories.map(stor=>stor.id===story?{...stor,plotpoints:data.plotpoints, updatedOn:data.updatedOn}:stor))

  await fetch(`${serverURL}plotpoints/${id}`,{
    method:'DELETE'
  })

  setPlotpoints(plotpoints.filter(plot=>plot.id!==id));
}
  useEffect(()=>{
    const Init = async()=>{
      const chars = await fetchCharacters();
      const stories = await fetchStories();
      const plotpoints = await fetchPlotpoints();
      const users = await fetchUsers();
      
      setUsers(users);
      setStories(stories);
      setCharacters(chars);
      setPlotpoints(plotpoints);
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

  const fetchPlotpoints = async()=>{
    const plots = await fetch(`${serverURL}plotpoints`);
    const data = await plots.json();

    return data;
  }

  const fetchPlotpoint = async(id)=>{
    const plot = await fetch(`${serverURL}plotpoints/${id}`);
    const data =await plot.json();

    return data;
  }

  const fetchStory = async(id)=>{
    const story = await fetch(`${serverURL}stories/${id}`);
    const data = await story.json();

    return data;
  }
  return (
    <Router className="App">
      <Nav loggedUser={user} LogOff={onLogOff}/>
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
              myCreation={character.creator!==-1&&user===character.creator}
              onDelete={onCharacterDelete} 
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
            <Route path={`/story=${story.id}`} element={<StoryPage story={story} myStory={story.creator!==-1&&story.creator===user} onDelete={onStoryDelete}/>}/>
            <Route path={`/story=${story.id}/editor`} element={<StoryCreator curStory={story} onCreate={onEditStory} creator={user} characters={characters.filter(char=>char.creator===story.creator)}/>}/>
            <Route path={`/story=${story.id}/plotpoint-creator`} element={<PlotpointCreator onCreate={onCreatePlotpoint} story={story} characters={characters.filter(char=>char.creator===story.creator)} creator={user}/>}/>
           
          </React.Fragment>
        )}

        {plotpoints.map(plot=>
              <React.Fragment key={plot.id}>
                <Route path={`/plotpoint=${plot.id}`} element={<PlotpointPage plotpoint={plot} myPlotpoint={plot.creator!==-1&&plot.creator===user} onDelete={onPlotpointDelete}/>}/>
                <Route path={`/plotpoint=${plot.id}/editor`} element={<PlotpointCreator curPlotpoint={plot} story={stories.filter(story=>story.id===plot.story)[0]} onCreate={onEditPlotpoint} characters={characters.filter(char=>char.creator===plot.creator)} creator={user}/>}/>
              </React.Fragment>  
        )}

        {users.map(thisUser=>
          <Route key={thisUser.id} 
            path={`/user=${thisUser.id}`} 
            element={<UserPage user={thisUser} 
            isLogged={thisUser.id===user} 
            characters={characters.filter(char=>char.creator===thisUser.id)} 
            stories={stories.filter(story=>story.creator===thisUser.id)}
            completeDel={onUserDeleteComplete}
            accDelOnly={onUserDeleteAccOnly}/>}/>)}
      
        
      </Routes>
    </Router>
  );
}

export default App;
