import { useContext, useState } from "react";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";
import '../Styleshseets/login.css';

const Login = props => {
    const [user, setUser] = useState({ username: "", password: "" });
    const authContext = useContext(AuthContext);

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.login(user).then(data => {
            console.log(data);
            const { isAuthenticated, user } = data;
            if (isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
            }
            else
                console.log('failure')
        });
    }


    return (
        <main className="form-signin" >
            <form onSubmit={onSubmit}>
                <h1 className ="h3 mb-3 fw-normal login-title">Cottage Book</h1>
                <div className ="form-floating">
                    <input  
                        type="text" 
                        name="username" 
                        className="form-control"
                        id="floatingInput" 
                        placeholder="username" 
                        onChange={onChange}/>
                    <label htmlFor="floatingInput">Username</label>
                </div>
                <div className ="form-floating">
                    <input 
                        type ="password" 
                        name="password" 
                        className ="form-control" 
                        id="floatingPassword" 
                        placeholder="Password" 
                        onChange={onChange}/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <button className ="w-100 btn btn-lg btn-primary btn-login" type ="submit">Sign in</button>
            </form>
        </main >
    )
}

export default Login;