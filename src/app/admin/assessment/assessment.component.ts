import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {

  addDisplay: boolean = false;
  editFormDisplay: boolean = false;

  addFormGroup!: FormGroup;
  editFormGroup!: FormGroup;


  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.addFormValidate();
    this.editFormValidate();
  }

  // Add form validation
  addFormValidate(): void {
    this.addFormGroup = this.fb.group({
      question: new FormControl('', [Validators.required]),
      option1: new FormControl('', [Validators.required]),
      option2: new FormControl('', [Validators.required]),
      option3: new FormControl('', [Validators.required]),
      option4: new FormControl('', [Validators.required])
    });
  }


  // Edit form validation
  editFormValidate(): void {
    this.editFormGroup = this.fb.group({
      question: new FormControl('', [Validators.required]),
      option1: new FormControl('', [Validators.required]),
      option2: new FormControl('', [Validators.required]),
      option3: new FormControl('', [Validators.required]),
      option4: new FormControl('', [Validators.required])
    });
  }

  // open add dialog
  addDialog(): void {
    this.addDisplay = true;
  }

  // close add dialog
  closeDialog(): void {
    this.addDisplay = false;
  }

  // On submit add from 
  onSubmit(): void {
    this.addDisplay = false;
    console.log('add form data', this.addFormGroup.value);
  }

  // open edit form
  editFormDialog(): void {

    // console.log('edit from data', item);
    this.editFormGroup = this.fb.group({
      question: new FormControl('', [Validators.required]),
      option1: new FormControl('', [Validators.required]),
      option2: new FormControl('', [Validators.required]),
      option3: new FormControl('', [Validators.required]),
      option4: new FormControl('', [Validators.required])
    });
    this.editFormDisplay = true;
  }


  colseEditDialog(): void { 
    this.editFormDisplay = false;
  }

  onUpdate(){
    this.editFormDisplay = false;
    console.log(this.editFormGroup.value);
  }

}
