import React, { PureComponent } from 'react';
import './student-grades.styles.css'

export default class StudentGradesComponent extends PureComponent<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            nodes: [
                {
                    ID: 1,
                    title: "DISI",
                    grade: 9
                },
                {
                    ID: 2,
                    title: "Distributed Systems",
                    grade: 4
                },
                {
                    ID: 3,
                    title: "Logic Design",
                    grade: 7
                }
            ]
        }
    }

    private renderNodes = (node: any, index: number): any => {
        return (
            <div  key={index} className="row grade-item">
                <div className={"col-sm-10"}>{node.title}</div>
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
