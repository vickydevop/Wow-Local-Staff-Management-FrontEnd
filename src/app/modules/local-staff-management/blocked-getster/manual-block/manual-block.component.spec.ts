import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualBlockComponent } from './manual-block.component';

describe('ManualBlockComponent', () => {
  let component: ManualBlockComponent;
  let fixture: ComponentFixture<ManualBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
