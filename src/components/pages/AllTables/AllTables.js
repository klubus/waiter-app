import { getAllTables } from '../../../redux/tablesRedux';
import TableRow from '../TableRow/TableRow';
import { useSelector } from 'react-redux';

const AllTables = () => {
  const categories = useSelector(getAllTables);

  return (
    <section>
      <h2>All Tables</h2>
      {categories.map((cat) => (
        <TableRow key={cat.id} id={cat.id} status={cat.status} />
      ))}
    </section>
  );
};

export default AllTables;
