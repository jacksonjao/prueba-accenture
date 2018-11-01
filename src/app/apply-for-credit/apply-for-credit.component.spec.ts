import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyForCreditComponent } from './apply-for-credit.component';

describe('ApplyForCreditComponent', () => {
  let component: ApplyForCreditComponent;
  let fixture: ComponentFixture<ApplyForCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyForCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyForCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
