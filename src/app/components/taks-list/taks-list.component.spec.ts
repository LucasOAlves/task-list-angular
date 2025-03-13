import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaksListComponent } from './taks-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TaskServiceAbstractService } from 'src/app/services/task-service-abstract.service';
import { MockTaskService } from 'src/app/services/task-service-mock.service';

describe('TaksListComponent', () => {
  let component: TaksListComponent;
  let fixture: ComponentFixture<TaksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaksListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: TaskServiceAbstractService,
          useClass: MockTaskService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
