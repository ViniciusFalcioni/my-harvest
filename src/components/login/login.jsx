import React from "react";
import "./LoginPage.css";
import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa";
import ImageFundo from '../images/bg-login.jpg';
import Logo from '../images/logo.png';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const LoginPage = () => {
    return (
        <div className="login-page">
            <div className="login-left">
                <img src={ImageFundo} alt="Login visual" />
            </div>
            <div className="login-right">
                <img src={Logo} alt="Logo" className="logo" />
                <div className="form-container">
                    <h2>Entrar</h2>
                    <form className="login-form">
                        <label>Usuário</label>
                        <input type="email" placeholder="Digite seu e-mail" required />

                        <label>Senha</label>
                        <input type="password" placeholder="Digite sua senha" required />

                        <div className="login-options">

                            <Link to="/login">Esqueceu a senha?</Link>
                        </div>

                        <button type="submit">Entrar</button>

                        <p className="signup">
                            Ainda não tem uma conta? <Link to="/register">Cadastre-se</Link>
                        </p>

                        <div className="social-login">
                            <p>Ou entre com</p>
                            <div className="icons">
                                <FaFacebookF className="icon fb" />
                                <FaGoogle className="icon google" />
                                <FaApple className="icon apple" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;