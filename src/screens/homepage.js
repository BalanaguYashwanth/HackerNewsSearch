import { Button, Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
//import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import moment from 'moment-timezone'

export default function Homepage() {
  const [hits, setHits] = useState("");
  const [imgdata, setImgadata] = useState("");
  const [inputsearch, setInputsearch] = useState("")

  useEffect(() => {
    async function getresponse() {
      await axios
        .get("https://hn.algolia.com/api/v1/search?query=test")
        .then(async (res) => {
          const sorted = res.data.hits.sort((a,b) => ( (new Date(moment.parseZone(b.created_at).format("DD-MMM-YYYY"))) - ( new Date(moment.parseZone(a.created_at).format("DD-MMM-YYYY"))) ) )
          //console.log(sorted)
          setHits(sorted);
        })
        .catch((err) => console.log(err));
    }
    getresponse();
  }, []);


  function search()
  {
    var allhits = hits.filter((hit)=> (Object.values(hit).join("")).toLowerCase().includes(inputsearch.toLowerCase()))
    return allhits
  }

  function rename(objs)
  {
    return objs.filter( (obj)=> obj!='story'  )
  }
 

  return (
    <div>
      <div className="search-container mb-5">
        <input placeholder="Search Stories" onChange={(e)=>setInputsearch(e.target.value)} className="search my-3" />
        <Button style={{ backgroundColor: "red" }}> submit </Button>
      </div>
      <div>
        <Container>
          <Row >
            {hits &&
              search().map((hit, index) => (
                <Card className="shadow p-3 mb-5 card bg-white rounded " key={index}>
                  <Card.Body >
                    <Card.Title className="title"> <Card.Link style={{textDecoration:'none', color:'black'}} href={hit.url}>{hit.title}</Card.Link>  </Card.Title>                   
                    <Card.Text> By {hit.author} | Created at {moment.parseZone(hit.created_at).format("DD-MMM-YYYY, HH:MM")} | <Card.Link  className="comments" href={`/item/${hit.objectID}`}> {hit.num_comments} comments </Card.Link>  </Card.Text>
                    <Card.Text> 
                      Tags - {
                        rename(hit._tags).map((tag, index)=>(<span key={index} className="tags" > {tag} </span>))
                      }
                    </Card.Text> 
                  </Card.Body>
                </Card>
              ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}
