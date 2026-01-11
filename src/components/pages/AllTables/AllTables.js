import { getAllTables } from '../../../redux/tablesRedux';
import TableRow from '../TableRow/TableRow';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Loader from '../../features/Loader/Loader';

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
      <h2>All Tables</h2>
      {tables.map((tab) => (
        <TableRow key={tab.id} id={tab.id} status={tab.status} />
      ))}
      {pending && <Loader />}
    </section>
  );
};

export default AllTables;
