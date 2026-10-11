import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Consentimiento } from './consentimiento';

describe('Consentimiento', () => {
  let component: Consentimiento;
  let fixture: ComponentFixture<Consentimiento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Consentimiento],
    }).compileComponents();

    fixture = TestBed.createComponent(Consentimiento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
