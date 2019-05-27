import axios from 'axios';

export default class HttpService {
    private static root: string = 'http://localhost:26689/api/';

    public static doGetRequest<T>(url: string): Promise<T[]> {
        return new Promise((resolve, reject) => {
            axios.get(this.root + url).then((response: any) => {
                resolve(response.data);
            })
            .catch(
                (error: any) => {-
                    reject(error.response);
            })
        })
    }

    public static doPostRequest<T>(url: string, body: T): Promise<T> {
        return new Promise((resolve, reject) => {
            axios.post(this.root + url, body).then((response: any) => {
                resolve(response.data);
            })
            .catch(
                (error: any) => {
                    reject(error.response);
            })
        })
    }

    public static doUpdateRequest<T>(url: string, body: T): Promise<T> {
        return new Promise((resolve, reject) => {
            axios.put(this.root + url, body).then((response: any) => {
                resolve(response.data);
            })
            .catch(
                (error: any) => {
                    reject(error.response);
            })
        })
    }

}
