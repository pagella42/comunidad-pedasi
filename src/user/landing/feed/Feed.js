import React, { Component } from "react";
import Results from "./results/Results";
import axios from "axios";
import CreatePost from "../create-post/CreatePost";
import Filter from "./filter/Filter";
import "./feed.css";
import Fab from "@material-ui/core/Fab";
// import Button from "@material-ui/core/Button";
import { withTranslation } from "react-i18next";
import Consts from "../../../Consts";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const CREATE_ROUTE = Consts.CREATE_ROUTE;

class Feed extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
            showCreate: false,
            phone: "",
            filter:{},
            user:{},
            skip:0
        }
    }

    updateFilter = (filter, callback) => {
        this.setState({filter}, callback)
    }

    getPosts = () => {
        let body = { filter : this.state.filter , skip : this.state.skip }
        axios.post(CREATE_ROUTE("data/posts"), body).then((response)=>{ 
            this.setState({ posts: response.data })
         })
    }

    

    loadTwenty  = e => {
        let skip = this.state.skip
        this.setState({skip: e.target.id === "next" ? (this.state.posts.length!=0) && skip+20 : (skip-20>0) && skip-20},() => {
            this.getPosts()
        })
    }
    
  updateOnelike = (postId, toggleVote) => {
    let posts = [...this.state.posts];
    posts.find(post => post._id === postId).points += toggleVote;
    this.setState({ posts });
  };

  updateOnecomment = (postId, comment) => {
    let posts = [...this.state.posts];
    posts.find(post => post._id === postId).comments.push(comment);
    this.setState({ posts });
  };

  getUser = () => {
    if (localStorage.userLogin) {
      if (JSON.parse(localStorage.userLogin).isLoggedIn) {
        this.setState({ phone: JSON.parse(localStorage.userLogin).phone });
        axios
          .get(
            CREATE_ROUTE(
              `data/user/${JSON.parse(localStorage.userLogin).phone}`
            )
          )
          .then(response => {
            this.setState({ user: response.data });
          });
      }
    }
  };

  componentDidMount = () => {
    this.getPosts();
    this.getUser();
  };

  showCreatePost = async () => {
    if (localStorage.userLogin !== undefined) {
      if (JSON.parse(localStorage.userLogin).isLoggedIn) {
        this.setState({
          showCreate: !this.state.showCreate,
          phone: JSON.parse(localStorage.userLogin).phone
        });
      } else {
        this.props.loginPopup();
      }
    } else {
      this.props.loginPopup();
    }
  };

  render() {
    const { t, i18n } = this.props;
    return (
      <div>
        {this.state.skip > 0 && this.state.posts.length < 1 ? 
        <h4>{t("You Have Reached the Last Page")}</h4> :
        this.state.posts.length == 0 ? (
            <div className="feedloadercont">
                <Loader
          className="feedloader"
            type="ThreeDots"
            color="gray"
            height={100}
            width={100}
          />
            </div>
          
        ) : (
          <div id="feedcontainer">
            <div id="feedinnercont">
              {
                <div>
                  <div id="postbuttoncont">
                    <Fab
                      onClick={this.showCreatePost}
                      variant="extended"
                      color="primary"
                      aria-label="add"
                    >
                      {t("POST SOMETHING")}
                    </Fab>
                  </div>

                  {this.state.showCreate ? (
                    <CreatePost
                      showCreatePost={this.showCreatePost}
                      phone={this.state.phone}
                      getPosts={this.getPosts}
                    />
                  ) : null}
                  <Filter
                    getPosts={this.getPosts}
                    updateFilter={this.updateFilter}
                  />
                  <Results
                    user={this.state.user}
                    phone={this.state.phone}
                    updateOnelike={this.updateOnelike}
                    updateOnecomment={this.updateOnecomment}
                    loginPopup={this.props.loginPopup}
                    getPosts={this.getPosts}
                    posts={this.state.posts}
                    getUser={this.getUser}
                  />
                </div>
              }
            </div>
          </div>
        )}
        <div id="outterfooter">
        <div id="footer">
         
        <button onClick={this.loadTwenty} id='prev'>{t("Prev")}.</button>
        <button onClick={this.loadTwenty} id='next'>{t("Next")}.</button>
        </div></div>
        
      </div>
    );
  }
}
export default withTranslation("translation")(Feed);
