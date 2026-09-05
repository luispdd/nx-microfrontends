import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedPerf } from './shared-perf';

describe('SharedPerf', () => {
  let component: SharedPerf;
  let fixture: ComponentFixture<SharedPerf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedPerf],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedPerf);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
