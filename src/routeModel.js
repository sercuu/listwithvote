import { ListContainer } from './container/List/ListContainer';

const router = [
  {
    path: '/list',
    name: 'list',
    component: ListContainer,
    layout: '/admin',
  },
];

export default router;
