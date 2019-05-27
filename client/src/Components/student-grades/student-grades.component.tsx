import React, { PureComponent } from 'react';
import './student-grades.styles.css'
import HttpService from '../../Services/http-service';
import AuthService from '../../Services/auth-service';

export default class StudentGradesComponent extends PureComponent<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            nodes: [
            ]
        }
    }

    componentDidMount() {
        let id = AuthService.getAuthenticatedUser().id;

        HttpService.doGetRequest<any>('/student/' + id).then(
            (result) => {
                this.setState({
                    nodes: result
                })
            }
        ).catch(error => console.log(error))

    }

    private renderNodes = (node: any, index: number): any => {
        return (
            <div  key={index} className="row grade-item">
                <div className={"col-sm-10"}>{node.studyClass}</div>
                <div className={"col-sm-2"}>{node.grade}</div>
            </div>
        );
    }

    public render(): React.ReactNode {
        return (
            <div className={"container"}>
                <h3 className={"grade-item"}>Current semester grades</h3>
                <div className="list-group grades-list">
                    {this.state.nodes.map(this.renderNodes)}
                </div>
            </div>
        )
    }
}
