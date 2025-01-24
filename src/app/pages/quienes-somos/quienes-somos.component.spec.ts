import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuienesSomosComponent } from './quienes-somos.component';

describe('QuienesSomosComponent', () => {
  let component: QuienesSomosComponent;
  let fixture: ComponentFixture<QuienesSomosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuienesSomosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuienesSomosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function beforeEach(arg0: () => Promise<void>) {
  throw new Error('Function not implemented.');
}

function expect(component: QuienesSomosComponent) {
  throw new Error('Function not implemented.');
}

