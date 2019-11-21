import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  dbList: AngularFireList<any>;


  constructor(private firebase: AngularFireDatabase)
   { }



 insertstudent(student){
   this.firebase.list('student').push({
    name: student.name,
    college: student.college,
   })
 }

 getStudentDetails(){
  this.dbList = this.firebase.list('student');
  return this.dbList;
}

/**
 *This method is use for delete the existing user $key 
 */
deleteStudent($key) 
{
  this.dbList.remove($key);
}

// populateForm(student)  // edit student
//   {
//     this.studentform.setValue(student); // edit button ...shw
//     // all changes l to r 
//   }

/**
 *This method is use for update the existing user 
 */
  update(student) 
  {
    this.dbList.update(student.$key,
      {
        name: student.name,
        college: student.college,
      });
  }

}



 
