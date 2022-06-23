import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {PropTypes} from 'prop-types'

const Nav = ({loggedUser}) => {
    const [user,setUser] =useState({});

    useEffect(()=>{
        const getUser = async() =>{
        
            if(loggedUser!=-1){
                const user = await fetch(`http://localhost:5000/users/${loggedUser}`);
                const data = await user.json();
                setUser(data);
            }
        }
        
        getUser();
    }, [loggedUser]);

  return (
    <div>
        <Link to="/"> Main Page</Link>
        <div className="user">
            {loggedUser===-1 ? <div className="userEnter">
            <Link to="/sigin">Sign in</Link>
            |<Link to="/login">Log in</Link>
            </div> : <Link to={`/user=${loggedUser}`}><p>{user.username}</p></Link>}
        </div>
    </div>
  )
}

Nav.propTypes = {
    loggedUser: PropTypes.number
}

Nav.defaultProps = {
    loggedUser: -1
}

export default Nav