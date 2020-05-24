import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrapPictureComponent } from './drap-picture.component';

describe('DrapPictureComponent', () => {
  let component: DrapPictureComponent;
  let fixture: ComponentFixture<DrapPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrapPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrapPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
