export default class BackendRequestHandler {

    constructor() {
    }

    public static getRequest = (backendUrl: string): Promise<any> => {
        return fetch(backendUrl, {
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
        return fetch(backendUrl, {
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

    public static postRequest = (backendUrl: string, body: any): Promise<any> => {
        return fetch(backendUrl, {
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
        return fetch(backendUrl, {
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
