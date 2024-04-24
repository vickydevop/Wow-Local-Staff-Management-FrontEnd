import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetsterProfileComponent } from './getster-profile.component';

describe('GetsterProfileComponent', () => {
  let component: GetsterProfileComponent;
  let fixture: ComponentFixture<GetsterProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetsterProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetsterProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
