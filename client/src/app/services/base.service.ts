import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Logger} from '../shared/logger';

@Injectable()
export class BaseService {


    // headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    object: any;

    constructor(protected http: HttpClient = null,
                protected logger: Logger,
                protected className: string = null) {
        // constructor() {
        // this.object = new
    }

    get (path): Promise<any> {
        console.log ('getting %s data from server', path);
        return this.http.get('/api/' + path)
            .toPromise()
            .then(resp => {
                const body = resp;
                console.log ('got data', body);
                return body;
            })
            .catch(this.handleError);
    }

    save (object: any): Promise<any> {
        console.log('saving object ');
        console.debug(object);
        let request: any;

        if (object.id) {
            console.debug('update object - ' + typeof object);
            request = this.http.patch('/api/' + object.API_PATH + '/' + object.id, object, this.options);
        } else {
            console.debug('add object');
            request = this.http.post('/api/' + object.API_PATH, object, this.options);
        }
        return request.toPromise()
            .then(resp => {
                console.log('saved object');
                return (resp);
            })
            .catch(this.handleError);
    }

    delete (object: any): Promise<any> {
        console.debug ('deleting object')
        return this.http.delete('/api/' + object.API_PATH + '/' + object.id, this.options).toPromise()
            .then(resp => {
                console.log('deleted object');
                return (resp);
            })
            .catch(this.handleError);
    }


    protected handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error || '';
            const err = JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    }

}
