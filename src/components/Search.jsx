import React from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi';

export default function Search() {
  return (
    <Form inline="true"> {/* Convert the inline prop to a string */}
      <Row>
        <Col xs="10" className="pe-0">
          <Form.Control
            type="text"
            placeholder="Search data..."
            className="pe-0 search_input"
          />
        </Col>
        <Col xs="2" className="ps-0">
          <Button className="w-100 search_btn" type="submit">
            <FiSearch />
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
