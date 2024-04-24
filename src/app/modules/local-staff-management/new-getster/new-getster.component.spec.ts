import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGetsterComponent } from './new-getster.component';

describe('NewGetsterComponent', () => {
  let component: NewGetsterComponent;
  let fixture: ComponentFixture<NewGetsterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGetsterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewGetsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
