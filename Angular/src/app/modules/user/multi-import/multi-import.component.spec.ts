import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiImportComponent } from './multi-import.component';

describe('MultiImportComponent', () => {
  let component: MultiImportComponent;
  let fixture: ComponentFixture<MultiImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
