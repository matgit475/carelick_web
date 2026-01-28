import * as React from "react";
import { Row, Container, Col } from "react-bootstrap";
import Animate from "../../components/Animate";
import UnixTimeDisplay from "../../components/public/UnixTimeDisplay";
import useNews from "../../hooks/public/useNews";

const News = () => {
  let { response } = useNews();

  return (
    <div className="news-container">
      <Container className="pt-5">
        <Row>
          <Col>
            <h2 className="mb-4">News</h2>
            <div>
              {response?.map((item: any) => {
                return (
                  <div className="pt-4 pb-4">
                    <h3> 📢{item.title}</h3>
                    <p>{item.headline}</p>
                    <p>
                      <b>Posted date:</b> {"    "}{" "}
                      <UnixTimeDisplay unix={item.creation_time} />
                    </p>
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default News;
