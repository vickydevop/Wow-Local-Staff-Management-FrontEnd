import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEIdentityCardEligibilityComponent } from './user-e-identity-card-eligibility.component';

describe('UserEIdentityCardEligibilityComponent', () => {
  let component: UserEIdentityCardEligibilityComponent;
  let fixture: ComponentFixture<UserEIdentityCardEligibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEIdentityCardEligibilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEIdentityCardEligibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
