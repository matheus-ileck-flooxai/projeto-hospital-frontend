import React, { Component } from "react";
import Header from "../template/common/header/header";
import Footer from "../template/common/footer/footer";
import Aside from "../template/common/Aside/Aside";
import Content from "../template/common/content/content";
import './hospital.css';
import Alert from "react-s-alert"


export default class HospitalLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAside: true
        };
        this.toggleAside = this.toggleAside.bind(this);
    }

    toggleAside() {
        this.setState(prevState => ({
            showAside: !prevState.showAside
        }));
    }

    render() {
        return (
            <div className="layout">
                <div className="row">
                    <Header toggleAside={this.toggleAside} />
                </div>
                <div className="row">
                    <div className={this.state.showAside ? "col-md-2" : "hidden-aside"} id="aside">
                        {this.state.showAside && <Aside />}
                    </div>

                    <div className={this.state.showAside ? "col-md-10" : "col-md-12"} id="main-content">
                        <Content>
                            {this.props.children}
                        </Content>
                    </div>
                </div>
                <div className="row">
                    <Footer />
                </div>
                <Alert stack={{ limit: 3 }} timeout={3000} position="top-right" effect="slide" />

            </div>
        );
    }
}
