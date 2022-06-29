import React, { useEffect, useState } from 'react'
import {PropTypes} from 'prop-types';
import {useNavigate} from 'react-router-dom';
import MyInput from '../components/MyInput';

const CharacterCreator = ({curChar,onCreate,creator,otherChars}) => {
    const nav = useNavigate();

    useEffect(()=>{    
        console.log(otherChars)
        if(creator===-1){//if a user is not logged in we get redirected back to the main page
        nav("/");
        }
        if(curChar!==null){
            setName(curChar.name);
            setGender(curChar.gender);
            setDescription(curChar.description);

            setFriends(curChar.relationships.Friends);
            setEnemies(curChar.relationships.Enemies);
            setRelatives(curChar.relationships.Family);
            setLovers(curChar.relationships.Lovers);
        }
        },[]
    )
    const [name, setName] = useState('');
    const [gender, setGender]=useState('');
    const [description, setDescription]=useState('');
    
    const [friends,setFriends]=useState([]);
    const [relatives,setRelatives]= useState([]);
    const [enemies, setEnemies]= useState([]);
    const [lovers, setLovers]= useState([]);

    const onCreateChar=(e)=>{
        e.preventDefault();
        if(name.trim()===''){
            alert('You must enter a valid name');
            return;
        }
        if(gender==='')
            setGender('NA');

        const CreatedOn = new Date();
        const UpdatedOn = CreatedOn;
       

        onCreate({name:name, 
            creator:creator, 
            gender:gender, 
            description:description, 
            relationships:{
                Friends:friends,
                Enemies:enemies,
                Family:relatives,
                Lovers:lovers
            },
            featuredIn:[],
            createdOn:CreatedOn,
            upDatedOn:UpdatedOn});
        setName('');
        setGender('');
        setDescription('');
        nav(`/user=${creator}`);
    }

   
 return (
    <div>
    <h1>Character {curChar===null?"Creator":"Editor"}</h1>
    <form onSubmit={onCreateChar}>
        <table><tbody>
            <MyInput name="Name" value={name} onValueChange={e=>setName(e.target.value)}/>
            <MyInput name="Gender" value={gender} onValueChange={e=>setGender(e.target.value)}/>
            <MyInput type="textarea" name="Description" value={description} onValueChange={e=>setDescription(e.target.value)}/>
            <MyInput type="file" name="Picture"/>
        </tbody></table>
        {<table><tbody>
            <tr>
                <th>Friends</th>
                <th>Enemies</th>
                <th>Relatives</th>
                <th>Lovers</th>
            </tr>
            
            <tr>
                <td>include:</td>
                <td>include:</td>
                <td>include:</td>
                <td>include:</td>
            </tr>
            
            <tr>
                <td>
                    <ul>
                        {otherChars.map(char=>{return {id:char.id,name:char.name}}).filter(char=>(friends.every(ch=>ch.id!=char.id) && enemies.every(ch=>ch.id!=char.id))).map(char=>
                            <li key={char.id} onClick={()=>setFriends([...friends,char])} className="characterThing">{char.name}</li>)}
                    </ul>
                </td>
                <td>
                    <ul>
                        {otherChars.map(char=>{return {id:char.id,name:char.name}}).filter(char=>(friends.every(ch=>ch.id!=char.id) && enemies.every(ch=>ch.id!=char.id))).map(char=>
                            <li key={char.id} onClick={()=>setEnemies([...enemies,char])} className="characterThing">{char.name}</li>)}
                    </ul>
                </td>
                <td>
                    <ul>
                        {otherChars.map(char=>{return {id:char.id,name:char.name}}).filter(char=>(relatives.every(ch=>ch.id!==char.id)) && lovers.every(ch=>ch.id!=char.id)).map(char=>
                            <li key={char.id} onClick={()=>setRelatives([...relatives,char])} className="characterThing">{char.name}</li>)}
                    </ul>
                </td>
                <td> 
                    <ul>
                    {otherChars.map(char=>{return {id:char.id,name:char.name}}).filter(char=>(relatives.every(ch=>ch.id!==char.id)) && lovers.every(ch=>ch.id!=char.id)).map(char=>
                            <li key={char.id} onClick={()=>setLovers([...lovers,char])} className="characterThing">{char.name}</li>)}
                    </ul>
                </td>
            </tr>
            
            <tr>
                <td>included:</td>
                <td>included:</td>
                <td>included:</td>
                <td>included:</td>
            </tr>
            
            <tr>
                <td>
                    <ul>
                        {friends.map(friend=><li key={friend.id} onClick={()=>setFriends(friends.filter(fr=>friend.id!==fr.id))} className="characterThing">{friend.name}</li>)}
                    </ul>
                </td>
                <td>
                    <ul>
                        {enemies.map(enemy=><li key={enemy.id} onClick={()=>setEnemies(enemies.filter(en=>enemy.id!==en.id))} className="characterThing">{enemy.name}</li>)}
                    </ul>
                </td>
                <td>
                    <ul>
                        {relatives.map(enemy=><li key={enemy.id} onClick={()=>setRelatives(relatives.filter(en=>enemy.id!==en.id))} className="characterThing">{enemy.name}</li>)}
                    </ul>
                </td>
                <td>
                    <ul>
                        {lovers.map(enemy=><li key={enemy.id} onClick={()=>setLovers(lovers.filter(en=>enemy.id!==en.id))} className="characterThing">{enemy.name}</li>)}
                    </ul>
                </td>
            </tr>
        </tbody>
        </table>}
        <input type="submit" value="Create Character"/>
    </form>
    </div>
  )
}

CharacterCreator.propTypes = {
    onCreate:PropTypes.func.isRequired,
    creator:PropTypes.number
}

CharacterCreator.defaultProps = {
    curChar:null
  }

export default CharacterCreator