import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratoreDashboard } from './collaboratore-dashboard';

describe('CollaboratoreDashboard', () => {
  let component: CollaboratoreDashboard;
  let fixture: ComponentFixture<CollaboratoreDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollaboratoreDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaboratoreDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
