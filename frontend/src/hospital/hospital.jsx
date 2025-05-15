import React from "react";
import Header from "../template/common/header/header";
import Footer from "../template/common/footer/footer";
import Aside from "../template/common/Aside/Aside";
import Content from "../template/common/content/content"
import './hospital.css'

export default props => (
    <div className="layout">
        <Header />
        <Aside />
        <Content>
            {props.children}
        </Content>
        <Footer />
    </div>
)
