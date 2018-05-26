import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class TaskService {

  headers: Headers;
  options: RequestOptions;

  endpointCriarTask: string = 'http://174.142.161.97:6344/taskctrl/tasks/criar';
  endpointTodasTasks: string = 'http://174.142.161.97:6344/taskctrl/tasks/listar-todas';
  endpointRemoverTask: string = 'http://174.142.161.97:6344/taskctrl/tasks/remover';
  endpointEditarTask: string = 'http://174.142.161.97:6344/taskctrl/tasks/editar';
  endpointConcluirTask: string = 'http://174.142.161.97:6344/taskctrl/tasks/concluir';

  
  getTasks(): Observable<any> {
    return this.http.get(this.endpointTodasTasks);
  }
  
  criarTask(param: any): Observable<any> {
    let body = JSON.stringify(param);
    console.log(body);
    return this.http
        .post(this.endpointCriarTask, body, this.options)
        .map(this.extractData)
        .catch(this.handleError);
  }

  removerTask(param: any): Observable<any> {
    let body = JSON.stringify(param);
    console.log(body);
    return this.http
        .put(this.endpointRemoverTask, body, this.options)
        .map(this.extractData);
  }

  editarTask(param: any): Observable<any> {
    let body = JSON.stringify(param);
    console.log(body);
    return this.http
        .put(this.endpointEditarTask, body, this.options)
        .map(this.extractData);
  }

  concluirTask(param: any): Observable<any> {
    let body = JSON.stringify(param);
    console.log(body);
    return this.http
        .put(this.endpointConcluirTask, body, this.options)
        .map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
      let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg);
      return Observable.throw(errMsg);
  }

  constructor(private http: Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json', 
                                 'Accept': 'application/json, */*'
                              });
    this.options = new RequestOptions({ headers: this.headers });
  }

}
