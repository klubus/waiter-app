import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NotFound from './components/pages/NotFound/NotFound';
import Home from './components/pages/Home/Home';
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';
import SingleTable from './components/pages/SingleTable/SingleTable';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTables } from './redux/tablesRedux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table/:id" element={<SingleTable />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
