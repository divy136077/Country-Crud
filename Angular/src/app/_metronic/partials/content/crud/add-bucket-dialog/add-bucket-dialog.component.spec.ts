import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBucketDialogComponent } from './add-bucket-dialog.component';

describe('DeleteEntityDialogComponent', () => {
  let component: AddBucketDialogComponent;
  let fixture: ComponentFixture<AddBucketDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBucketDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBucketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
