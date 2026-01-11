import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';

const PeopleFields = ({
  peopleAmount,
  setPeopleAmount,
  maxPeopleAmount,
  setMaxPeopleAmount,
  status,
}) => {
  useEffect(() => {
    if (peopleAmount > maxPeopleAmount) {
      setPeopleAmount(maxPeopleAmount);
    }
    if (peopleAmount < 0) {
      setPeopleAmount(0);
    }
  }, [peopleAmount, setPeopleAmount, maxPeopleAmount]);

  useEffect(() => {
    const value = Number(maxPeopleAmount);

    if (Number.isNaN(value)) return;

    if (value > 10) setMaxPeopleAmount(10);
    if (value < 0) setMaxPeopleAmount(0);
  }, [maxPeopleAmount, setMaxPeopleAmount]);

  useEffect(() => {
    if (status === 'Cleaning' || status === 'Free') {
      setPeopleAmount(0);
    }
  }, [status, setPeopleAmount]);

  return (
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
  );
};

export default PeopleFields;
