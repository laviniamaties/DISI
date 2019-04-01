import './student-styles.css';
import React, { PureComponent } from 'react';

interface IStudentHomePageState {

}

interface IStudentHomePageProps {

}
export default class StudentHomePage extends PureComponent<IStudentHomePageState, IStudentHomePageProps> {
    constructor(props: IStudentHomePageProps) {
        super(props);
    }

    public render(): any {
        return (
            <div className='divWrapper'>
                This is student home page
            </div>
        )
    }

    private func = () => {

    }
}
