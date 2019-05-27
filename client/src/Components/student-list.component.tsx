import React, { PureComponent } from 'react'
import HttpService from '../Services/http-service';

export default class StudentListComponent extends PureComponent<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            studentList: props.studentList,
            err: ''
        }
    }

    public componentWillReceiveProps(nextProps: any, nextState: any): void {
        const { studentList } = this.state;

        const newState: any = {};

        if (JSON.stringify(nextProps.studentList) !== JSON.stringify(studentList)) {
            newState.studentList = nextProps.studentList;
        }

        if (Object.keys(newState).length) {
            this.setState(newState);
        }
    }

    public render(): any {
        const { studentList } = this.state;
        return(
            <div className="list-group" style={{ marginTop: 16}}>
                <div className="list-group-item active">Students</div>
                {
                    studentList.map((item: any, index: number) => {
                        return (
                            <button
                                type="button"
                                className="list-group-item list-group-item-action"
                                onClick={this.selectStudent(item)}
                                key={index}
                            >
                                {item.email}
                            </button>
                        );
                    })
                }
            </div>
        )
    }

    private selectStudent = (student: any) => () => {
        this.props.onStudentSelect(student);
    }
}
