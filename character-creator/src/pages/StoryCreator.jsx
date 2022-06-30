import React, { useEffect, useState } from 'react'
import MyInput from '../components/MyInput'
import {useNavigate} from 'react-router-dom';

const StoryCreator = ({curStory,onCreate, creator, characters}) => {

    const nav= useNavigate();

    const [title,setTitle]=useState('');
    const [includedChars, setIncludedChars]=useState([]);

    useEffect(()=>{
        
        if(creator===-1)
            nav('/');
        if(curStory!==null){
            setTitle(curStory.title);
            setIncludedChars(curStory.characters);
        }
    },[])

    const onCreateStory=(e)=>{
        e.preventDefault();
        if(title.trim()===''){
            alert('Your story must have a title');
            return;
        }

        const CreatedOn = new Date();
        const UpdatedOn = CreatedOn;

        onCreate({
            title:title,
            creator:creator,
            characters:includedChars,
            plotpoints:[],
            createdOn:CreatedOn,
            updatedOn:UpdatedOn,
        },curStory!==null?curStory.id:-1);
        setTitle('');
        setIncludedChars([]);
        nav(`/user=${creator}`);
    }
  return (
    <div>
    <h1>Story {curStory===null?"creator":"editor"}</h1>
    <form onSubmit={onCreateStory}>
        <table><tbody>
            <MyInput name="Title" value={title} onValueChange={e=>setTitle(e.target.value)}/>
            <tr>
                <td>include characters: </td>
                <td>included characters: </td>
            </tr>
            <tr>
                <td>
                    <ul>
                        {characters.map(char=>{return {id:char.id, name:char.name}})
                        .filter(char=>includedChars.every(ch=>ch.id!==char.id))
                        .map(char=><li key={char.id} onClick={()=>setIncludedChars([...includedChars, char])} className="characterThing">{char.name}</li>)}
                    </ul>
                </td>
                <td>
                    <ul>
                        {includedChars.map(char=><li key={char.id} onClick={()=>setIncludedChars(includedChars.filter(ch=>ch.id!==char.id))} className="characterThing">{char.name}</li>)}
                    </ul>
                </td>
            </tr>
        </tbody></table>
        <input type="submit" value={curStory===null?"Create new Story":"Save Changes to story"}/>
    </form>
    </div>
  )
  }

  StoryCreator.defaultProps = {
    curStory:null
  }

export default StoryCreator