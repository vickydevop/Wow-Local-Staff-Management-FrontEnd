import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WowCampManagerComponent } from './wow-camp-manager.component';

describe('WowCampManagerComponent', () => {
  let component: WowCampManagerComponent;
  let fixture: ComponentFixture<WowCampManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WowCampManagerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WowCampManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
