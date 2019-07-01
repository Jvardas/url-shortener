import React, { Component } from "react";
import {
  Container,
  Image,
  Menu,
  Segment,
  List,
  Form,
  Button
} from "semantic-ui-react";
import "../App.css";
import App from "../App";
import logo from "..//athina.png";

class Home extends Component {
  
  state = {
    response: ""
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("http://localhost/api/item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({originalUrl: document.getElementById('originalURL').value })
    });
    const body = await response.json();

    this.setState({ response: body });
    console.log(this.state);
  };

  RenderShortUrl = () => {
    if(this.state.response.shortUrl) {
      return (<Form.Field>        
      <label>Shortened URL</label>
      <a href={this.state.response.shortUrl} target="_blank" rel="noopener noreferrer">{this.state.response.shortUrl}</a>
    </Form.Field>);
    }
  };

  render() {
    return (
      <div className="footer-container">
        <Menu inverted>
          <Container>
            <Menu.Item as="a" header>
              <Image
                size="tiny"
                src= { logo }
              />
              University of Athens Url Shortener
            </Menu.Item>
          </Container>
        </Menu>
        <Container>
          <Form>
            <Form.Field>
              <label>Url to shorten</label>
              <input placeholder="Original Url" id="originalURL"/>
            </Form.Field>
            {this.RenderShortUrl()}
            <Button type="submit" onClick={this.handleSubmit} >Submit</Button>
          </Form>
        </Container>
        <Segment inverted className="footer">
          <Container textAlign="center">
            <List horizontal inverted link size="medium">
              <List.Item as="a" href="https://github.com/Jvardas">
                John Vardas &copy; 2019
              </List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default Home;
