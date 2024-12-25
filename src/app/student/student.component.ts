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


SaveStudent():void{
      swal({
        title: "Are you sure?",
        text: "That you want to Add this details?",
        icon: "warning",
        dangerMode: true,
      })
      .then(willDelete => {
        if (willDelete) {
          this.studentService.createStudent(this.studentObj)
          .subscribe({
            next:(result):void=>{
              this.GetAllStudents();  
            }
          });
          swal("Sucessfull!", "Student has been Adedd!", "success");
        }
       
      });    
}

GetAllStudents(){
  this.studentService.GetAllStudents().subscribe(allData=>{
   this.students = allData; 
  })
}

DeleteStudentByCode(student_code:string){

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
          console.log('Plant deleted:', student_code);
          this.GetAllStudents(); // Refresh the student list.
        });
         }
       });
   }

}
