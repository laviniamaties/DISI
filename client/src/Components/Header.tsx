import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import './Header.css';

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
            </div>
        );
    }
}

export default Header;
