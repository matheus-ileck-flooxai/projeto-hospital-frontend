import React from "react";
import Header from "../template/common/header/header";
import Footer from "../template/common/footer/footer";
import Aside from "../template/common/Aside/Aside";
import Content from "../template/common/content/content"
import './hospital.css'

export default props => (
    <div className="layout">
        <div className="row">
            <Header />

        </div>
        <div className="row">
            <div className="col-md-2" id="aside">
                <Aside />
            </div>
            <div className="col-md-10" id="main-content">

                <Content>
                    {props.children}
                </Content>
            </div>

        </div>
        <div className="row">
            <Footer />

        </div>


    </div>
)
