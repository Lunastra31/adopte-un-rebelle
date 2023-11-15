import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangestarshipstatusmodalComponent } from './changestarshipstatusmodal.component';

describe('ChangestarshipstatusmodalComponent', () => {
  let component: ChangestarshipstatusmodalComponent;
  let fixture: ComponentFixture<ChangestarshipstatusmodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangestarshipstatusmodalComponent]
    });
    fixture = TestBed.createComponent(ChangestarshipstatusmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
