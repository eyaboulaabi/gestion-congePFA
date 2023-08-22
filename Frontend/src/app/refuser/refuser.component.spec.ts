import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefuserComponent } from './refuser.component';

describe('RefuserComponent', () => {
  let component: RefuserComponent;
  let fixture: ComponentFixture<RefuserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefuserComponent]
    });
    fixture = TestBed.createComponent(RefuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
