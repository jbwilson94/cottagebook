import React, {useState,useRef,useEffect} from 'react';
import AuthService from '../Services/AuthService';

const Register = props=>{
    const [user,setUser] = useState({username: "", password : "", role : ""});
    let timerID = useRef(null);

    useEffect(()=>{
        return ()=>{
            clearTimeout(timerID);
        }
    },[]);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const resetForm = ()=>{
        setUser({username : "", password : "",role : ""});
    }

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.register(user).then(data=>{
            resetForm();
        });
    }



    return(
        <div className="container addevent">
            <form onSubmit={onSubmit}>
                <h3>Add User</h3>
                <label htmlFor="username" className="sr-only">Username: </label>
                <input type="text" 
                       name="username" 
                       value={user.username}
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter Username"/>
                <label htmlFor="password" className="sr-only">Password: </label>
                <input type="password" 
                       name="password"
                       value={user.password} 
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter Password"/>
                <label htmlFor="role" className="sr-only">Role: </label>
                <input type="text" 
                       name="role"
                       value={user.role}  
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter role (admin/user)"/>
                <br/>
                <button className="btn btn-lg btn-primary btn-block btn-event" 
                        type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;