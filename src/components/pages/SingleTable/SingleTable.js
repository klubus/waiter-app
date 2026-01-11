import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllTables,
  getTableById,
  updateTable,
} from '../../../redux/tablesRedux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SingleTable = () => {
  const { id } = useParams();
  const table = useSelector((state) => getTableById(state, id));
  const tables = useSelector((state) => getAllTables(state));
  const [status, setStatus] = useState(table?.status || 'Select status');
  const [peopleAmount, setPeopleAmount] = useState(table?.peopleAmount);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(
    table?.maxPeopleAmount
  );
  const [bill, setBill] = useState(table?.bill);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelect = (eventKey) => {
    setStatus(eventKey);
  };

  useEffect(() => {
    if (status === 'Cleaning' || status === 'Free') {
      setPeopleAmount(0);
    }
  }, [status]);

  useEffect(() => {
    const value = Number(maxPeopleAmount);

    if (Number.isNaN(value)) return;

    if (value > 10) setMaxPeopleAmount(10);
    if (value < 0) setMaxPeopleAmount(0);
  }, [maxPeopleAmount]);

  useEffect(() => {
    if (peopleAmount > maxPeopleAmount) {
      setPeopleAmount(maxPeopleAmount);
    }
    if (peopleAmount < 0) {
      setPeopleAmount(0);
    }
  }, [peopleAmount, maxPeopleAmount]);

  useEffect(() => {
    if (bill < 0) {
      setBill(0);
    }
  }, [bill]);

  useEffect(() => {
    if (!tables.length) return;
    const exists = tables.some((table) => Number(table.id) === Number(id));
    console.log(exists);
    console.log(id);

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
        <Col className="d-flex align-items-center mt-4">
          <b>Status: </b>
          <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle
              variant="first"
              id="dropdown-basic"
              className="border"
            >
              {status}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="Busy">Busy</Dropdown.Item>
              <Dropdown.Item eventKey="Free">Free</Dropdown.Item>
              <Dropdown.Item eventKey="Reserved">Reserved</Dropdown.Item>
              <Dropdown.Item eventKey="Cleaning">Cleaning</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col className="d-flex align-items-center py-3">
          <b>People: </b>

          <div
            style={{
              display: 'inline-flex',
              gap: '0.5rem',
              alignItems: 'center',
            }}
          >
            <Form.Control
              className="no-spin"
              type="number"
              min={0}
              max={10}
              style={{ width: '8ch' }}
              placeholder="0"
              value={peopleAmount}
              onChange={(e) => setPeopleAmount(e.target.value)}
            />
            <span>/</span>
            <Form.Control
              className="no-spin"
              type="number"
              min={0}
              max={10}
              style={{ width: '8ch' }}
              placeholder="0"
              value={maxPeopleAmount}
              onChange={(e) => setMaxPeopleAmount(e.target.value)}
            />
          </div>
        </Col>
        {status === 'Busy' && (
          <Col className="d-flex align-items-center">
            <div
              style={{
                display: 'inline-flex',
                gap: '0.5rem',
                alignItems: 'center',
              }}
            >
              <b>Bill: </b>
              <span>$</span>
              <Form.Control
                className="no-spin"
                type="number"
                min={0}
                max={99}
                style={{ width: '8ch' }}
                placeholder="0"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
              />
            </div>
          </Col>
        )}
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
