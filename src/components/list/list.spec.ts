import { ComponentFixture, TestBed } from '@angular/core/testing';

import { List } from './list';
import {provideMockStore} from '@ngrx/store/testing';

describe('List', () => {
  let component: List;
  let fixture: ComponentFixture<List>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [List],
      providers: [
        provideMockStore({
          initialState: {
            boardState: {
              boards: [],
              selectedBoardId: null
            }
          }
        })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(List);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
