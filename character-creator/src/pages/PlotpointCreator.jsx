import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import MyInput from '../components/MyInput';

const PlotpointCreator = ({curPlotpoint, story, onCreate, characters, creator}) => {

  const nav = useNavigate();
  
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');
  const [includedChars, setIncludedChars]=useState([]);
  const [timeIndex, setTimeIndex] = useState(1);

  useEffect(()=>{
    
    if(creator===-1 || creator!==story.creator){
      nav(`/story=${story.id}`);
    }
    if(curPlotpoint!==null){
      setTitle(curPlotpoint.title);
      setDescription(curPlotpoint.description);
      setIncludedChars(curPlotpoint.characters);
      setTimeIndex(curPlotpoint.timeIndex);
    }
  },[] )

  const onCreatePlotpoint = e=>{
    e.preventDefault();
    if(title.trim()===''){
      alert('The plotpoint must have a title');
      return;
    }
    const createdOn=new Date();
    const updatedOn=createdOn;

    onCreate({
      title:title,
      creator:creator,
      story:story.id,
      timeIndex:parseInt(timeIndex),
      description:description,
      characters:includedChars,
      createdOn:createdOn,
      updatedOn:updatedOn
    },curPlotpoint!==null?curPlotpoint.id:-1)

    nav(`/story=${story.id}`);
  }
 
  return (
    <div>
        <h1>Plotpoint {curPlotpoint===null?"creator":"editor"}</h1>
        <form onSubmit={onCreatePlotpoint}>
          <table><tbody>
            <MyInput name="title" value={title} onValueChange={e=>setTitle(e.target.value)}/>
            <MyInput name="description" type="textarea" value={description} onValueChange={e=>setDescription(e.target.value)}/>
            <MyInput name="time Index" type="number" value={timeIndex} onValueChange={e=>setTimeIndex(e.target.value)}/>
          </tbody></table>
          <table><tbody>
            <tr>
              <td><h4>Include characters:</h4></td>
              <td><h4>Included characters:</h4></td>  
            </tr>
            <tr>
              <td>
                <ul>
                  {characters.filter(char=>includedChars.every(ch=>ch.id!==char.id))
                  .map(char=><li key={char.id} className="characterThing" onClick={()=>setIncludedChars([...includedChars,{id:char.id,name:char.name}])}>{char.name}</li>)}
                </ul>
              </td>
              <td>
                {includedChars.map(char=>
                  <li key={char.id} className="characterThing" onClick={()=>setIncludedChars(includedChars.filter(ch=>ch.id!==char.id))}>{char.name}</li>)}
              </td>  
            </tr>  
          </tbody></table>
          <input type="submit" value={curPlotpoint===null?"Create new Plotpoint":"Save changes to plotpoint"}/>
        </form>
    </div>
  )
}

PlotpointCreator.defaultProps = {
  curPlotpoint:null
}

export default PlotpointCreator