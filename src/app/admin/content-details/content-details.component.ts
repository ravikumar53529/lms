import { Component } from '@angular/core';


@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.scss'],
  
})
export class ContentDetailsComponent  {
  value: number = 0;
  messageService: any;
  ngOnInit() {
    let interval = setInterval(() => {
        this.value = this.value + Math.floor(Math.random() * 10) + 1;
        if (this.value >= 100) {
            this.value = 100;
            this.messageService.add({severity: 'info', summary: 'Success', detail: 'Process Completed'});
            clearInterval(interval);
        }
    }, 2000);
}

}
  

