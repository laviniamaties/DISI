import React, { Component, PureComponent } from 'react'
import { Link } from 'react-router-dom';

import './Header.css';
import AuthService from '../Services/auth-service';

class Header extends PureComponent<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            authenticatedUser: undefined,
            nodes: []
        }
    }

    public componentWillMount(): void {
        const authenticatedUser = AuthService.getAuthenticatedUser();
        const { role } = authenticatedUser;

        let nodes: any[] = [];
        switch (role) {
            case 0: {
                nodes = [ {
                    title: 'Home', link: '/student'
                }, {
                    title: 'Profile', link: '/student/profile'
                }, {
                    title: 'Grades', link: '/student/grades'
                } ];
                break;
            }
            case 1: {
                nodes = [ {
                    title: 'Home', link: '/teacher'
                }, {
                    title: 'Classes & Grades', link: '/teacher/classes'
                } ];
                break;
            }
            case 2: {
                nodes = [ {
                    title: 'Home', link: '/secretary'
                }, {
                    title: 'Enroll users', link: '/secretary/users'
                } ]
                break;
            }
        }

        this.setState({
            authenticatedUser, nodes
        })
    }

    // {location.pathname}
    public render(): any {
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

    private renderNode = (node: any, index: number): JSX.Element => {
        return (
            <div key={index}>
                <Link to={node.link}>
                    <span>{node.title}</span>
                </Link>
            </div>
        );
    }
}

export default Header;
