import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AlumsList from './pages/listAlumnos';
import Login from './pages/login';
import CourseList from './pages/listCursos';
import Layout from './components/layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<AlumsList />} />
          <Route path="/list" element={<CourseList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
