import './styles/main.scss';
import { Route, Routes } from 'react-router-dom';
import { HomePage, CourseDetailPage } from './pages';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/course/:courseId' element={<CourseDetailPage />} />
    </Routes>
  );
};

export default App;
