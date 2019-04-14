
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import AuthService from '../../Services/auth-service';
import './grades-page.css';
import HttpService from '../../Services/http-service';
import {IStudyClass} from '../../Models/IStudyClass';

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
        activeClass: null
    }

    /**
     *
     */
    constructor(props: any) {
        super(props);
        this.renderNode = this.renderNode.bind(this);
    }

    componentDidMount(){
        HttpService.doGetRequest<IStudyClass>('/studyclass').then(
            (result) => {
                this.setState({
                    nodes: result
                })
                console.log(result);
            }
        ).catch(error => console.log(error))

    }

    setActiveClass = (node: IStudyClass) => {
        console.log(node);
    }

    renderNode(node: any, index: number): JSX.Element {
        return (
            <div onClick={() => this.setActiveClass(node)} key={index} className="col-sm-4">
                <div className="panel panel-default">
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

    // renderUsers(node: any, index: number): JSX.Element {
    //     return (
    //         <div onClick={() => this.setActiveClass(node)} key={index} className="col-sm-4">
    //             <div className="panel panel-default">
    //                 <div className="panel-heading">
    //                     <i className="fa fa-book"></i>
    //                 </div>
    //                 <div className="panel-body"> 
    //                     {node.title}
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }


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
                <div>USERS
                    
                </div>
            </div>
        )
    }
}
