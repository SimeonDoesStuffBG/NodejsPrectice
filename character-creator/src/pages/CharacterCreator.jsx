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
    const onCreateChar=()=>{

    }

  return (
    <form>
        <table>
            <MyInput name="Name"/>
            <MyInput name="Gender"/>
            <MyInput type="textarea" name="Description"/>
            <MyInput type="file" name="Picture"/>
        </table>
        <input type="submit" value="Create Character"/>
    </form>
  )
}

CharacterCreator.propTypes = {
    onCreate:PropTypes.func.isRequired,
    creator:PropTypes.number
}

export default CharacterCreator