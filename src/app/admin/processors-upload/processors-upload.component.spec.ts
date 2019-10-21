import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessorsUploadComponent } from './processors-upload.component';

describe('ProcessorsUploadComponent', () => {
  let component: ProcessorsUploadComponent;
  let fixture: ComponentFixture<ProcessorsUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessorsUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessorsUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
