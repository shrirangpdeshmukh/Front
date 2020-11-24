import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
export class Card extends Component {
  urlify = (text) => {
    var urlRegex = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
    return text.replace(urlRegex, function (url) {
      return `<a href="${url}" target="_blank"> ${url} </a>`;
    });
  };
  render() {
    const text = this.urlify(this.props.content);

    return (
      <Row>
        <Col md={11} xs={12}>
          <div
            className={"card" + (this.props.plain ? " card-plain" : "")}
            style={{
              borderRadius: "2px",
              // boxShadow: "17px 14px 22px -18px rgba(97,76,97,1)",
              border: "0.9px solid #ccc",
              paddingBottom: "0",
              marginBottom: "6px",
            }}
          >
            <span
              className="text-muted small pull-right"
              style={{ padding: "10px", paddingRight: "12px" }}
            >
              {this.props.stats}
            </span>
            <div className="header">
              <a href={this.props.userLink}>
                <h4
                  className="title"
                  style={{
                    fontSize: "0.98em",
                    color: "black",
                    fontWeight: "bold",
                    fontStyle: "italic",
                  }}
                >
                  {this.props.title}
                </h4>
              </a>
            </div>
            <div className="content" style={{ fontSize: "1em" }}>
              <div dangerouslySetInnerHTML={{ __html: text }} />
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Card;
