import React from "react";
import Header from "../components/Layout/Header";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import Home from "../features/home/pages/Home";
import Footer from "../components/Layout/Footer";
import About from "../features/staticContent/pages/About";
import Pricing from "../features/staticContent/pages/Pricing";
import MeusAnuncios from "../components/MeusAnuncios/MeusAnuncios";
import Services from "../features/staticContent/pages/Services";
import Contact from "../features/staticContent/pages/Contact";
import Announce from "../components/Announce/Announce";
import AdDetailsPage from "../components/AdDetailsPage/AdDetailsPage";
import EditAd from "../components/Announce/EditAd/EditAd";
import LoginPage from "../components/login/login";
import RegisterPage from "../components/register/RegisterPage";

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
