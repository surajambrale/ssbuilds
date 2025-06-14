import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-our-work',
  imports: [CommonModule,RouterModule],
  standalone: true,
  templateUrl: './our-work.component.html',
  styleUrls: ['./our-work.component.scss']
})
export class OurWorkComponent {
 projects = [
    { id: 1, src: 'assets/images/gif.jpg' },
    { id: 2, src: 'assets/images/gif.jpg' },
    { id: 3, src: 'assets/images/gif.jpg' },
    { id: 4, src: 'assets/images/home2.jpg' },
    { id: 5, src: 'assets/images/home2.jpg' },
    { id: 6, src: 'assets/images/home2.jpg' },
    // and more...
  ];

  currentPage = 1;
  perPage = 3;

  get paginatedProjects() {
    const start = (this.currentPage - 1) * this.perPage;
    return this.projects.slice(start, start + this.perPage);
  }

  get totalPages() {
    return Math.ceil(this.projects.length / this.perPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
