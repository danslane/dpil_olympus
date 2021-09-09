import Question from '../components/question';
import Post from '../components/post';
import React from 'react';

class PostView extends React.Component {
    constructor(props) {
      super(props);
      this.allPosts = [];
      this.state = {
        currentPosts: [],
      };
      this.topic = this.props.topic;
    };
  
    componentDidMount() {
      if (this.topic === "veggie" || this.topic === "surveillance") {
        // randomize username, text of post, time shown, and profile photo
        var inds = Array.from(Array(this.props.times.length).keys())
        for (var a of [this.props.users, this.props.posts[this.topic], inds]) {
          this.shuffle(a);
        }

        for (var i=0; i<this.props.times.length; i++) {
          this.allPosts.push({ 
            user: this.props.users[i],
            text: this.props.posts[this.topic][i][0],
            timeShow: this.props.times[i].show,
            timeHide: this.props.times[i].hide,
            likeCount: this.props.posts[this.topic][i][1],
            profile_picture: `profile_pictures/profile${inds[i]}.png`
          });
        }

        this.startSimulation();
      }
    };

    shuffle(a) {
      a.sort(() => Math.random() - 0.5);
    };
  
    startSimulation() {
      this.timers = new Array(this.allPosts.length);
      for (var i=0; i<this.allPosts.length; i++) {
        (function(i) {
          var showTimer = setTimeout(() => {
            this.addPost(i, this.allPosts[i]);
          }, this.allPosts[i].timeShow*1000);
          this.timers[i] = showTimer;
        }).bind(this)(i);
      }
    };


    addPost(key, post) {
      post.id = key;
      post.key = key;
      var newPosts = this.state.currentPosts;
      newPosts.push(post);
      this.setState({currentPosts: newPosts});
  };

    componentWillUnmount() {
      if (!this.props.hidePosts) {
        for (var t of this.timers) {
          clearTimeout(t);
        }
      }
    };
  
    render() {
      return (
        <div key={this.props.persist}>
            { this.props.questions ? 
              <div className="pt-1">
                <Question question={this.props.questions[this.topic]}></Question>
              </div>
            : null}
            { this.props.newPost ? <Post {...this.props.newPost} /> : null }
            <div className="posts">
                { this.state.currentPosts.map((data) => {
                  return (
                      <Post persist={this.props.persist} {...data}/>
                  );
                }) }
            </div>
        </div>
      );
    };
  };
  
  export default PostView;
