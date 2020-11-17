import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VDetallesComponent } from './v-detalles.component';

describe('VDetallesComponent', () => {
  let component: VDetallesComponent;
  let fixture: ComponentFixture<VDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VDetallesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
