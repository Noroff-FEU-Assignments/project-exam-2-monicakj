import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HomeCta () {
  return (
    <Container className='cta__container'>
        <div className='cta--details'>
          <Container>
            <Row>
              <Col>
                <h4>Join The Community!</h4>
              
              <div className='cta--buttons'>
                <Link to="/login">
                <button className='cta cta1'>Sign In</button>
                </Link>
                <Link to="/register">
                <button className='cta cta2'>Register new user</button>
                </Link>
              </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
  )
}

export default HomeCta;