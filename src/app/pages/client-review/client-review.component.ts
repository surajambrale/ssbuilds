import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-client-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-review.component.html',
  styleUrls: ['./client-review.component.scss']
})
export class ClientReviewComponent {
   testimonials = [
    { 
      text: '"Fantastic service!', 
      author: 'Siddhi Thakur',
      photo: 'assets/images/siddhireview.jpg'
    },
    // { 
    //   text: '"Excellent work!', 
    //   author: 'Priya Gupta',
    //   photo: 'assets/images/dummyimg1.jpeg'
    // },
    // { 
    //   text: '"Very professional!', 
    //   author: 'Sanjay Deshmukh',
    //   photo: 'assets/images/dummyimg2.jpeg'
    // },
    // aur bhi add kar sakte ho...
  ];

  paginatedTestimonials = this.testimonials;
  currentTestimonialIndex = 0;

  ngOnInit() {
    this.paginatedTestimonials = this.testimonials;
  }

  prevTestimonial() {
    if (this.currentTestimonialIndex > 0) {
      this.currentTestimonialIndex--;
    }
  }

  nextTestimonial() {
    if (this.currentTestimonialIndex < this.paginatedTestimonials.length - 1) {
      this.currentTestimonialIndex++;
    }
  }
}
