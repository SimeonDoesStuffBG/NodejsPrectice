import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import MyInput from '../components/MyInput';

const CharacterEditor = ({character, relatedChars,creator,onEdit}) => {

    const nav = useNavigate();
    
    const [name,setName] = useState('');
    const [gender, setGender]=useState('');
    const [desc,setDesc] = useState('');
    
    const [friends,setFriends]=useState([]);
    const [relatives,setRelatives]= useState([]);
    const [enemies, setEnemies]= useState([]);
    const [lovers, setLovers]= useState([]);

    

    useEffect(()=>{
        const Initialize = ()=>{
            if(creator===-1){
                nav('/');
            }
            setName(character.name);
            setGender(character.gender);
            setDesc(character.description);

            setFriends(character.relationships.Friends);
            setEnemies(character.relationships.Enemies);
            setRelatives(character.relationships.Family);
            setLovers(character.relationships.Lovers);
        } 
    
        Initialize();
      },[])

    const onCharacterEdit=(e)=>{
        e.preventDefault();
    }

  return (
    <div>
        <h1>CharacterEditor</h1>
        <form onSubmit={onCharacterEdit}>
            <table><tbody>
                <MyInput type="text" name="Character name" value={name}/>
                <MyInput type="text" name="Gender" value={gender}/>
                <MyInput type="textarea" name="Description" value={desc}/>
                <tr>
                    <td>
                        <h5>Friends</h5>
                        <select size={relatedChars.length}>
                            {relatedChars.map(character=><option key={character.id} value={character.name}>{character.name}</option>)}
                        </select>
                    </td>
                    <td>
                        <h5>Enemies</h5>
                        <select size={relatedChars.length}>
                            {relatedChars.map(character=><option key={character.id} value={character.name}>{character.name}</option>)}
                        </select>
                    </td>
                    <td>
                        <h5>Family</h5>
                        <select size={relatedChars.length}>
                            {relatedChars.map(character=><option key={character.id} value={character.name}>{character.name}</option>)}
                        </select>
                    </td>
                    <td>
                        <h5>Lovers</h5>
                        <select size={relatedChars.length}>
                            {relatedChars.map(character=><option key={character.id} value={character.name}>{character.name}</option>)}
                        </select>
                    </td>
                </tr>
            </tbody></table>
        </form>
    </div>
  )
}

export default CharacterEditor