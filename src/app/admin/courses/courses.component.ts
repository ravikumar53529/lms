import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
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

  oldFile: any;
  oldAssignFile: any;

  courseData: any;
  editData: any;

  addDialogDisplay: boolean = false;
  editDialogDisplay: boolean = false;

  courseBody!: {};
  editCourseBody!: {};

  isLoading: boolean = false;

  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getCourses();
    this.addFormValidation();
    this.editFormValidation();
  }

  public addFormValidation(): void {
    this.addFormGrorup = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      courseFile: new FormControl('', Validators.nullValidator),
      assignFile: new FormControl('', Validators.nullValidator)
    })
  }

  public editFormValidation(): void {
    this.editFormGroup = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      courseFile: new FormControl('', Validators.nullValidator),
      assignFile: new FormControl('', Validators.nullValidator)
    });
  }

  public onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addFormGrorup.get('courseFile')?.setValue(file);
      const formData = new FormData();
      formData.append('files', this.addFormGrorup.get('courseFile')?.value);

      this.apiService.uploadFile(formData).subscribe(res => {
        try {
          console.log(res[0].id);
          this.courseFileData = res[0].id;
        } catch (error) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went to wrong !!' })
        }
      })
    }
  }

  public onAssignFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addFormGrorup.get('assignFile')?.setValue(file);
      const formData = new FormData();
      formData.append('files', this.addFormGrorup.get('assignFile')?.value);

      this.apiService.uploadFile(formData).subscribe(res => {
        try {
          console.log(res[0].id);
          this.assignFileData = res[0].id;
        } catch (error) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went to wrong' });
        }
      });
    }
  }


  public onUpdateFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.editFormGroup.get('courseFile')?.setValue(file);
      const formData = new FormData();
      formData.append('files', this.editFormGroup.get('courseFile')?.value);
      this.apiService.uploadFile(formData).subscribe(res => {
        try {
          console.log(res[0].id);
          this.updateFileData = res[0].id;
        } catch (error) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went to wrong' });
        }
      });
    }
  }

  public onUpdateAssignFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.editFormGroup.get('assignFile')?.setValue(file);
      const formData = new FormData();
      formData.append('files', this.editFormGroup.get('assignFile')?.value);
      this.apiService.uploadFile(formData).subscribe(res => {
        try {
          console.log(res[0].id);
          this.updateAssignFileData = res[0].id;
        } catch (error) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went to wrong' });
        }
      });
    }
  }

  // Get courses
  public getCourses(): void {
    this.isLoading = true;
    this.apiService.getCourses().subscribe(res => {
      try {
        this.courseData = res.data;
        console.log(this.courseData);
        this.isLoading = false;
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
      try {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Course Added successfully !' });
        this.getCourses();
      } catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went to wrong !!' });
      }
      this.addDialogDisplay = false;
    });

  }

  public editDialog(data: any): void {

    this.editData = data;
    this.editFormGroup = this.fb.group({
      title: new FormControl(data.attributes.title, [Validators.required]),
      description: new FormControl(data.attributes.courseDescription, [Validators.required]),
      courseFile: new FormControl('', Validators.nullValidator),
      assignFile: new FormControl('', Validators.nullValidator)
    })
    this.editDialogDisplay = true;
  }

  public closeEditDialog(): void {
    this.editDialogDisplay = false;
  }

  public onUpdate(): void {

    // console.log('update assign data', this.updateAssignFileData);
    // console.log('file data', this.updateFileData);

    if (this.updateFileData == undefined) {
      this.editCourseBody = {
        'data': {
          'assignment': this.updateAssignFileData,
          'courseContent': this.editData.attributes.courseContent.data.id,
          'courseDescription': this.editFormGroup.value.description,
          'title': this.editFormGroup.value.title,
        }
      }
    } else if (this.updateAssignFileData == undefined) {
      this.editCourseBody = {
        'data': {
          'assignment': this.editData.attributes.assignment.data.id,
          'courseContent': this.updateFileData,
          'courseDescription': this.editFormGroup.value.description,
          'title': this.editFormGroup.value.title,
        }
      }
    } else if (this.updateFileData == undefined && this.updateAssignFileData == undefined) {
      this.editCourseBody = {
        'data': {
          'assignment': this.editData.attributes.assessment.data.id,
          'courseContent': this.editData.attributes.courseContent.data.id,
          'courseDescription': this.editFormGroup.value.description,
          'title': this.editFormGroup.value.title,
        }
      }
    } else {
      this.editCourseBody = {
        'data': {
          'assignment': this.updateAssignFileData,
          'courseContent': this.updateFileData,
          'courseDescription': this.editFormGroup.value.description,
          'title': this.editFormGroup.value.title,
        }
      }
    }
    this.apiService.updateCourse(this.editData.id, this.editCourseBody).subscribe(res => {
      try {
        console.log('updted course', res);
        this.getCourses();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Course updated successfully !' });
        location.reload();
      } catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went to wrong !!' });
      }
    });
  }

  public deleteCourse(data: any): void {
    this.confirmationService.confirm({
      message: `Do you want to delete - ${data.attributes.title} ?`,
      header: 'Delete confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.apiService.deleteCourse(data.id).subscribe(res => {
          try {
            this.getCourses();
            this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Deleted successfully !' });
          } catch (error) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong !!' })
          }
        });
      },
      reject: () => { }
    })
  }

  goDetailPage(data: any) {
    this.router.navigateByUrl(`/admin/courses/${data.id}`);
    console.log(data);
    localStorage.setItem('courseData', JSON.stringify(data));
  }


}
