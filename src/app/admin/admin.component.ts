import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    display: boolean = false;

    contentData!: any;
    loopData: any = [];
    url: string = "";

    courseGroup!: FormGroup;

    constructor(
        private apiService: ApiService,
        private fb: FormBuilder
    ) { }



    showDialog() {
        this.display = true;
    }
    public items: any
    ngOnInit() {

        this.getContent();
        this.iconMenu();
        this.courseValidate();
    }


    // form validation

    courseValidate() {
        this.courseGroup = this.fb.group({
            title: new FormControl('', [Validators.required, Validators.minLength(8), Validators.min(1)]),
            description: new FormControl('', [Validators.required, Validators.minLength(10)]),
            price: new FormControl('', [Validators.required, Validators.minLength(2)]),
            img: new FormControl('', [Validators.required])
        })
    }

    get formControls() {
        return this.courseGroup.controls;
    }

    iconMenu(): void {
        this.items = [{
            label: 'Action',
            items: [{
                label: 'Logout',
                icon: 'pi pi-sign-out mt-0 text-danger',
                command: () => {

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

    getContent(): void {
        this.apiService.getContent().subscribe((res) => {

            this.contentData = res.data;
            for (let i = 0; i < this.contentData.length; i++) {
                // const element = this.contentData[i];
                console.log(this.contentData[i].attributes);
                this.loopData.push(this.contentData[i].attributes)
                console.log(this.contentData[i].attributes.media.data[0].attributes.formats.thumbnail.url);
                this.url = this.contentData[i].attributes.media.data[0].attributes.formats.thumbnail.url;

            }

        })
    }

    // get title() {
    //     return this.courseGroup.get('title')!;
    // }

    // get description() {
    //     return this.courseGroup.get('description')!;
    // }
}
