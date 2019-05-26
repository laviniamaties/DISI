import React, { Component } from 'react';
import { PureComponent } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import HttpService from '../Services/http-service';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }),
);

function DatePickers() {
    const classes = useStyles();

    return (
        <form className={classes.container} noValidate>
            <TextField
                id="date"
                label="Exam Date"
                type="date"
                defaultValue="2019-00-00"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </form>
    );
}

export default class ExamPlanning extends PureComponent<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {

        }
    }

    componentDidMount() { 
        HttpService.doGetRequest<any>('/users') 
        .then (
            (result) => {
                console.log(result)
            }
        )
        HttpService.doGetRequest<any>('/group') 
        .then (
            (result) => {
                console.log(result)
            }
        )
    HttpService.doGetRequest<any>('/studyClass') 
    .then (
        (result) => {
            console.log(result)
        }
    )
}

    public render(): any {

    

        return (
            <div>
                <DatePickers />
            </div>
            // <div style={{ width: '70%' }}>
            //     {this.renderGroups()}
            // </div>
        )
    }

    // private renderGroups = (): any =>
    // {
    //     const { studentGroups } = this.state;

    //     if (!studentGroups.length)
    //     {
    //         return null;
    //     }

    //     return (
    //         <div className="btn-group" role="group" aria-label="Basic example">
    //             {
    //                 studentGroups.map((item: any, index: number) =>
    //                 {
    //                     return (
    //                         <button type="button" className="btn btn-secondary" key={index} onClick={() => this.getStudentsByGroup(item.id)}>{item.title}</button>
    //                     );
    //                 })
    //             }
    //         </div>
    //     );
    // };

}
