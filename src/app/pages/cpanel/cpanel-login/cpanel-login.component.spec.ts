import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpanelLoginComponent } from './cpanel-login.component';

describe('CpanelLoginComponent', () => {
  let component: CpanelLoginComponent;
  let fixture: ComponentFixture<CpanelLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpanelLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpanelLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
