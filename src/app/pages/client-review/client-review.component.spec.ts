import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientReviewComponent } from './client-review.component';

describe('ClientReviewComponent', () => {
  let component: ClientReviewComponent;
  let fixture: ComponentFixture<ClientReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
