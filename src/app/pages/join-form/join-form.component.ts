import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({ 
  selector: 'app-join-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './join-form.component.html',
  styleUrls: ['./join-form.component.scss']
})
export class JoinFormComponent implements OnInit {
  @Output() onClose = new EventEmitter<void>();

  formData = {
    name: '',
    phone: '',
    projectDescription: ''
  };

  submittedForms: any[] = []; 
  editId: string | null = null;
  isSubmitting = false;

  // Update with your API endpoint
  // private API_URL = 'http://localhost:3000/enquiries';
  private API_URL = 'https://ssbuilds.onrender.com/enquiries';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadSubmissions();
  }

  // Retrieve submissions from API
  loadSubmissions() {
    this.http.get<any[]>(this.API_URL).subscribe({ 
      next: (data) => (this.submittedForms = data),
      error: (err) => console.error('Error loading submissions!', err)
    });
  }

  // Submit form
  submitForm(form: NgForm) {
    if (form.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    this.isSubmitting = true;

    if (this.editId) {
      // Update existing entry
      this.http.put(`${this.API_URL}/${this.editId}`, this.formData).subscribe({ 
        next: () => {
          alert('Form updated successfully!');
          this.isSubmitting = false;
          this.loadSubmissions();
          this.resetForm();
        },
        error: (err) => {
          console.error('Update error!', err);
          this.isSubmitting = false;
        }
      });
    } else {
      // Create new entry
      this.http.post(this.API_URL, this.formData).subscribe({ 
        next: () => {
          alert('Form submitted successfully!');
          this.isSubmitting = false;
          this.loadSubmissions();
          this.resetForm();
        },
        error: (error) => {
          console.error('Submission error!', error);
          this.isSubmitting = false;
        }
      });
    }
  }

  // Edit form
  editForm(entry: any) {
    this.formData = {
      name: entry.name,
      phone: entry.phone,
      projectDescription: entry.projectDescription
    };
    this.editId = entry._id || entry.id;
  }

  // Delete form
  deleteForm(entry: any) {
    const id = entry._id || entry.id;
    if (!id) {
      alert('Invalid entry.');
      return;
    }

    if (confirm('Are you sure you want to delete this entry?')) {
      this.http.delete(`${this.API_URL}/${id}`).subscribe({ 
        next: () => {
          alert('Entry deleted successfully!');
          this.loadSubmissions();
          if (this.editId === id) this.resetForm();
        },
        error: (err) => console.error('Error!', err)
      });
    }
  }

  // Reset form
  resetForm() {
    this.formData = { name: '', phone: '', projectDescription: '' };
    this.editId = null;
    this.isSubmitting = false;
  }

  // Close form
  close() {
    this.resetForm();
    this.onClose.emit();
  }
}

