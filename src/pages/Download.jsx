import React, { useContext, useEffect } from "react";
import { FiDownload, FiLink } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchGameDetails } from "../actions/gameActions";
import RelatedGames from "../components/RelatedGames";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Badge, Form, Placeholder } from "react-bootstrap";
import { useState } from "react";
import { setLinkRequest } from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import { fetchAdultDetails } from "../actions/adultAction";

function MyVerticallyCenteredModal(props) {
  const [selectedOption, setSelectedOption] = useState("linkerr");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const post_id = props.data_id;
    const type = props.type;
    const response = await setLinkRequest(
      selectedOption,
      post_id,
      type,
      user.oldToken
    );
    if (response.finish) {
      setMessage(response.finish);
      setLoading(false);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          လင့် ပြန်ပြင်ခိုင်းရန်
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="report" onSubmit={handleSubmit}>
          {["radio"].map((type) => (
            <div key={`default-${type}`} className="mb-3">
              <Form.Check // prettier-ignore
                type={type}
                name="report"
                id={`download-error-${type}`}
                label={`ဒေါင်းမရတော့ပါဘူး`}
                value="linkerr"
                onChange={handleOptionChange}
                checked={selectedOption === "linkerr"}
              />
              <Form.Check
                type={type}
                name="report"
                label={"ခိုးပီးသားမဟုတ်ပါဘူး"}
                id={`mod-error-${type}`}
                value="moderr"
                onChange={handleOptionChange}
                checked={selectedOption === "moderr"}
              />
              <Form.Check
                type={type}
                name="report"
                label={"ဒေါင်းလို့ရပီး ဆော့လို့မရဘူး"}
                id={`game-error-${type}`}
                value="gameerr"
                onChange={handleOptionChange}
                checked={selectedOption === "gameerr"}
              />
            </div>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        {!message ? (
          <Button
            className="px-3 btn bg_main"
            form="report"
            type="submit"
            block
          >
            <FiLink />
            &nbsp;Report Link
          </Button>
        ) : !message && loading ? (
          <Placeholder.Button xs={4} aria-hidden="true" />
        ) : message && !loading ? (
          <div className="alert alert-success my-2 col-12">{message}</div>
        ) : (
          ""
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default function Download({ type }) {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const data = useSelector((state) => {
    if (type === "game") {
      return state.gameReducer.game;
    } else if (type === "adult") {
      return state.adultReducer.adult; // Replace 'adultReducer.adult' with your actual path
    }
    return null; // Default value if neither 'game' nor 'adult'
  });

  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Conditionally dispatch the action based on the 'type'
    if (type === 'game') {
      dispatch(fetchGameDetails(slug));
    } else if (type === 'adult') {
      dispatch(fetchAdultDetails(slug)); // Replace with your action for adults
    }

  }, [dispatch, slug, type]);


  const goUrl = (url) => {
    window.location.href = url;
  };
  if (!data) {
    return <div className="mt-5">Loading....</div>;
  }

  return (
    <>
      {/* <div
        className="col-12 col-md-7 mx-auto mt-3 px-2 "
        onClick={() =>
          goUrl("https://www.facebook.com/KVCMyanmar?mibextid=ZbWKwL")
        }
      >
        <Badge bg="dark" className="fw-bold  px-4 py-2" text="light">
          ကြော်ငြာ
        </Badge>
        <img
          src="https://i.ibb.co/PN9sKH7/367495909-1243618689655999-7963063728003866697-n.jpg"
          className="w-100"
          alt=""
        />
      </div> */}
      <div className="card col-12 px-0 shadow mt-1">
        <div className="card-body d-flex flex-wrap justify-content-center align-items-center">
          <h4 className="col-12 mb-0 fw-bolder">{data.name}</h4>
          <hr className="col-12 px-0" />
          {data.link1 && (
            <div className="col-12 col-md-6 p-2">
              <a
                href={`https://modgamesmm.com/download/${data.slug}/link1/${type}`}
                className="btn bg_main px-3 py-2  w-100"
              >
                <FiDownload /> {data.name_1}
              </a>
            </div>
          )}

          {data.link2 && (
            <div className="col-12 col-md-6 p-2">
              <a
                href={`https://modgamesmm.com/download/${data.slug}/link2/${type}`}
                className="btn bg_main px-3 py-2  w-100"
              >
                <FiDownload /> {data.name_2}
              </a>
            </div>
          )}
          {data.link3 && (
            <div className="col-12 col-md-6 p-2">
              <a
                href={`https://modgamesmm.com/download/${data.slug}/link3/${type}`}
                className="btn bg_main px-3 py-2  w-100"
              >
                <FiDownload /> {data.name_3}
              </a>
            </div>
          )}
          <div className="col-12 col-md-6 p-2">
            <Button
              className="btn bg-success px-3 py-2  w-100"
              onClick={() => setModalShow(true)}
            >
              <FiLink /> လင့်ပြန်ပြင်ခိုင်းရန်နှိပ်ပါ
            </Button>
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              data_id={data.id}
              type={type}
            />
          </div>
        </div>
        <div className="card-footer text-center">
          <h6 className="fw-bold">{data.count} ယောက် ဒေါင်းထားပါတယ်</h6>
        </div>
      </div>
      {/* <div
        className="col-12 col-md-7 mx-auto  py-2"
        onClick={() =>
          goUrl(
            "https://www.facebook.com/profile.php?id=100089471109757&mibextid=ZbWKwL"
          )
        }
      >
        <Badge bg="dark" className="fw-bold px-4 py-2" text="light">
          ကြော်ငြာ
        </Badge>
        <img
          src="https://i.ibb.co/4fmcGCS/367501504-334105872378221-4151896815920128807-n.jpg"
          className="w-100"
          alt=""
        />
      </div> */}
      {type == "game" && <RelatedGames id={data.category_id} />}
    </>
  );
}
