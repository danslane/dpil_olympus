import React from 'react';
import Post from './post';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { question, test_posts, dpil_posts } from './posts.json';
import './App.css'

var posts = test_posts; // dpil_posts;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  };

  componentDidMount() {
    for (var i=0; i<posts.length; i++) {
      (function(i) {
        this.showTimer = setTimeout(() => {
          this.addPost(i, posts[i]);
        }, posts[i].timeShow*1000);
      }).bind(this)(i);
    }
  };

  addPost(key, post) {
    post.id = key;
    post.key = key;
    var newPosts = this.state.posts;
    newPosts.push(post);
    this.setState({posts: newPosts});

    this.numPosts++;
  }

  handlePostSubmission(event) {
    event.preventDefault();
    var contents = event.target[0].value;

    // add new post
    var post = {
      user: 'You',
      text: contents,
      timeshow: 0,
      timeHide: 10000
    };

    this.addPost(this.numPosts, post);
    
    // post message for parent of frame to recieve
    window.parent.postMessage(
      { event_id: 'submitted post', contents: contents },  '*'
    ); 

  };

  render() {
    return (
      <>
        <Navbar bg="light" expand="lg">
            <img src={"olympus_logo.png"} id="olympusLogo"></img>
            <Navbar.Brand className="pl-2" id="olympusTitle">Olympus</Navbar.Brand>
          </Navbar>
        <Container className="App w-50 pt-3">
          <Post 
            question={true}
            {...question}
          />
          <div className="posts">
            { this.state.posts.map((data) => {
              return (
                <Post {...data} />
              );
            }) }
          </div>
          { /* <PostForm onSubmit={this.handlePostSubmission.bind(this)}/> */ }
        </Container>
      </>
    );
  };
};

export default App;
