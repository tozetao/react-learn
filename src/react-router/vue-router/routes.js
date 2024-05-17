import News from './News';
import NewsDetail from './NewsDetail';
import Home from './Home';

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/news',
    name: 'news',
    component: News,
    children: [
      {
        name: 'news_detail',
        path: 'detail',
        component: NewsDetail
      }
    ]
  }
]

export default routes