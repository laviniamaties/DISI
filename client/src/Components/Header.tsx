import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import './Header.css';
import AuthService from '../Services/auth-service';

class Header extends Component {
    constructor(props: any) {
        super(props);
    }
    state = {
        nodes: [{
            title: "Home",
            link: '/'
        },
        {
            title: "Teachers",
            link: '/teachers'
        },
        {
            title: "Students",
            link: '/students'
        },
        {
            title: "Secretary",
            link: '/secretary'
        },
        {
            title: "Grades",
            link: '/grades'
        }
        ]
    };

    renderNode(node: any, index: number): JSX.Element {
        return (
            <div key={index}>
                <Link to={node.link}>
                    <span>{node.title}</span>
                </Link>
            </div>
        );
    }
    // {location.pathname}
    render() {
        return (
            <div className="header">
                <div className="header-nodes">
                    {this.state.nodes.map(this.renderNode)}
                </div>
                <div className="header-nodes logout" onClick={() => AuthService.logout()}>
                    <div><span>Logout</span></div>
                </div>
            </div>
        );
    }
}

export default Header;
