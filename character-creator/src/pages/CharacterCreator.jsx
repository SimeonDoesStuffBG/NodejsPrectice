import React, { useState } from 'react'
import {PropTypes} from 'prop-types';
import {useNavigate} from 'react-router-dom';
import MyInput from '../components/MyInput';

const CharacterCreator = ({onCreate,creator}) => {
    const nav = useNavigate();
    if(creator===-1){//if a user is not logged in we get redirected back to the main page
        nav("/");
    }

    const [name, setName] = useState('');
    const [gender, setGender]=useState('');
    const [description, setDescription]=useState('');
    
    const onCreateChar=(e)=>{
        e.preventDefault();
        if(name.trim()===''||name.trim()!=name){
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
                Friends:[],
                Enemies:[],
                Family:[],
                Lovers:[]
            },
            featuredIn:[],
            createdOn:CreatedOn,
            upDatedOn:UpdatedOn});
        setName('');
        setGender('');
        setDescription('');
    }

  return (
    <form onSubmit={onCreateChar}>
        <table><tbody>
            <MyInput name="Name" value={name} onValueChange={e=>setName(e.target.value)}/>
            <MyInput name="Gender" value={gender} onValueChange={e=>setGender(e.target.value)}/>
            <MyInput type="textarea" name="Description" value={description} onValueChange={e=>setDescription(e.target.value)}/>
            <MyInput type="file" name="Picture"/>
        </tbody></table>
        <input type="submit" value="Create Character"/>
    </form>
  )
}

CharacterCreator.propTypes = {
    onCreate:PropTypes.func.isRequired,
    creator:PropTypes.number
}

export default CharacterCreator