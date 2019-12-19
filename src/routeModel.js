import { ListContainer } from './container/List/ListContainer';
import { AddVoteCardContainer } from './container/AddVoteCard/AddVoteCardContainer';

const router = [
  {
    path: '/list',
    name: 'list',
    component: ListContainer,
  },
  {
    path: '/add',
    name: 'Add',
    component: AddVoteCardContainer,
  },
];

export default router;
