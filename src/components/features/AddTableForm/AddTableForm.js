import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {
  getTableById,
  getAllTables,
  addTable,
} from '../../../redux/tablesRedux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusField from '../../features/StatusField/StatusField';
import PeopleFields from '../../features/PeopleFields/PeopleFields';
import BillField from '../../features/BillField/BillField';
import Dropdown from 'react-bootstrap/Dropdown';

const AddTableForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allIds = [];
  const table = useSelector((state) => getTableById(state, id));
  const tables = useSelector((state) => getAllTables(state));

  for (let index = 1; index <= 10; index++) {
    if (!tables.some((t) => Number(t.id) === index)) {
      allIds.push(index);
    }
  }

  const [status, setStatus] = useState(table?.status || 'Free');
  const [tableNumber, setTableNumber] = useState(allIds[0]);
  const [peopleAmount, setPeopleAmount] = useState(0);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(1);
  const [bill, setBill] = useState(0);

  function handleSubmit() {
    const addedTable = {
      id: Number(tableNumber),
      status,
      peopleAmount: Number(peopleAmount),
      maxPeopleAmount: Number(maxPeopleAmount),
      bill: Number(bill),
    };
    dispatch(addTable(addedTable));
    navigate('/');
  }

  function handleSelect(eventKey) {
    setTableNumber(eventKey);
  }

  return (
    <Container>
      <Row className="d-flex flex-column align-items-center my-4">
        <Col className="d-flex gap-2">
          <h2>Table {id}</h2>
          <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle
              variant="first"
              id="dropdown-basic"
              className="border"
            >
              {tableNumber}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {allIds.map((id) => {
                return <Dropdown.Item eventKey={`${id}`}>{id}</Dropdown.Item>;
              })}
            </Dropdown.Menu>
          </Dropdown>
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
            Create
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AddTableForm;
