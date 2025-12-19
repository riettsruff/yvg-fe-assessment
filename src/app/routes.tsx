import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from '@/components/layout';
import NotFoundPage from '@/pages/not-found';
import PostDetailPage from '@/pages/post-detail';
import PostsPage from '@/pages/posts';
import TodosPage from '@/pages/todos';

const routerFutureConfig = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
} as const;

export const AppRoutes = () => (
  <BrowserRouter future={routerFutureConfig}>
    <Layout>
      <Routes>
        <Route path="/" element={<TodosPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default AppRoutes;
