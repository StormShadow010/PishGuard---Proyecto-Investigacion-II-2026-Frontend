import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ensayo } from './ensayo';

describe('Ensayo', () => {
  let component: Ensayo;
  let fixture: ComponentFixture<Ensayo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ensayo],
    }).compileComponents();

    fixture = TestBed.createComponent(Ensayo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
