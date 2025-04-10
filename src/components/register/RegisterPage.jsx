import React from "react";
import "./RegisterPage.css";
import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa";
import ImageFundo from "../images/bg-login.jpg";
import Logo from "../images/logo.png";

const RegisterPage = () => {
    return (
        <div className="register-page">
            <div className="register-left">
                <img src={ImageFundo} alt="Registro visual" />
            </div>
            <div className="register-right">
                <img src={Logo} alt="Logo" className="logo-register" />
                <div className="form-container">
                    <h2>Criar Conta</h2>
                    <form className="register-form">
                        <label>Nome Completo</label>
                        <input type="text" placeholder="Digite seu nome" required />

                        <label>Email</label>
                        <input type="email" placeholder="Digite seu e-mail" required />

                        <label>Senha</label>
                        <input type="password" placeholder="Crie uma senha" required />

                        <label>Confirmar Senha</label>
                        <input type="password" placeholder="Confirme sua senha" required />

                        <button type="submit">Cadastrar</button>

                        <p className="signup">
                            Já tem uma conta? <a href="/login">Entrar</a>
                        </p>

                        <div className="social-login">
                            <p>Ou cadastre-se com</p>
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

export default RegisterPage;
