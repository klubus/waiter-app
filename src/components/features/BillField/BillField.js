import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';

const BillField = ({ bill, setBill }) => {
  useEffect(() => {
    if (bill < 0) {
      setBill(0);
    }
  }, [bill, setBill]);

  return (
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
  );
};

export default BillField;
