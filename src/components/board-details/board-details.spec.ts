import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDetails } from './board-details';
import {provideMockStore} from '@ngrx/store/testing';

describe('BoardDetails', () => {
  let component: BoardDetails;
  let fixture: ComponentFixture<BoardDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardDetails],
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

    fixture = TestBed.createComponent(BoardDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
