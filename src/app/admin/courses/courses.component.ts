import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class CoursesComponent implements OnInit {
  data!: string | null;
  singleContent: any;

  addFormGrorup!: FormGroup;
  editFormGroup!: FormGroup;

  courseFileData: any;
  assignFileData: any;
  updateAssignFileData: any;
  updateFileData: any;

  courseData: any;
  editData: any;

  addDialogDisplay: boolean = false;
  editDialogDisplay: boolean = false;

  courseBody!: {};
  editCourseBody!: {};

  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {

  }

  ngOnInit(): void {

    this.getCourses();
    this.addFormValidation();
    this.editFormValidation();

  }

  addFormValidation(): void {
    this.addFormGrorup = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      courseFile: new FormControl('', Validators.nullValidator),
      assignFile: new FormControl('', Validators.nullValidator)
    })
  }

  editFormValidation(): void {
    this.editFormGroup = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      courseFile: new FormControl('', Validators.nullValidator),
      assignFile: new FormControl('', Validators.nullValidator)
    });
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addFormGrorup.get('courseFile')?.setValue(file);

      const formData = new FormData();
      formData.append('files', this.addFormGrorup.get('courseFile')?.value);

      this.apiService.uploadFile(formData).subscribe(res => {
        console.log(res[0].id);
        this.courseFileData = res[0].id;
      })
    }
  }

  onAssignFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addFormGrorup.get('assignFile')?.setValue(file);

      const formData = new FormData();
      formData.append('files', this.addFormGrorup.get('assignFile')?.value);

      this.apiService.uploadFile(formData).subscribe(res => {
        console.log(res[0].id);
        this.assignFileData = res[0].id;
      })
    }
  }


  onUpdateFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.editFormGroup.get('courseFile')?.setValue(file);

      const formData = new FormData();
      formData.append('files', this.editFormGroup.get('courseFile')?.value);

      this.apiService.uploadFile(formData).subscribe(res => {
        console.log(res[0].id);
        this.updateFileData = res[0].id;
      })
    }
  }

  onUpdateAssignFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.editFormGroup.get('assignFile')?.setValue(file);

      const formData = new FormData();
      formData.append('files', this.editFormGroup.get('assignFile')?.value);

      this.apiService.uploadFile(formData).subscribe(res => {
        console.log(res[0].id);
        this.updateAssignFileData = res[0].id;
      })
    }
  }

  getCourses(): void {
    this.apiService.getCourses().subscribe(res => {
      console.log('course data', res.data);
      try {
        this.courseData = res.data;
      } catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong !!' })
      }
    });
  }

  public addDialog(): void {
    this.addDialogDisplay = true;
  }

 public closeAddDialog(): void {
    this.addDialogDisplay = false;
  }

 public onSubmit(): void {
    console.log(this.addFormGrorup.value);
    const assignFile = this.assignFileData;
    const courseFile = this.courseFileData;
    this.courseBody = {
      'data': {
        'assignment': assignFile,
        'courseContent': courseFile,
        'courseDescription': this.addFormGrorup.value.description,
        'title': this.addFormGrorup.value.title,
      }

    }

    this.apiService.postCourse(this.courseBody).subscribe(res => {
      console.log(res);
      if (!res) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went to wrong !!' });
      }
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Course Added successfully !' });
      this.getCourses();
    });
    this.addDialogDisplay = false;
  }

  editDialog(data: any): void {
    console.log('edit data',data);
    this.editData = data;
    this.editFormGroup = this.fb.group({
      title: new FormControl(data.attributes.title, [Validators.required]),
      description: new FormControl(data.attributes.courseDescription, [Validators.required]),
      courseFile: new FormControl('', Validators.nullValidator),
      assignFile: new FormControl('', Validators.nullValidator)
    })
    this.editDialogDisplay = true;
  }

  closeEditDialog(): void {
    this.editDialogDisplay = false;
  }

  onUpdate(): void {
    console.log('old one', this.editData.id);
    console.log('update assign data', this.updateAssignFileData);
    console.log('file data', this.updateFileData);
    if (this.updateFileData == undefined  && this.updateAssignFileData == undefined) {
      this.editCourseBody = {
        'data': {
          // 'assignment': this.updateFileData,
          // 'courseContent': this.updateAssignFileData,
          'courseDescription': this.editFormGroup.value.description,
          'title': this.editFormGroup.value.title,
        }
      }
    } else {
      this.editCourseBody = {
        'data': {
          'assignment': this.updateFileData,
          'courseContent': this.updateAssignFileData,
          'courseDescription': this.editFormGroup.value.description,
          'title': this.editFormGroup.value.title,
        }
      }
    }


    this.apiService.updateCourse(this.editData.id, this.editCourseBody).subscribe(res => {
      try {
        console.log('updted course', res);
        this.getCourses();
        this.messageService.add({severity:'success',summary:'Success',detail:'Course updated successfully !'})
      } catch (error) {
        this.messageService.add({severity:'error',summary:'Error',detail:'Something went to wrong !!'});
      }
 
    })

  }

  deleteCourse(data: any): void {
    this.confirmationService.confirm({
      message: `Do you want to delete - ${data.attributes.title} ?`,
      header: 'Delete confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.apiService.deleteCourse(data.id).subscribe(res => {
          if (!res) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong !!' })
          }
          this.getCourses();
          this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Deleted successfully !' });
        });

      },
      reject: () => {

      }
    })
  }


}
