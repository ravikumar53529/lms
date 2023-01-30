import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, Message, MessageService } from 'primeng/api';

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
export class QuizComponent implements OnInit {

  data = [
    {
      "Q": "Software is defined as ___________",
      "op1": "set of programs, documentation & configuration of data",
      "op2": "set of programs",
      "op3": "documentation and configuration of data ",
      "op4": "None of the mentioned"


    },
    {
      "Q": "What is a Functional Requirement?",
      "op1": "specifies the tasks the program must complete",
      "op2": "specifies the tasks the program should not complete",
      "op3": "specifies the tasks the program must not work ",
      "op4": "All of the mentioned"
    }
  ]


  addDisplay: boolean = false;
  editDisplay: boolean = false;

  addQuizGroup!: FormGroup;
  editQuizGroup!: FormGroup;

  msgs: Message[] = [];


  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService:MessageService
  ) {

  }

  ngOnInit(): void {
    this.loadForm();
    this.loadEditForm();
  }

  // Add Form validation
  loadForm(): void {
    this.addQuizGroup = this.fb.group({
      question: new FormControl('', [Validators.required]),
      option1: new FormControl('', Validators.required),
      option2: new FormControl('', Validators.required),
      option3: new FormControl('', Validators.required),
      option4: new FormControl('', Validators.required),
    })
  }

  // Edit Form validation
  loadEditForm(): void {
    this.editQuizGroup = this.fb.group({
      question: new FormControl('', [Validators.required]),
      option1: new FormControl('', Validators.required),
      option2: new FormControl('', Validators.required),
      option3: new FormControl('', Validators.required),
      option4: new FormControl('', Validators.required),
    })
  }

  // Open add dialog
  addDialog(): void {
    this.addDisplay = true;
  }
  // Close add dialog
  addCancel(): void {
    this.addDisplay = false;
    this.addQuizGroup.reset();
  }


  onSubmitQuestion(): void {
    this.addDisplay = false;
    console.log(this.addQuizGroup.value);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Question added sucessfully ' })

    this.addQuizGroup.reset();
  }

  // open edit form and validation
  editDialog(item: any): void {
    console.log(item);
    this.editQuizGroup = this.fb.group({
      question: new FormControl(item.Q, [Validators.required]),
      option1: new FormControl(item.op1, Validators.required),
      option2: new FormControl(item.op2, Validators.required),
      option3: new FormControl(item.op3, Validators.required),
      option4: new FormControl(item.op4, Validators.required),
    })
    this.editDisplay = true;
  }

  // close edit form
  editCancel(): void {
    this.editDisplay = false;
  }

  onEditQuestion(): void {
    this.editDisplay = false;
    console.log(this.editQuizGroup.value);
    this.messageService.add({ severity: 'info', summary: 'Update', detail: ' Updated sucessfully' })

  }

  // open delete dialog
  deleteDialog(data: any) {
    this.confirmationService.confirm({
      message: `Do you want to delete - ${data.Q} ?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Deleted sucessfully' });
      },
      reject: () => {
        // this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }


}
