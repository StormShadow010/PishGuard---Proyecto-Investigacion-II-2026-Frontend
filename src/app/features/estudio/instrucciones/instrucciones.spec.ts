import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Instrucciones } from './instrucciones';

describe('Instrucciones', () => {
  let component: Instrucciones;
  let fixture: ComponentFixture<Instrucciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Instrucciones],
    }).compileComponents();

    fixture = TestBed.createComponent(Instrucciones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
