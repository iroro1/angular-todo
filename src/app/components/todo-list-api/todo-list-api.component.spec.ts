import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListApiComponent } from './todo-list-api.component';

describe('TodoListApiComponent', () => {
  let component: TodoListApiComponent;
  let fixture: ComponentFixture<TodoListApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
