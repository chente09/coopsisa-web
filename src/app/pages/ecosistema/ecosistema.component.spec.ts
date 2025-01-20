import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcosistemaComponent } from './ecosistema.component';

describe('EcosistemaComponent', () => {
  let component: EcosistemaComponent;
  let fixture: ComponentFixture<EcosistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcosistemaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcosistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
