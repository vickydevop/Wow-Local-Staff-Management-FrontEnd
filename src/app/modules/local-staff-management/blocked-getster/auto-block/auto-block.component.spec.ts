import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoBlockComponent } from './auto-block.component';

describe('AutoBlockComponent', () => {
  let component: AutoBlockComponent;
  let fixture: ComponentFixture<AutoBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
