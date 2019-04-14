import './secretary-styles.css';
import React, { PureComponent } from 'react';
import SecretaryForm from '../../Components/secretary-form';

interface ISecretaryHomePageProps {

}

interface ISecretaryHomePageState {

}
export default class SecretaryHomePage extends PureComponent<ISecretaryHomePageState, ISecretaryHomePageProps> {
    constructor(props: ISecretaryHomePageProps) {
        super(props);
    }

    public render(): any {
        return (
            <div className='divWrapper'>
                This is secretary home page
                <SecretaryForm />
            </div>
        )
    }

    private func = () => {

    }
}
