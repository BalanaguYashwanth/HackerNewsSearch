import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Interweave } from "interweave";

export default function Details() {
  const [datas, setDatas] = useState("");
  const params = useParams();
  const [limit, setLimit] = useState(10);
  const [totalSize, setTotalSize] = useState('')
  const [loading, setLoading] = useState(false);
  const [click, setClick] = useState(true);
  const [property, setProperty] = useState("block");
  const [toggleid, SetToggleid] = useState([]);

  useEffect(() => {
    async function getdetails() {
      setLoading(true);
      await axios
        .get(`https://hn.algolia.com/api/v1/items/${params.id}`)
        .then((res) => {
          setLoading(false);
          setTotalSize(res.data.children.length);
          setDatas(res.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
    getdetails();
  }, []);

  function close(operation, id) {
    setClick(!click);
    if (operation === "push") {
      SetToggleid([...toggleid, id]);
    } else if (operation === "pop") {
      const result = toggleid.filter((tid) => tid != id);
      SetToggleid(result);
    }
  }

  return (
    <div>
      {loading ? (
        <div
         className="center"
        >
          <img
            src="https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif"
            alt="loading"
          />
        </div>
      ) : (
        <Container className="py-4 container"   >
          <h2> {datas.title} </h2>
          <p>
            Points: {datas.points} | by {datas.author}{" "}
          </p>
          <strong> {datas && datas.children.length} comments </strong>
          <div>
            {datas &&
              datas.children.slice(0, limit).map((child, index) => (
                <div key={index}  className="my-3">

               { 
                child.text && <div> 
                <img src={'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'} height='25' width='25'/> By <strong> {child.author} </strong>
                  <Interweave className="m-0" content={child.text} />
                </div>  
                }
                  
                  { toggleid.includes(child.id) ? (
                    <div>
                      {child && child.children.length > 0 && (
                        <span className="m-0">
                          {" "}
                          <i
                            className="fa-solid fa-circle-arrow-down"
                            onClick={() => close("pop", child.id)}
                          ></i>{" "}
                          {child.children.length} replies{" "}
                        </span>
                      )}{" "}
                      
                      {child.children.map((child, index) => (
                        <ul key={index}>
                          <li className="my-3">
                          <img src={'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'} height='25' width='25'/> By <strong> {child.author} </strong>
                            <Interweave content={child.text} />
                          </li>
                        </ul>
                      ))}
                    </div>
                  ) : (
                    <div>
                      {child && child.children.length > 0 && (
                        <span className="m-0">
                          {" "}
                          <i
                            onClick={(e) => close("push", child.id)}
                            className="fa-solid fa-circle-arrow-right"
                          ></i>{" "}
                          {child.children.length} replies{" "}
                        </span>
                      )}
                    </div>
                  )}
                 {  child.text && (<hr />)}
                </div>
              ))}

           { limit < totalSize && <button onClick={(e) => setLimit(limit + 10)}> load more </button>}
          </div>
        </Container>
      )}
    </div>
  );
}
