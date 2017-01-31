import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';

export const Dialog = (props) => {
  return (
    <div>
      <Modal show={props.show}>
        <Modal.Header>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.body}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onClickClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};