export default class BackendRequestHandler {
    private static root: string = 'http://localhost:26689/api/';

    constructor() {
    }

    public static getRequest = (backendUrl: string): Promise<any> => {
        return fetch(BackendRequestHandler.root + backendUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json()
                .then(response => { return response; })
                .catch(error => { return new Error(error)})
            )
            .catch(error => {return new Error(error)});
    };

    public static deleteRequest = (backendUrl: string): Promise<any> => {
        return fetch(BackendRequestHandler.root + backendUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                response.json()
                    .then(response => { return response })
                    .catch(error => { return new Error(error); })
            })
            .catch(error => { return new Error(error); });
    };

    public static updateRequest = (backendUrl: string, body: any): Promise<any> => {
        return fetch(BackendRequestHandler.root + backendUrl, {
            method: 'UPDATE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => {return response.json()})
            .catch(error => {return new Error(error)});
    };


    public static postRequest = (backendUrl: string, body: any): Promise<any> => {
        return fetch(BackendRequestHandler.root + backendUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => {return response.json()})
            .catch(error => {return new Error(error)});
    };

    public static putRequest = (backendUrl: string, body: any): Promise<any> => {
        return fetch(BackendRequestHandler.root + backendUrl, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => {return response.json()})
            .catch(error => {return new Error(error)});
    };
}
