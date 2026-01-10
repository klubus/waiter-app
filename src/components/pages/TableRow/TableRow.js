import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const TableRow = ({ id, status }) => {
  return (
    <Container>
      <Row className="d-flex align-items-center my-4">
        <Col>
          <h4>Table {id}</h4>
        </Col>
        <Col xs={9}>
          <b>Status: </b> {status}
        </Col>
        <Col>
          <Button as={Link} to={`/table/${id}`} variant="primary">
            Show more
          </Button>
        </Col>
      </Row>
      <hr />
    </Container>
  );
};

export default TableRow;
