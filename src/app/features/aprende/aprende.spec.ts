import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Aprende } from './aprende';

describe('Aprende', () => {
  let component: Aprende;
  let fixture: ComponentFixture<Aprende>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aprende],
    }).compileComponents();

    fixture = TestBed.createComponent(Aprende);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
