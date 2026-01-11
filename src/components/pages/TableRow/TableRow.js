import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { deleteTable } from '../../../redux/tablesRedux';
import { useDispatch } from 'react-redux';

const TableRow = ({ id, status }) => {
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    dispatch(deleteTable(id));
  };

  return (
    <Container>
      <Row className="d-flex align-items-center my-4">
        <Col>
          <h4>Table {id}</h4>
        </Col>
        <Col xs={8}>
          <b>Status: </b> {status}
        </Col>
        <Col className="d-flex gap-2">
          <Button as={Link} to={`/table/${id}`} variant="primary">
            Show more
          </Button>
          <Button onClick={handleDeleteClick} variant="danger">
            Delete
          </Button>
        </Col>
      </Row>
      <hr />
    </Container>
  );
};

export default TableRow;
