
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import logo from '../asli.jpg';
import './homepage.css';
import './main.css';
import {Header} from "../main_components/header.js";
import Item from "../main_components/item.js";


var contents = [];

class HomePage extends Component {
  //Constructor elements to store state variables and binding functions(from beginning of the execution to ending)
  constructor(props) {
    super(props);

    this.myRef = React.createRef();

    if(typeof this.props.location.state !== "undefined"){
      this.state = {
        prevScrollpos: window.pageYOffset,
        visible: true,
        main_title: 'The World of Software Engineering',
        content_data: [],
        isLoggedIn: this.props.location.state.isLoggedIn,
        isNewItemDivEnabled: false,
        isRefreshRequired: false,
        pageOfContentValue: 'HomePage',
      }
    }
    else{
      this.state = {
        prevScrollpos: window.pageYOffset,
        visible: true,
        main_title: 'The World of Software Engineering',
        content_data: [],
        isLoggedIn: false,
        isNewItemDivEnabled: false,
        isRefreshRequired: false,
        pageOfContentValue: 'HomePage',
      }
    }
    
    //These bindings call input change handler functions during the whole of the execution of this page
    this.getContents = this.getContents.bind(this);
    setTimeout(this.getContents.bind(this), 5);

  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate(prevProps, prevState) {
    var {isNewItemDivEnabled} = this.state;
    if(isNewItemDivEnabled !== prevState.isNewItemDivEnabled){
      this.scrollToMyRef = this.scrollToMyRef.bind(this);
      if(isNewItemDivEnabled == false){
        setTimeout(this.scrollToTopOfMyRef.bind(this), 10);
      }
      else{
        setTimeout(this.scrollToMyRef.bind(this), 10);
      }   
    }
  }

  // Remove the event listener when the component is unmount.
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const { prevScrollpos } = this.state;

    const currentScrollPos = window.pageYOffset;
    if(prevScrollpos >= currentScrollPos || currentScrollPos <= 0 ){
      this.setState({
        prevScrollpos: currentScrollPos,
        visible: true
      });
    }
    else{
      this.setState({
        prevScrollpos: currentScrollPos,
        visible: false
      });
    }
  };

  getContents(){
    this.state.content_data = [];

    const request = async () => {
      const response = await fetch('http://www.aboutsoftwareengineering.com:8081/contents/HomePage', { 
        method: 'get'
      });
      const responseData = await response.json();
      this.setState({ content_data: responseData});

      if(this.state.isRefreshRequired === true){
        setTimeout(this.scrollToTopOfMyRef.bind(this), 10);
      }

    }
    request();
  }

  openNewItemBox(){
    this.setState({ isNewItemDivEnabled: true});
  }

  closeNewItemBox(){
    this.setState({ isNewItemDivEnabled: false});
  }

  scrollToMyRef(){
    window.scrollTo({
      top: document.getElementById('newItemDiv').offsetTop,
      behavior: 'smooth'
    });
    //window.scrollTo(0,document.getElementById('newItemDiv').offsetTop);
  };

  scrollToTopOfMyRef(){
    window.scrollTo({
      top: document.getElementById('body').offsetHeight,
      behavior: 'smooth'
    });
    //window.scrollTo(0,document.getElementById('newItemDiv').offsetTop);
  };

  callbackIsNewItemDivEnabled = (childData) => {
    this.setState({isNewItemDivEnabled: childData})
  }

  callbackIsNewItemAdded = () => {
    this.setState({isRefreshRequired: true})
    setTimeout(this.getContents.bind(this), 10);

  }
  
  callbackIsItemDeleted = () => {
    window.location.reload();
  }

  render() {

    if(this.state.content_data.length > 0){
      for(var i = 0; i < this.state.content_data.length; i++){
        contents[i] = [];
        contents[i][0] = this.state.content_data[i]._id;
        contents[i][1] = this.state.content_data[i].pageOfContent;
        contents[i][2] = this.state.content_data[i].titleOfContent;
        contents[i][3] = this.state.content_data[i].textOfContent;
        contents[i][4] = this.state.content_data[i].imageOfContent;
        contents[i][5] = this.state.content_data[i].lastUpdatedBy;
        contents[i][6] = this.state.content_data[i].divId;
      } 
    }

    if(contents.length > 0 && this.state.content_data.length > 0){
      var listItems = contents.map((content) =>
          <Item 
            isEditModeOnItem = {false} _id = {content[0]} pageOfContent = {content[1]} 
            titleOfContent = {content[2]} textOfContent = {content[3]} 
            isLoggedIn = {this.state.isLoggedIn} imageOfContent = {content[4]}
            lastUpdatedBy = {content[5]} divId = {content[6]} isNewItemDivEnabled = {this.state.isNewItemDivEnabled}
            callbackIsItemDeletedParam = {this.callbackIsItemDeleted}
          />
      );

      return (
        <div className = "App">
          {this.state.visible != false &&
          <div>
            <Header main_title={this.state.main_title} />
          </div>
          }
          <div className="body" id = "body">
            {this.state.isLoggedIn != false &&
              <div>
                <button className = "newItemButton" onClick={this.openNewItemBox.bind(this)}>
                  New Item
                </button>
                <button className = "changeOrderButton">
                  Change Order
                </button>
              </div>
            }
            <div>
              {listItems}
            </div>
            {this.state.isNewItemDivEnabled != false &&
              <div id = "newItemDiv">
                <Item 
                  isEditModeOnItem = {true} _id = {null} pageOfContent = {this.state.pageOfContentValue} 
                  titleOfContent = {"Title Here"} textOfContent = {"Text Here"} 
                  isLoggedIn = {this.state.isLoggedIn} imageOfContent = {"none"}
                  lastUpdatedBy = {null} divId = {this.state.content_data.length + 1} isNewItemDivEnabled = {this.state.isNewItemDivEnabled}
                  callbackIsNewItemDivEnabledParam = {this.callbackIsNewItemDivEnabled}
                  callbackIsNewItemAddedParam = {this.callbackIsNewItemAdded}
                />
              </div>
            }
          </div>
        </div>
      );
    }

    else{
      return (
        <div>

        </div>
      );
    }
  }
}
export default HomePage;
