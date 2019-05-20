import React, { PureComponent } from 'react'
import HttpService from '../Services/http-service';

export default class StudentListComponent extends PureComponent<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            studentList: [],
            err: ''
        }
    }

    public componentWillMount(): void {
        HttpService.doGetRequest('users')
            .then(res => {
                this.setState({
                    studentList: res.filter((item: any) => item.role === 0)
                });
            })
            .catch(err => {
                this.setState({
                    err
                })
            })
    }


    public render(): any {
        const { studentList } = this.state;
        return(
            <div className="list-group" style={{marginTop: 16}}>
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
