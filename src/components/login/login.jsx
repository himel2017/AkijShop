import React, { Component } from 'react';
class Login extends Component {
    state = {  }
    render() { 
        return (  
            <section className="login section">
                <div className="loginForm">
                    <div className="container pt-3">
                    <div className="row justify-content-sm-center">
                        <div className="col-lg-4 col-sm-10 col-md-4 col-lg-4 col-12"><div className="card  text-center">
                            <div className="card-body">
                                <div className="socialbtn">
                                    <p className="facebook"><i className="fab fa-facebook-f"></i> Signup with facebook</p>
                                    <p className="email"><i className="fab fa-google"></i> Login with email</p>
                                </div>
                                <p>or</p>
                                <form className="form-signin" action="confirm.html">
                                    <label for="">Please Enter your mobile phone number</label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                        <div className="input-group-text"><img src="assets/images/brand/bangladesh.png" alt=""/></div>
                                        </div>
                                            <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="+8801961122027" required />
                                    </div>
                                    <button className="btn btn-lg btn-primary">Confirm</button>
                                </form>
                                </div>
                            </div>
                        
                        </div>
                    </div>
                    </div>
                </div>
		</section>
        );
    }
}
 
export default Login;