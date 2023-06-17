import React, { Component } from 'react';
import URLHelper from '../Helper/URLHelper';
import FetchHelper from '../Helper/FetchHelper';
import './../assets/css/LoginAdmin.css';
// import '';
class BaseLogin extends Component {
    state = {
        erreur: ""
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        let form = document.getElementById("login");
        let formData = new FormData(form);
        let object = {};
        formData.forEach((value, key) => object[key] = value);
        console.log(object);
        let response = await FetchHelper.getDataPost(URLHelper.urlgen(this.props.fetchAddress), object);
        console.log(response);
        if ("error" in response) {
            this.setState({ erreur: response.error.message })
        }
        else {
            let al = response.data.authLevel;
            if (al === 0) {
                // localStorage.setItem("token", response.data.token);
                localStorage.setItem("idClient", response.data.idOwner);
            }
            else if (al !== 0) {
                // localStorage.setItem("token", response.data.token);
                localStorage.setItem("idAdmin", response.data.idOwner);
            }
            localStorage.setItem("token", response.data.token);
            
            localStorage.removeItem("notLoggedIn");
            window.location.replace(this.props.redirectAddress);
        }

    }
    renderTitle() {
        if (this.props.title !== undefined) {
            return <h2 className='titleLogin fw-bolder text-center'>{this.props.title}</h2>
        }
        else return <h2 className='titleLogin fw-bolder text-center'>Login admin</h2>
    }
    render() {
        return (
            <React.Fragment>
                <div className='logAdmin card shadow '>
                    <div className='card-body row mt-md-5 mb-2'>
                        <div className='mb-2'>
                            {this.renderTitle()}
                            <br /><br />
                            <form action="" id='login' className='container d-flex flex-column justify-content-center align-items-center'>
                                <div className='formLogin' id='input'>
                                    <input className='inp' type="email" placeholder=" " name='login' id='field' />
                                    {/* <span className='labelInp'>Email </span> */}
                                </div>
                                <hr />
                                <div className='formLogin' id='input'>
                                    <input className='inp' type="password" placeholder=" " name='mdp' id='field' />
                                    {/* <span className='labelInp'>Mot de passe </span>      */}
                                </div>
                                <div>
                                    <p>{this.state.erreur}</p>
                                </div>
                                <br /><hr />
                                <button className='btn buttonLogin' type='submit' onClick={this.handleSubmit}>Connexion</button>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default BaseLogin;