import { getAllTables } from '../../../redux/tablesRedux';
import TableRow from '../TableRow/TableRow';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Loader from '../../features/Loader/Loader';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const AllTables = () => {
  const tables = useSelector(getAllTables);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    if (tables.length > 0) {
      setPending(false);
    }
  }, [tables]);

  return (
    <section>
      <div className="d-flex align-items-center justify-content-between">
        <h2>All Tables</h2>
        <Button as={Link} to={'/table/new'} variant="secondary">
          Add table
        </Button>
      </div>

      {tables.map((tab) => (
        <TableRow key={tab.id} id={tab.id} status={tab.status} />
      ))}
      {pending && <Loader />}
    </section>
  );
};

export default AllTables;
