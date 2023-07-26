import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

export function ListModal({ handleClose, show , categories}) {
 
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bolder">ဂိမ်းအမျိုးအစားများ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="d-flex col-12 flex-wrap px-0 justify-content-center align-items-center">
                  <div className="col-6 p-1" >
                    <Link to={`games/category/all`} className="btn  my-1 btn-outline-danger w-100 px-3 py-2">
                        ဂိမ်းအားလုံး
                    </Link>
                  </div>
                  {categories.map((category) => (
                  <div className="col-6 p-1" key={category.id} onClick={()=>handleClose()}>
                    <Link to={`games/category/${category.id}`} className="btn  my-1 btn-outline-danger w-100 px-3 py-2">
                        {category.title}
                    </Link>
                  </div>
                  ))}
            </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger px-3" onClick={()=>handleClose()}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
