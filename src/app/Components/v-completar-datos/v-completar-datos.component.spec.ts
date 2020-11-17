import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VCompletarDatosComponent } from './v-completar-datos.component';

describe('VCompletarDatosComponent', () => {
  let component: VCompletarDatosComponent;
  let fixture: ComponentFixture<VCompletarDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VCompletarDatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VCompletarDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
