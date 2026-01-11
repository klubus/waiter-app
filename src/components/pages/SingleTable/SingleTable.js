import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllTables,
  getTableById,
  updateTable,
} from '../../../redux/tablesRedux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusField from '../../features/StatusField/StatusField';
import PeopleFields from '../../features/PeopleFields/PeopleFields';
import BillField from '../../features/BillField/BillField';

const SingleTable = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const table = useSelector((state) => getTableById(state, id));
  const tables = useSelector((state) => getAllTables(state));

  const [status, setStatus] = useState(table?.status || 'Select status');
  const [peopleAmount, setPeopleAmount] = useState(table?.peopleAmount);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(
    table?.maxPeopleAmount
  );
  const [bill, setBill] = useState(table?.bill);

  useEffect(() => {
    if (!tables.length) return;
    const exists = tables.some((table) => Number(table.id) === Number(id));

    if (!exists) {
      navigate('/');
    }
  }, [id, navigate, tables]);

  function handleSubmit() {
    const updatedTable = {
      ...table,
      status,
      peopleAmount: Number(peopleAmount),
      maxPeopleAmount: Number(maxPeopleAmount),
      bill: Number(bill),
    };
    dispatch(updateTable(updatedTable));
    navigate('/');
  }

  return (
    <Container>
      <Row className="d-flex flex-column align-items-center my-4">
        <Col>
          <h2>Table {id}</h2>
        </Col>
        <StatusField status={status} setStatus={setStatus} />
        <PeopleFields
          peopleAmount={peopleAmount}
          setPeopleAmount={setPeopleAmount}
          maxPeopleAmount={maxPeopleAmount}
          setMaxPeopleAmount={setMaxPeopleAmount}
          status={status}
        />
        {status === 'Busy' && <BillField bill={bill} setBill={setBill} />}
        <Col className="mt-4">
          <Button variant="primary" onClick={handleSubmit}>
            Update
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SingleTable;
