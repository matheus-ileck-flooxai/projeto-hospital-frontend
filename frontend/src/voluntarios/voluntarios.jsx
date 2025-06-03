import React from "react";
import Header from "../template/volunter/header/header";
import Content from "../template/volunter/content/content";
import Footer from "../template/common/footer/footer"
import './voluntarios.css'
import Alert from "react-s-alert"



export default props => (
        <div>
                <Header />
                <Content>
                        {props.children}
                </Content>
                <Footer />
                <Alert stack={{ limit: 3 }} timeout={3000} position="top-right" effect="slide" />

        </div>



)