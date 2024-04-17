import { useContext } from 'react';
import { KanbanContext } from '../provider/KanbanContext';

export const useKanban = () => useContext(KanbanContext);
