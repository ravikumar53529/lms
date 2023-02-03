import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { CoursesComponent } from './courses/courses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  {
    path: 'content/:id', component: ContentDetailsComponent
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'courses', component: CoursesComponent
  },
  {
    path: 'quiz', component: QuizComponent
  },
  {
    path: 'assessment', component: AssessmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
