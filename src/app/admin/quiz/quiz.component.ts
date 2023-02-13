import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Quiz, QuizData, QuizResponse } from 'src/app/models/quiz';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  styles: [`
        :host ::ng-deep button {
            margin-right: .25em;
        }
  `],
  providers: [ConfirmationService, MessageService]
})
export class QuizComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('vid') videoPlayer!: ElementRef;

  isLoading: boolean = false;
  msgs: Message[] = [];
  addDisplay: boolean = false;
  editDisplay: boolean = false;

  addQuizGroup!: FormGroup;
  editQuizGroup!: FormGroup;

  qizDataBody: Quiz = new Quiz();


  quizData!: QuizData;




  public quizBody!: {};
  public quizUpdateBody!: {};
  quizSubscription!: Subscription;
  percentage: number = 0;
  protected _id!: string;
  total!: number;
  pagesize!: number;



  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private apiService: ApiService
  ) {

  }
  ngAfterViewInit(): void {
    this.videoPlayer.nativeElement.addEventListener('timeupdate', (event: any) => {
      this.trackVideoProgress(event);
    });
  }
  trackVideoProgress(event: any) {
    const video = event.target;
    const duartionPercentage = (video.currentTime / video.duration) * 100;
    // console.log(duartionPercentage);
    this.percentage = Math.round(duartionPercentage);
    console.log(`Video progress: ${this.percentage}%`);
  }

  ngOnInit(): void {
    this.loadForm();
    this.loadEditForm();
    this.getQuiz();


    // if ((typeof this.quizData.meta?.pagination?.total !== 'undefined') && (typeof this.quizData.meta?.pagination?.pageSize !== 'undefined')) {
    //   this.total = this.quizData.meta?.pagination?.total;
    //   this.pagesize = this.quizData.meta?.pagination?.pageSize;


    // }
  }
  // ngAfterViewInit() {

  // }




  /**
   * getQiz
   */
  public getQuiz(): void {
    this.isLoading = true;
    this.quizSubscription = this.apiService.getQuiz().subscribe(res => {
      this.isLoading = false;
      try {
        this.isLoading = false;
        console.log(res);
        this.quizData = res;
        console.log(this.quizData);
      } catch (error) {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Somrthing went to wrong !!' });
        this.isLoading = false;
      }

    });
    // this.isLoading = false;
  }



  // Add Form validation
  public loadForm(): void {
    this.addQuizGroup = this.fb.group({
      syllabus: new FormControl('', [Validators.required]),
      question: new FormControl('', [Validators.required]),
      answer: new FormControl('', [Validators.required]),
      option1: new FormControl('', Validators.required),
      option2: new FormControl('', Validators.required),
      option3: new FormControl('', Validators.required),
      option4: new FormControl('', Validators.required),
    })
  }

  // Edit Form validation
  public loadEditForm(): void {
    this.editQuizGroup = this.fb.group({
      syllabus: new FormControl('', [Validators.required]),
      question: new FormControl('', [Validators.required]),
      answer: new FormControl('', [Validators.required]),
      option1: new FormControl('', Validators.required),
      option2: new FormControl('', Validators.required),
      option3: new FormControl('', Validators.required),
      option4: new FormControl('', Validators.required),
    })
  }

  // Open add dialog
  public addDialog(): void {
    this.addDisplay = true;
  }
  // Close add dialog
  public addCancel(): void {
    this.addDisplay = false;
    this.addQuizGroup.reset();
  }


  public onSubmitQuestion(): void {
    this.addDisplay = false;
    console.log(this.addQuizGroup.value);

    this.quizBody = {
      "data": {
        "all_answer": {
          "A": this.addQuizGroup.value.option1,
          "B": this.addQuizGroup.value.option2,
          "C": this.addQuizGroup.value.option3,
          "D": this.addQuizGroup.value.option4
        },
        "syllabus": this.addQuizGroup.value.syllabus,
        "question": this.addQuizGroup.value.question,
        "correct_answer": this.addQuizGroup.value.answer
      }
    }

    // this.qizDataBody.data!.all_answer!.A = this.addQuizGroup.value.option1;
    // this.qizDataBody.data!.all_answer!.B = this.addQuizGroup.value.option2;
    // this.qizDataBody.data!.all_answer!.C = this.addQuizGroup.value.option3;
    // this.qizDataBody.data!.all_answer!.D = this.addQuizGroup.value.option4;
    // this.qizDataBody.data!.syllabus = this.addQuizGroup.value.syllabus;
    // this.qizDataBody.data!.question = this.addQuizGroup.value.question;
    // this.qizDataBody.data!.correct_answer = this.addQuizGroup.value.answer;



    this.apiService.postQuiz(this.quizBody).subscribe(res => {
      try {
        console.log('quiz response', res);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Question added sucessfully ' });
        this.getQuiz();
      } catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went to wrong !!' })
      }
      this.addQuizGroup.reset();
    });
  }

  // open edit form and validation
  public editDialog(item: any): void {
    this._id = item.id;
    console.log(item);
    this.editQuizGroup = this.fb.group({
      syllabus: new FormControl(item.attributes.syllabus, [Validators.required]),
      question: new FormControl(item.attributes.question, [Validators.required]),
      answer: new FormControl(item.attributes.correct_answer, [Validators.required]),
      option1: new FormControl(item.attributes.all_answer.A, Validators.required),
      option2: new FormControl(item.attributes.all_answer.B, Validators.required),
      option3: new FormControl(item.attributes.all_answer.C, Validators.required),
      option4: new FormControl(item.attributes.all_answer.D, Validators.required),
    })
    this.editDisplay = true;
  }

  // close edit form
  public editCancel(): void {
    this.editDisplay = false;
  }

  public onEditQuestion(): void {
    this.editDisplay = false;
    console.log(this.editQuizGroup.value);

    this.quizUpdateBody = {
      "data": {
        "all_answer": {
          "A": this.editQuizGroup.value.option1,
          "B": this.editQuizGroup.value.option2,
          "C": this.editQuizGroup.value.option3,
          "D": this.editQuizGroup.value.option4
        },
        "syllabus": this.editQuizGroup.value.syllabus,
        "question": this.editQuizGroup.value.question,
        "correct_answer": this.editQuizGroup.value.answer
      }
    }
    this.apiService.updateQuiz(this._id, this.quizUpdateBody).subscribe(res => {
      try {
        console.log(res);
        this.messageService.add({ severity: 'info', summary: 'Update', detail: ' Updated sucessfully' });
        this.getQuiz();
      } catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went to wrong !!' })
      }
    });

  }

  // open delete dialog
  public deleteDialog(data: any): void {
    this.confirmationService.confirm({
      message: `Do you want to delete - ${data.attributes.question} ?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.apiService.deleteQuiz(data.id).subscribe(res => {
          try {
            this.getQuiz();
            this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Deleted sucessfully' });
          } catch (error) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went to wrong' });
          }
        })
      },
      reject: () => {
        // this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  ngOnDestroy(): void {
    // this.quizSubscription.unsubscribe();
  }
}
