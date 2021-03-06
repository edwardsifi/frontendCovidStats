import React, { useState } from "react";
//modulos
import { NavLink, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import validator from 'email-validator';
//context
import withContext from "../../withContext";

const Login = (props) => {
    //extrae el usuario del contexto
    const { user } = props.context;
    //state
    const [useremail, setuserEmail] = useState('');
    const [userpassword, setuserPassword] = useState('');
    const [validateemail, setvalidateEmail] = useState(false);
    //functions
    const handleChangeEmail = (e) => {
        setuserEmail(e.target.value);
        setvalidateEmail(validator.validate(e.target.value));
        let btn = document.getElementsByClassName('button-sign');
        let validate = validator.validate(e.target.value);

        if(validate == false){
            btn[0].setAttribute("disabled", "")
        }else{
            btn[0].removeAttribute("disabled");
        }   
    }

    const handleChangepassword = (e) => {
        setuserPassword(e.target.value);
    }

    const login = async () => {

        const email = useremail;
        const password = userpassword;
        // console.log(email);
        if (!email || !password) {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fill all fields!',
                // footer: '<a href="">Why do I have this issue?</a>'
            })
        }
        let loggedIn = await props.context.login(email, password);
        // console.log(props.context);
        // console.log(loggedIn);
        if (!loggedIn) {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid credentials!',
                // footer: '<a href="">Why do I have this issue?</a>'
            })
        }

    };

    return (user) ? (
        <Redirect to='/dashboard' />
    ) : (
        <>

            <main class="l-main">


                <section class="signup section">
                    <div class="signup__container bd-container bd-grid">
                        <h2 class="section-title-center signup__title">Log In</h2>
                        <p class="signup__description">Stay informed with us about covid-19 cases</p>
                        <div class="log-grid" action="">
                            <div class="signup__direction">
                                <input required id="validationDefault01" type="email" placeholder="Email" class="signup__input form-control" onChange={handleChangeEmail} value={useremail} />
                                <a href="#" class="button"></a>
                                <div class="alert alert-danger" role="alert">
                                    {validateemail ? <></> :   <i class='bx bxs-error'></i>}
                                </div>
                            </div>
                            <div class="signup__direction">
                                <input required type="password" id="validationDefault01" placeholder="Password" class="signup__input form-control" onChange={handleChangepassword} value={userpassword} />
                                <a href="#" class="button"></a>
                            </div>
                            <div class="buttons-log">
                                <button href="" class="log_button button-sign" onClick={login}>Log In</button>
                                <NavLink to="/" className="log_button">Home</NavLink>
                            </div>
                        </div>
                        <div class="signup__img">
                            <img src="https://escholarium.educarex.es/useruploads/ctx/a/4709137/r/s/2059309/coronavirus-5062160_1280.png" alt="" />
                        </div>
                    </div>


                </section>

            </main>


        </>
    )
}

export default withContext(Login);