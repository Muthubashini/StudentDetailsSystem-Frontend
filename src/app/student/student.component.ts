import { Component } from '@angular/core';
import { StudentRepresentation } from '../module/student-representation';
import { StudentService } from '../service/student.service';
import { FormBuilder } from '@angular/forms';
import swal from 'sweetalert';

@Component({
  selector: 'app-student',
  standalone: false,
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {

  studentObj:StudentRepresentation = {};
  students: Array<any> = [];
  allStatus:any;

  statusValue:any;
  isEditStudent:boolean=false;
  dtDynamicVerticalScrollExample:any;

  constructor(
    private studentService:StudentService,
    public fb:FormBuilder
  ){}

  ngOnInit(): void {
    //this.isEditStudent == false;
    this.GetAllStudents();
}


EditStudent(student: any): void {
  this.studentObj = { ...student }; // Load student details into the form
  this.isEditStudent = true; // Switch to edit mode
}

SaveStudent(): void {
  if (this.isEditStudent) {
    this.UpdateStudent();
  } else {
    swal({
      title: "Are you sure?",
      text: "Do you want to add this student?",
      icon: "warning",
      dangerMode: true,
    }).then((willAdd) => {
      if (willAdd) {
        this.studentService.createStudent(this.studentObj).subscribe(() => {
          this.GetAllStudents(); // Refresh the student list
          swal("Success!", "Student has been added!", "success");
          this.ClearForm();
        });
      }
    });
  }
}

UpdateStudent(): void {
  swal({
    title: "Are you sure?",
    text: "Do you want to update this student's details?",
    icon: "warning",
    dangerMode: true,
  }).then((willUpdate) => {
    if (willUpdate) {
      this.studentService.createStudent(this.studentObj).subscribe(() => {
        this.GetAllStudents(); // Refresh the student list
        this.isEditStudent = false;
        swal("Updated!", "Student details have been updated!", "success");
        this.ClearForm();
      });
    }
  });
}

ClearForm(): void {
  this.studentObj = {};
  this.isEditStudent = false;
}


GetAllStudents(){
  this.studentService.GetAllStudents().subscribe(allData=>{
   this.students = allData; 
  })
}

DeleteStudentByCode(student_code: string): void{

      swal({
         title: "Are you sure",
         text: "That you want to Delete this Student?",
         icon: "warning",
         dangerMode: true,
       })
       .then(willDelete => {
         if (willDelete) {
         swal("Deleted!", "Student has been deleted!", "success");
         this.studentService.DeleteStudentByCode(student_code).subscribe(() => {
          this.GetAllStudents(); // Refresh the student list
          swal("Deleted!", "Student has been deleted!", "success");
        });
         }
       });
   }

   searchQuery:string = "";

   SearchStudentByCode(): void {
    if (this.searchQuery.trim() === '') {
      this.GetAllStudents(); // If search query is empty, show all students
    } else {
      this.studentService.GetStudentsByCode(this.searchQuery).subscribe((data) => {
        this.students = [data]; // Display only the searched student
      });
    }
  }  

}
