import { useContext } from "react";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";
import '../Styleshseets/navbar.css';

const NavBar = ({ setView }) => {
    const { user, setIsAuthenticated, setUser } = useContext(AuthContext);

    const onClickLogoutHandler = () => {
        AuthService.logout().then(data => {
            if (data.success) {
                setUser(data.user)
                setIsAuthenticated(false)
            }
        })
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-custom">
            <div className="container container-fluid shadow-risen">

                {/*Nav Brand*/}
                <button
                    type="button"
                    className="btn navbar-brand mt-2 mt-lg-0 btn-brand"
                    onClick={() => setView('cal')}>
                        Nine Mile Booking Portal
                </button>


                {/*Toggle Button*/}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav">

                    {/*Left Links*/}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        {/*Add Event*/}
                        <button type="button"
                            className="btn btn-link nav-item nav-link"
                            onClick={() => setView('addEvent')}>
                                Reserve
                        </button>

                        {/*Add User*/
                            user.role === "admin" ?
                                <button type="button"
                                    className="btn btn-link nav-item nav-link"
                                    onClick={() => setView('addUser')}>
                                    Add User
                                </button>
                                : null
                        }
                    </ul>

                    {/*Right Links*/}
                    <div class="d-flex align-items-center">
                        
                        {/*Logout*/}
                        <button type="button"
                            className="btn btn-primary btn-logout"
                            onClick={onClickLogoutHandler}>
                            Logout    
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;