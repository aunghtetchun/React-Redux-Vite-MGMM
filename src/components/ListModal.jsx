import Modal from "react-bootstrap/Modal";

export function ListModal({ handleClose, show }) {
 
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={()=>handleClose()}>
            Close
          </button>
          <button className="btn btn-primary" onClick={()=>handleClose()}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
