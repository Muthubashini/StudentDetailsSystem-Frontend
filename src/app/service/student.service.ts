import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl : string= 'http://localhost:8088/student'; 

  constructor(
    private http:HttpClient
  ) { }

  createStudent(student:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/add`, student);
  }

  GetAllStudents():Observable<any>{
    return this.http.get(`${this.baseUrl}/getAll`);
  }

  GetStudentsByCode(student_code:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/getByCode`);
  }

  DeleteStudentByCode(student_code:string):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/delete/${student_code}`);
  }
}
