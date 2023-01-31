import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { ApiService } from '../services/api.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    styles: [`
        :host ::ng-deep button {
            margin-right: .25em;
        }
  `],
    providers: [ConfirmationService, MessageService]
})
export class AdminComponent implements OnInit {
    display: boolean = false;
    editDisply: boolean = false;
    contentData!: any;
    totalCourse: number = 0;
    public _id!: string;
    _data!: any;
    loadingSpinner = false;

    msgs: Message[] = [];

    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    loopData: any = [];
    url: string = "";
    updateContent!: {}
    contentBody!: {};
    editContentBody!: {};
    bodyData!: {};
    edit!: {}


    courseGroup!: FormGroup;

    courseUpdateGroup!: FormGroup;

    constructor(
        private router: Router,
        private apiService: ApiService,
        private fb: FormBuilder,
        private snackBar: MatSnackBar,
        private confirmationService: ConfirmationService,
        private messageService: MessageService

    ) {
    }



    showDialog(): void {
        this.display = true;
    }
    closeDialog(): void {
        this.display = false;
    }
    public items: any
    ngOnInit() {
        this.iconMenu();
        this.getContent();
        this.courseValidate();
        this.courseUpdateValidate();
    }



    iconMenu(): void {
        this.items = [{
            label: 'Action',
            items: [{
                label: 'Logout',
                icon: 'pi pi-sign-out mt-0 text-danger',
                command: () => {
                    this.onLogout();
                }
            },
            {
                label: 'Change Password',
                icon: 'pi pi-key ',
                command: () => {

                }
            }
            ]
        },

        ];
    }

    onLogout(): void {
        this.router.navigateByUrl('/login');
        localStorage.clear();
        location.reload();
    }


    // form validation

    courseValidate() {
        this.courseGroup = this.fb.group({
            title: new FormControl('', [Validators.required, Validators.minLength(8), Validators.min(1)]),
            description: new FormControl('', [Validators.required, Validators.minLength(10)]),
            price: new FormControl('', [Validators.required, Validators.minLength(2)]),
        })
    }

    // update validations
    courseUpdateValidate() {
        this.courseUpdateGroup = this.fb.group({
            title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.min(1)]),
            description: new FormControl("", [Validators.required, Validators.minLength(10)]),
            price: new FormControl('', [Validators.required, Validators.minLength(2)]),
        })
    }








    getContent(): void {
        this.loadingSpinner = true;
        this.apiService.getContent().subscribe((res) => {
            if (!res) {
                this.snackBar.open('Something went to wrong !!', 'Ok', {
                    duration: 3000
                })
            }


            this.contentData = res.data;
            this.totalCourse = this.contentData.length;
            console.log('content', this.totalCourse);
            this.loadingSpinner = false;

        })

    }



    onSubmitContent() {
        const author = localStorage.getItem('role')

        this.contentBody = {
            "data": {
                "name": this.courseGroup.value.title,
                "description": this.courseGroup.value.description,
                "author": author,
                "price": this.courseGroup.value.price,
                "media": [{
                    "createdAt": "2023-01-25T08:20:02.102Z",
                    "id": 2,
                    "name": "karim-manjra-4euubO4CasU-unsplash.jpg",
                    "alternativeText": null,
                    "caption": null,
                    "width": 3648,
                    "height": 5472,
                    "formats": {
                        "large": {
                            "ext": ".jpg",
                            "url": "/uploads/large_karim_manjra_4euub_O4_Cas_U_unsplash_45f2eff5b2.jpg",
                            "hash": "large_karim_manjra_4euub_O4_Cas_U_unsplash_45f2eff5b2",
                            "mime": "image/jpeg",
                            "name": "large_karim-manjra-4euubO4CasU-unsplash.jpg",
                            "path": null,
                            "size": 79.54,
                            "width": 667,
                            "height": 1000
                        },
                        "small": {
                            "ext": ".jpg",
                            "url": "/uploads/small_karim_manjra_4euub_O4_Cas_U_unsplash_45f2eff5b2.jpg",
                            "hash": "small_karim_manjra_4euub_O4_Cas_U_unsplash_45f2eff5b2",
                            "mime": "image/jpeg",
                            "name": "small_karim-manjra-4euubO4CasU-unsplash.jpg",
                            "path": null,
                            "size": 27.77,
                            "width": 333,
                            "height": 500
                        },
                        "medium": {
                            "ext": ".jpg",
                            "url": "/uploads/medium_karim_manjra_4euub_O4_Cas_U_unsplash_45f2eff5b2.jpg",
                            "hash": "medium_karim_manjra_4euub_O4_Cas_U_unsplash_45f2eff5b2",
                            "mime": "image/jpeg",
                            "name": "medium_karim-manjra-4euubO4CasU-unsplash.jpg",
                            "path": null,
                            "size": 51.36,
                            "width": 500,
                            "height": 750
                        },
                        "thumbnail": {
                            "ext": ".jpg",
                            "url": "/uploads/thumbnail_karim_manjra_4euub_O4_Cas_U_unsplash_45f2eff5b2.jpg",
                            "hash": "thumbnail_karim_manjra_4euub_O4_Cas_U_unsplash_45f2eff5b2",
                            "mime": "image/jpeg",
                            "name": "thumbnail_karim-manjra-4euubO4CasU-unsplash.jpg",
                            "path": null,
                            "size": 4.9,
                            "width": 104,
                            "height": 156
                        }
                    },
                    "hash": "karim_manjra_4euub_O4_Cas_U_unsplash_45f2eff5b2",
                    "ext": ".jpg",
                    "mime": "image/jpeg",
                    "size": 2143.93,
                    "url": "/uploads/karim_manjra_4euub_O4_Cas_U_unsplash_45f2eff5b2.jpg",
                    "previewUrl": null,
                    "provider": "local",
                    "provider_metadata": null,
                    "folderPath": "/",
                    "updatedAt": "2023-01-25T08:20:02.102Z",
                    "folder": null
                }]
            }
        }
        // Post api call here
        this.apiService.postContent(this.contentBody).subscribe(res => {
            console.log(res);
            if (!res) {

                this.messageService.add({
                    severity: 'error', summary: 'Eorr !!', detail: 'Something went wrong !!'

                });
            }
            this.getContent();

            this.closeDialog();

            this.messageService.add({
                severity: 'success', summary: 'Success', detail: 'Content added successfully !!'
            })

        });

    }

    // Edit dialog open
    editContentDialog(item: any) {
        console.log('edit', item);
        this._data = item;
        // this._id = item.id;
        this.courseUpdateGroup = this.fb.group({
            title: new FormControl(item.attributes.name, [Validators.required, Validators.minLength(5), Validators.min(1)]),
            description: new FormControl(item.attributes.description, [Validators.required, Validators.minLength(10)]),
            price: new FormControl(item.attributes.price, [Validators.required, Validators.minLength(1)]),
        })
        this.editDisply = true;

    }

    closeEditDialog() {
        this.editDisply = false;
    }

    onUpdateContent() {
        this.editDisply = false;
        console.log(this._id);

        console.log(this.courseUpdateGroup.value);


        this.editContentBody = {
            "data": {
                "name": this.courseUpdateGroup.value.title,
                "description": this.courseUpdateGroup.value.description,
                "author": this._data.attributes.author,
                "price": this.courseUpdateGroup.value.price,


            }
        }
        // Post api call here
        this.apiService.updateContent(this._data.id, this.editContentBody).subscribe(res => {
            console.log(res);
            if (!res) {

                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Somthing went to wrong !!' })
            }
            this.getContent();

            this.closeDialog();

            this.messageService.add({
                severity: 'info', summary: 'Update', detail: 'Content updated successfully !!'
            })

        });

    }


    deleteDialog(data: any) {
        this.confirmationService.confirm({
            message: `Do you want to delete - ${data.attributes.name} ?`,
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.apiService.deleteContent(data.id).subscribe(res => {
                    // this.snackBar.open('Content sucessfully deleted !', 'Ok', {
                    //     duration: 3000,
                    //     verticalPosition: this.verticalPosition,
                    //     horizontalPosition: this.horizontalPosition
                    // });

                    this.messageService.add({
                        severity: 'error', summary: 'Delete', detail: 'Content deleted successfully !'
                    })
                    if (!res) {
                        this.messageService.add({
                            severity: 'error', summary: 'Error', detail: 'Something went to wrong !!'
                        })
                    }
                    this.getContent();
                })

            },
            reject: () => {

            }
        });
    }

    setData(data: any) {
        localStorage.setItem('content', JSON.stringify(data));
    }


}


