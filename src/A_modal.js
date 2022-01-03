import React from 'react';
import {  Form, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class A_modal extends React.Component {
  render() {
    return (
      <>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Tên</Form.Label>
              <Form.Control type="text"  value= {this.props.temInfo.name} readOnly/>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridTK">
              <Form.Label>Stk</Form.Label>
              <Form.Control type="tel"  value= {this.props.temInfo.stk} readOnly/>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridHall">
              <Form.Label>Dịch vụ</Form.Label>
              <Form.Control type="text" readOnly/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridBook">
              <Form.Label>Ngày đặc tiệc</Form.Label>
              <Form.Control type="date"  value= {this.props.temInfo.organization_date} readOnly/>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridBook">
              <Form.Label>Ca</Form.Label>
              <Form.Control type="text"  value= {this.props.temInfo.shift.name} readOnly/>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridShiff">
                <Form.Label>Menu</Form.Label>
                <Form.Control type="text" value= {this.props.temInfo.menu.name} readOnly/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridShiff">
                <Form.Label>Sảnh</Form.Label>
                <Form.Control type="text" value = {`${this.props.temInfo.wedding_hall.name}`} readOnly/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Tổng chi phí:</Form.Label>
              <Form.Control type="text"  value= {this.props.temInfo.shift.price} readOnly/>
            </Form.Group>
          </Form.Row>
        </Form>
      </>
    );
  }
}

export default A_modal;