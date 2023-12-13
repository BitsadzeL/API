import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../interfaces/job';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiURL = 'https://localhost:44330/api/User';

  constructor(private http: HttpClient) {}

  getJobOptions(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiURL + '/jobs');
  }


  registerUser(userData:any):Observable<any>{
    return this.http.post(this.apiURL+'/register',userData);
  }
}
