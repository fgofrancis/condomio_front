import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnsGeneralPagosComponent } from './cns-general-pagos.component';

describe('CnsGeneralPagosComponent', () => {
  let component: CnsGeneralPagosComponent;
  let fixture: ComponentFixture<CnsGeneralPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CnsGeneralPagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CnsGeneralPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
