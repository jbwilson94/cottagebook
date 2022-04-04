import { useContext, useState } from "react";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";

const Login = props => {
    const [user, setUser] = useState({ username: "", password: "" });
    const authContext = useContext(AuthContext);
    const [error, setError] = useState("");

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        setUser({ ...user, username: user.username.toLowerCase()});
        fetch('user/login',{
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type':'application/json'
            }
        }).then(async (response) => {
            if(!response.ok) {
                if(response.status === 400) {
                    setError("Please fill all the feilds correctly!");
                } else if(response.status === 401){
                    setError("Invalid email and password combination");
                } else {
                    console.log(response);
                    setError("not sure what went wrong!");
                }
            } else {
                const data = await response.json();
                const { isAuthenticated, user } = data;
                if(isAuthenticated) {
                    authContext.setUser(user);
                    authContext.setIsAuthenticated(isAuthenticated);
                }
            }
        })
        /*
        AuthService.login(user).then(data => {
            console.log(data);
            const { isAuthenticated, user } = data;
            if (isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
            }
            else
                console.log('failure')
        }).catch((error) => {
            console.log(error);
        });
        */
    }


    return (
        <main className="login" >
            <form onSubmit={onSubmit} className="login-form">
                <h1 className ="login-title">Cottage Book</h1>
                <p className="error-text">{error}</p>
                <div className ="form-floating">
                    <input  
                        type="text" 
                        name="username" 
                        className="form-control"
                        id="floatingInput" 
                        placeholder="Email" 
                        onChange={onChange}/>
                    <label htmlFor="floatingInput">Email</label>
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