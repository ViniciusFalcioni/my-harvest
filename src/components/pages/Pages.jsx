import React from "react";
import Header from "../common/header/Header";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import Home from "../home/Home";
import Footer from "../common/footer/Footer";
import About from "../about/About";
import Pricing from "../pricing/Pricing";
import MeusAnuncios from "../MeusAnuncios/MeusAnuncios";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import Announce from "../Announce/Announce";
import AdDetailsPage from "../AdDetailsPage/AdDetailsPage";
import EditAd from "../Announce/EditAd/EditAd";
import LoginPage from "../login/login";
import RegisterPage from "../register/RegisterPage";

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const hideLayout = isLoginPage || isRegisterPage;

  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
};

const Pages = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/services' component={Services} />
          <Route exact path='/meus-anuncios' component={MeusAnuncios} />
          <Route exact path='/pricing' component={Pricing} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/anunciar' component={Announce} />
          <Route exact path='/anuncio/:id' component={AdDetailsPage} />
          <Route exact path='/editar-anuncio/:id' component={EditAd} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default Pages;
