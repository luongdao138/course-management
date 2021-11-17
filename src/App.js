import './styles/main.scss';
import { Route, Routes } from 'react-router-dom';
import { HomePage, CourseDetailPage, AddCoursePage } from './pages';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/course/:courseId' element={<CourseDetailPage />} />
      <Route path='/add-course' element={<AddCoursePage />} />
    </Routes>
  );
};

export default App;
