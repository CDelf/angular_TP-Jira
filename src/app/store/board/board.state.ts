import {BoardData} from '../../../models';

export interface BoardState {
  boards: BoardData[];
  selectedBoardId: string | null;
}

export const initialBoardState: BoardState = {
  boards: [{
    id: '1',
    title: 'ToDo board',
    lists: [
      {
        title: 'A anticiper',
        tasks: [
          {description: 'Créer un projet Angular', dueDate: '2025-07-01', priority: 'Low', done: false}
        ]
      },
      {
        title: 'À faire',
        tasks: [
          {description: 'Configurer Angular', dueDate: '2025-07-01', priority: 'High', done: false}
        ]
      },
      {
        title: 'En cours',
        tasks: [
          {description: 'Faire le composant List', dueDate: '2025-07-05', priority: 'Medium', done: false}
        ]
      }
    ]
  }
  ],
  selectedBoardId: '1'
};
