import React, { Component } from 'react';
import { PureComponent } from "react";
import HttpService from '../Services/http-service';
import Select from "react-select";

export default class ExamPlanning extends PureComponent<any, any> {
    constructor(props: any)
    {
        super(props)

        this.state = {
            teachers: [], 
            groups: [], 
            classes: [],
            datetime: null,
            teacher: null, 
            group: null, 
            class: null
        }
    }

    componentDidMount()
    {
        HttpService.doGetRequest<any>('/users')
            .then(
                (result) =>
                {
                    this.setState({
                        teachers: result.filter((u: any) => u.role == 1)
                    })
                    console.log(result)
                }
            )
        HttpService.doGetRequest<any>('/group')
            .then(
                (result) =>
                {
                    this.setState({
                        groups: result
                    })
                    console.log(result)
                }
            )
        HttpService.doGetRequest<any>('/studyClass')
            .then(
                (result) =>
                {
                    this.setState({
                        classes: result
                    })
                    console.log(result)                }
            )
    }

    handleGroupSelectChange = () => (value: any) =>{
        this.setState({
            group: value
        })
    }

    handleTeacherSelectChange = () => (value: any) => {
        this.setState({
            teacher: value
        })
    }

    handleClassSelectChange = () => (value: any) =>{
        this.setState({
            class: value
        })
    }

    handleDateTime = (e: any) => {
        console.log(e.target.value)
        this.setState({
            datetime: e.target.value
        })
    }

    addExam = () => {
        console.log(this.state)
        HttpService.doPostRequest<any>('/exam', {
            "GroupID": this.state.group.value,
            "UserID": this.state.teacher.value,
            "StudyClassID": this.state.class.value,
            "Date": this.state.datetime
        })
        .then(
            (result) =>
            {

                console.log(result)
            }
        )
    }

    public render(): any
    {
        let groupOptions = this.state.groups.map((s: any) => ({
            label: s.title,
            value: s.id
        }));
        let classOptions = this.state.classes.map((s: any) => ({
            label: s.title,
            value: s.id
        }));
        let teachOptions = this.state.teachers.map((s: any) => ({
            label: s.email,
            value: s.id
        }));
        return (
            <div className="container">
                <div className="row m-2">
                    <div className="col-sm-4">Start date:</div>
                    <div className="col-sm-8"><input className="form-control" style={{width: '400px'}}  type="datetime-local"
                        onChange={this.handleDateTime}/></div>
                </div>
                <div className="row m-2">
                    <div className="col-sm-4">Group:</div>
                    <div className="col-sm-8">
                        <Select
                            options={groupOptions}
                            value={this.state.group}
                            autosize={true}
                            onChange={this.handleGroupSelectChange()}
                            placeholder="Select Values"
                        />
                    </div>                </div>
                <div className="row m-2">
                    <div className="col-sm-4">Teacher:</div>
                    <div className="col-sm-8">
                        <Select
                            options={teachOptions}
                            value={this.state.teacher}
                            autosize={true}
                            onChange={this.handleTeacherSelectChange()}
                            placeholder="Select Values"
                        />
                    </div>                </div>
                <div className="row m-2">
                    <div className="col-sm-4">Class:</div>
                    <div className="col-sm-8">
                        <Select
                            options={classOptions}
                            value={this.state.class}
                            autosize={true}
                            onChange={this.handleClassSelectChange()}
                            placeholder="Select Values"
                        />
                    </div>                </div>
                <div className="row d-flex justify-content-center mt-3">
                    <button className="btn btn-success" onClick={this.addExam}>Save</button>
                </div>
            </div>
        )
    }
}
