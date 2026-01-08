import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NotFound from './components/pages/NotFound/NotFound';
import Home from './components/pages/Home/Home';
import SingleTable from './components/pages/SingleTable/SingleTable';

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table/:id" element={<SingleTable />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  );
}

export default App;
