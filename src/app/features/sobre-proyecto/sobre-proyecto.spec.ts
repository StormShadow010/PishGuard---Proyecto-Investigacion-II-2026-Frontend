import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SobreProyecto } from './sobre-proyecto';

describe('SobreProyecto', () => {
  let component: SobreProyecto;
  let fixture: ComponentFixture<SobreProyecto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SobreProyecto],
    }).compileComponents();

    fixture = TestBed.createComponent(SobreProyecto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
