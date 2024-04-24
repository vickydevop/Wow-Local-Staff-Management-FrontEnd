import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedGetsterComponent } from './blocked-getster.component';

describe('BlockedGetsterComponent', () => {
  let component: BlockedGetsterComponent;
  let fixture: ComponentFixture<BlockedGetsterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockedGetsterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockedGetsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
