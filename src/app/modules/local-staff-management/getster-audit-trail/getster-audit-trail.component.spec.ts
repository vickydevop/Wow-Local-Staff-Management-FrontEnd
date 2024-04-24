import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetsterAuditTrailComponent } from './getster-audit-trail.component';

describe('GetsterAuditTrailComponent', () => {
  let component: GetsterAuditTrailComponent;
  let fixture: ComponentFixture<GetsterAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetsterAuditTrailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetsterAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
