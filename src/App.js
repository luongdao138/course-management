import './styles/main.scss';
import { Route, Routes } from 'react-router-dom';
import {
  HomePage,
  CourseDetailPage,
  AddCoursePage,
  EditCoursePage,
} from './pages';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/course/:courseId' element={<CourseDetailPage />} />
      <Route path='/add-course' element={<AddCoursePage />} />
      <Route path='/course/:courseId/edit' element={<EditCoursePage />} />
    </Routes>
  );
};

export default App;
