import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetsterProfileLoginComponent } from './getster-profile-login.component';

describe('GetsterProfileLoginComponent', () => {
  let component: GetsterProfileLoginComponent;
  let fixture: ComponentFixture<GetsterProfileLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetsterProfileLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetsterProfileLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
