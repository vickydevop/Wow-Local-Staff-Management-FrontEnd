import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveProfileChangesByUsersComponent } from './approve-profile-changes-by-users.component';

describe('ApproveProfileChangesByUsersComponent', () => {
  let component: ApproveProfileChangesByUsersComponent;
  let fixture: ComponentFixture<ApproveProfileChangesByUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveProfileChangesByUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveProfileChangesByUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
