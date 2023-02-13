import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {

  protected id!: any;
  courseData!: {};

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {

  }


  ngOnInit(): void {
    this.route.params.subscribe(res => {
      this.id = res['id'];
      console.log(this.id);
    });
    let courseDetails: any = localStorage.getItem('courseData');

    this.courseData = JSON.parse(courseDetails);
    console.log(this.courseData);
  }

  public getSingleCourse(): void {
    this.apiService.getSingleCourse(this.id).subscribe(res => {
      try {
        console.log(res);
      } catch (error) {

      }
    });
  }

}
