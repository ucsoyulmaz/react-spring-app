import React, { Component } from 'react';
import './item.css';

class Item extends Component {
    //Constructor elements to store state variables and binding functions(from beginning of the execution to ending)
    constructor(props) {

        super(props);
    
        this.state = {
            _id: this.props._id,
            isEditModeOnItem: this.props.isEditModeOnItem,
            titleOfContent: this.props.titleOfContent,
            textOfContent: this.props.textOfContent,
            divId: this.props.divId,
            lastUpdatedBy: this.props.lastUpdatedBy,
            imageOfContent: this.props.imageOfContent,
            pageOfContent: this.props.pageOfContent,
            isLoggedIn: this.props.isLoggedIn,
            tmpTitleOfContent: this.props.titleOfContent,
            tmpTextOfContent: this.props.textOfContent,
            tmpImageOfContent: this.props.imageOfContent,
            isNewItemDivEnabled : this.props.isNewItemDivEnabled
        }

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        }

        handleChangeTitle(event) {
            this.setState({tmpTitleOfContent: event.target.value});
        }
        
        handleChangeText(event) {
            this.setState({tmpTextOfContent: event.target.value});
        }

        handleChangeImage(event) {
            this.setState({tmpImageOfContent: event.target.value});
        }

        makeEditableItem(){
            this.setState({ isEditModeOnItem: true});
        }

        makeNotEditableItemUpdate(){
            this.setState({ isEditModeOnItem: false});
            this.setState({ tmpTitleOfContent: this.state.titleOfContent});
            this.setState({ tmpTextOfContent: this.state.textOfContent});
            this.setState({ tmpImageOfContent: this.state.imageOfContent});
        }

        makeNotEditableItemInsert(){
            this.props.callbackIsNewItemDivEnabledParam(false);
        }

        saveEdits(){
            const request = async () => {
              const response = await fetch('http://www.aboutsoftwareengineering.com:8081/contentadmin/' + this.state._id, { 
                method: 'put', 
                headers: {
                  'Authorization': 'Basic Y2VtOmRlZm5lMTk5NGNpbWJvbTE=', 
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  '_id': this.state._id,
                  'pageOfContent': this.state.pageOfContent,
                  'titleOfContent': this.state.tmpTitleOfContent,
                  'textOfContent': this.state.tmpTextOfContent,
                  'imageOfContent': this.state.tmpImageOfContent,
                  'lastUpdatedBy': this.state.lastUpdatedBy,
                  'divId': this.state.divId
                })
              });

              this.setState({ titleOfContent: this.state.tmpTitleOfContent});
              this.setState({ textOfContent: this.state.tmpTextOfContent});
              this.setState({ imageOfContent: this.state.tmpImageOfContent});
            }
            request();
            this.setState({ isEditModeOnItem: false});
          }

        insertItem(){
            const request = async () => {
                const response = await fetch('http://www.aboutsoftwareengineering.com:8081/contentadmin/', { 
                method: 'post', 
                headers: {
                    'Authorization': 'Basic Y2VtOmRlZm5lMTk5NGNpbWJvbTE=', 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'pageOfContent': this.state.pageOfContent,
                    'titleOfContent': this.state.tmpTitleOfContent,
                    'textOfContent': this.state.tmpTextOfContent,
                    'imageOfContent': this.state.tmpImageOfContent,
                    'lastUpdatedBy': this.state.lastUpdatedBy,
                    'divId': this.state.divId
                })
                });

                this.setState({ titleOfContent: this.state.tmpTitleOfContent});
                this.setState({ textOfContent: this.state.tmpTextOfContent});
                this.setState({ imageOfContent: this.state.tmpImageOfContent});
                this.setState({ isEditModeOnItem: false});
                this.props.callbackIsNewItemAddedParam();
                this.props.callbackIsNewItemDivEnabledParam(false);
            }
            request();
        }

        deleteItem(){
            const request = async () => {
                const response = await fetch('http://www.aboutsoftwareengineering.com:8081/contentadmin/' + this.state._id, { 
                method: 'delete', 
                headers: {
                    'Authorization': 'Basic Y2VtOmRlZm5lMTk5NGNpbWJvbTE=', 
                    'Content-Type': 'application/json'
                }
                });
                this.props.callbackIsItemDeletedParam();
            }
            request();
        }

        render() {
            return(
                <div className = "item">
                    {this.state.isEditModeOnItem != true &&
                    <div className = "heading">
                        {this.state.titleOfContent}
                    </div>
                    }
                    {this.state.isEditModeOnItem != false &&
                    <div className = "heading">
                        <textarea caption="titleOfContent" value={this.state.tmpTitleOfContent} onChange={this.handleChangeTitle} className = "inputBoxTitle"/>
                    </div>
                    }
                    {this.state.isEditModeOnItem != true && this.state.textOfContent != 'none' &&
                    <div className = "normal_text">
                        {this.state.textOfContent}
                    </div>
                    }
                    {this.state.isEditModeOnItem != true && this.state.imageOfContent != 'none' &&
                    <div className = "normal_text">
                        <img className = "sdlc" src={this.state.imageOfContent} />
                    </div>
                    }
                    {this.state.isEditModeOnItem != false && this.state.textOfContent != 'none' &&
                    <div className = "normal_text">
                        <textarea caption="textOfContent" value={this.state.tmpTextOfContent} onChange={this.handleChangeText} className = "inputBoxText"/>
                    </div>
                    }
                    {this.state.isEditModeOnItem != false && this.state.imageOfContent != 'none' &&
                    <div className = "normal_text">
                        <textarea caption="imageOfContent" value={this.state.tmpImageOfContent} onChange={this.handleChangeImage} className = "inputBoxText"/>
                    </div>
                    }
                    {this.state.isLoggedIn != false && this.state.isEditModeOnItem != true &&
                    <div>
                        <button className = "editButton" onClick={this.makeEditableItem.bind(this)}>
                            Edit Item {this.state.divId}
                        </button>
                    </div>
                    }
                    {this.state.isLoggedIn != false && this.state.isEditModeOnItem != true &&
                    <div>
                        <button className = "editButton" onClick={this.deleteItem.bind(this)}>
                            Delete Item {this.state.divId}
                        </button>
                    </div>
                    }
                    {this.state.isLoggedIn != false && this.state.isEditModeOnItem != false &&
                    <div>
                        {this.state._id !== null &&
                            <div>
                                <button className = "saveEditButton" onClick={this.saveEdits.bind(this)}>
                                    Save Edit
                                </button>
                            </div>
                        }

                        {this.state._id === null &&
                            <div>
                                <button className = "saveEditButton" onClick={this.insertItem.bind(this)}>
                                    Save Edit
                                </button>
                            </div>
                        }
                        
                        {this.state._id != null && 
                            <div>
                                <button className = "cancelButton" onClick={this.makeNotEditableItemUpdate.bind(this)}>
                                    Cancel
                                </button>
                            </div>
                        }
                        {this.state._id == null && 
                            <div>
                                <button className = "cancelButton" onClick={this.makeNotEditableItemInsert.bind(this)}>
                                    Cancel
                                </button>
                            </div>
                        }
                    </div>
                    }
                </div>
            );
            
        }
}
export default Item;       
        