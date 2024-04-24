import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingGetsterComponent } from './existing-getster.component';

describe('ExistingGetsterComponent', () => {
  let component: ExistingGetsterComponent;
  let fixture: ComponentFixture<ExistingGetsterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingGetsterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExistingGetsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
