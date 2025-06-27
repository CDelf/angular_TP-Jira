import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Board } from './board';
import {provideMockStore} from '@ngrx/store/testing';

describe('Board', () => {
  let component: Board;
  let fixture: ComponentFixture<Board>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Board],
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

    fixture = TestBed.createComponent(Board);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
