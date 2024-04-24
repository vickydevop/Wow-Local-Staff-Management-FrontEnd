import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetsterProfileCardComponent } from './getster-profile-card.component';

describe('GetsterProfileCardComponent', () => {
  let component: GetsterProfileCardComponent;
  let fixture: ComponentFixture<GetsterProfileCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetsterProfileCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetsterProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
