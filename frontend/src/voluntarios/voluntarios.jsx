import React from "react";
import Header from "../template/volunter/header/header";
import Content from "../template/volunter/content/content";
import Footer from "../template/common/footer/footer"
import './voluntarios.css'


export default props => (
        <div>
                <Header />
                <Content>
                        {props.children}
                </Content>
                <Footer />
        </div>



)