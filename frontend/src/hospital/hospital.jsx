import React from "react";
import Header from "../template/hospital/header/header";
import Footer from "../template/hospital/footer/footer";
import Aside from "../template/hospital/Aside/Aside";
import Content from "../template/hospital/content/content"
import './hospital.css'

export default props => (
    <div className="layout">
        <Header />
        <Aside />
        <Content />
        <Footer />
    </div>
)
