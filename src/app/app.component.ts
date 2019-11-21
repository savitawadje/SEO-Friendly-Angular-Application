import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { element } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  students: any = [];
  setstudentlist: any = [];
  showDeletedMessage: boolean;
  studentform: FormGroup;
  names: any;
  colleges: any;
  constructor(private service: StudentService) { }

  ngOnInit() {

    this.studentform = new FormGroup({
      $key: new FormControl(null),
      name: new FormControl('', Validators.required),
      college: new FormControl(''),
    });

    this.getStudent();
  }

  onSubmit() {
    console.log("this.service.studentform.value", this.studentform.value)
    if (this.studentform.value.$key == null) {
      if (confirm("are you sure to uplodad the studentt info..?")) {
        this.service.insertstudent(this.studentform.value);
        this.studentform.reset();
      }
    } else {
      if (confirm(' Are you sure update the use info...?')) {
        this.service.update(this.studentform.value)
      }
    }
  }


  
  clear() {
    this.studentform.reset();
  }

  getStudent() {
    this.service.getStudentDetails().snapshotChanges().subscribe(res => {

      this.students = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.students.push(a);
      });
    });

  }

  onDelete($key) {
    if (confirm(' Are you sure to cancel this Addmission ?')) {
      this.service.deleteStudent($key);
      this.showDeletedMessage = true;
      setTimeout(() => this.showDeletedMessage = false, 3000);
    }
  }

  updateStudent(value: any) {

    console.log("value", value);

    this.studentform.setValue({
      $key: value.$key,
      name: value.name,
      college: value.college,
    });
  }


}
