import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OurWorkComponent } from '../our-work/our-work.component';
import { ClientReviewComponent } from '../client-review/client-review.component';
import { JoinFormComponent } from '../join-form/join-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule,OurWorkComponent,ClientReviewComponent,JoinFormComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
 formVisible: boolean = false;

  showForm() {
    this.formVisible = true;
  }

  hideForm() {
    this.formVisible = false;
  }
   
}
