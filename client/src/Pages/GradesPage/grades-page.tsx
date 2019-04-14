
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import AuthService from '../../Services/auth-service';
import './grades-page.css';
import HttpService from '../../Services/http-service';
import { IStudyClass } from '../../Models/IStudyClass';

export default class GradesPage extends PureComponent<any, any> {
    state = {
        nodes: [
            {
                ID: 1,
                Title: "teadas"
            },
            {
                ID: 2,
                Title: "teaadas"
            },
            {
                ID: 3,
                Title: "tedsadsaadas"
            }
        ],
        activeClass: {
            id: 0,
            title: "",
            users: []
        },
        activeClassId: -1,
        message: ''
    }

    /**
     *
     */
    constructor(props: any) {
        super(props);
        this.renderNode = this.renderNode.bind(this);
        this.renderUsers = this.renderUsers.bind(this);
    }

    componentDidMount() {
        HttpService.doGetRequest<IStudyClass>('/studyclass').then(
            (result) => {
                this.setState({
                    nodes: result
                })
            }
        ).catch(error => console.log(error))

    }

    setActiveClass = (node: any) => {
        this.setState({
            activeClass: node,
            activeClassId: node.id,
            message: ""
        })
    }

    renderNode(node: any, index: number): JSX.Element {
        const activeClass = this.state.activeClassId === node.id ? "active" : "";
        return (
            <div onClick={() => this.setActiveClass(node)} key={index} className="col-sm-4">
                <div className={`panel panel-default ${activeClass}`}>
                    <div className="panel-heading">
                        <i className="fa fa-book"></i>
                    </div>
                    <div className="panel-body">
                        {node.title}
                    </div>
                </div>
            </div>
        );
    }

    private handleChange = (e: any, node: any) => {
        // node.grade = e.target.value;
        let activeClass = {...this.state.activeClass};
        let user = activeClass.users.find((u:any) => u.id === node.id) || {grade: 0};
        user.grade = e.target.value;
        this.setState({activeClass});
    }

    renderUsers(node: any, index: number): JSX.Element {
        return (
            <div key={index} className="row">
                <div className="col-sm-8">
                    {node.email}
                </div>
                <div className="col-sm-4 user">
                    <input
                        className="form-control"
                        type="number"
                        min={0}
                        max={10}
                        name="grade"
                        value={node.grade}
                        onChange={(e) => this.handleChange(e, node)}
                    />
                </div>
            </div>
        );
    }

    saveGrades(){
        HttpService.doPostRequest<any>('studyclass', this.state.activeClass).then(
            (result) => {
                this.setState({message: "Succes!"});
            }
        ).catch(error => {
            console.log(error);
        })
    }

    public render(): any {
        let isAuth = AuthService.isAuth();
        if (!isAuth) {
            return <Redirect to='/login' />;
        }
        return (
            <div className="container grades-container text-center">
                ADD GRADES
                <div className="row">
                    {this.state.nodes.map(this.renderNode)}
                </div>
                <div>USERS <div className="succesMessage">{this.state.message}</div>
                    {
                        this.state.activeClass.id !== -1 ?
                            <div>
                                {this.state.activeClass.users.map(this.renderUsers)}
                                {this.state.activeClass.users.length > 0 ?
                                    <button className="btn btn-primary" onClick={() => this.saveGrades()}>Save</button>
                                    : <div></div>
                                }
                            </div>
                            :
                            <div>
                            </div>
                    }
                </div>
            </div>
        )
    }
}
