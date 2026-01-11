import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';

const StatusField = ({ status, setStatus }) => {
  const handleSelect = (eventKey) => {
    setStatus(eventKey);
  };

  return (
    <Col className="d-flex align-items-center mt-4">
      <b>Status: </b>
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="first" id="dropdown-basic" className="border">
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
  );
};

export default StatusField;
