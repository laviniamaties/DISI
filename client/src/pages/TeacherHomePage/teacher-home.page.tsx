
import React, { PureComponent } from 'react';

interface ITeacherHomePageState {

}

interface ITeacherHomePageProps {

}
export default class TeacherHomePage extends PureComponent<ITeacherHomePageState, ITeacherHomePageProps> {
    constructor(props: ITeacherHomePageProps) {
        super(props);
    }

    public render(): any {
        return (
            <div className='divWrapper'>
                This is teacher home page
            </div>
        )
    }

    private func = () => {

    }
}
