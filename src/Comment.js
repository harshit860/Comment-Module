import React, { Component } from 'react'

export default class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Users: ['select user', 'harshit', 'karan', 'rahul', 'siba'],
            Comment: '',
            MainComments: [],
            SelectedUser: '',
            replyComment: '',
            ReplyUser: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => { console.log(this.state) })
    }
    // Add Comment 
    addComment = () => {
        let date1 = new Date
        let finaldate = date1.getUTCDate() + '/' + date1.getUTCMonth() + '/' + date1.getFullYear()
        let finaltime = new Date().toTimeString().split(" ")[0]
        let length = this.state.MainComments.length
        let obj = {
            id: length + 1,
            comment: this.state.Comment,
            user: this.state.SelectedUser,
            token: false,
            Reply: [],
            date: finaldate,
            time: finaltime
        }
        this.setState({
            MainComments: [...this.state.MainComments, obj],
            Comment: ''
        })

    }

    // Add reply in a particular comment

    addreply = (id) => {
        let newcomments = []
        this.state.MainComments.map(element => {
            if (element.id == id) {
                let newelem = element
                let date1 = new Date
                let finaldate = date1.getUTCDate() + '/' + date1.getUTCMonth() + '/' + date1.getFullYear()
                let finaltime = new Date().toTimeString().split(" ")[0]
                let datetime = finaldate + '--' + finaltime
                let replyobj = {
                    user: this.state.ReplyUser,
                    comment: this.state.replyComment,
                    date: datetime

                }
                newelem.Reply.push(replyobj)
                newelem.token = !element.token
                newcomments.push(newelem)
            }
            else {
                newcomments.push(element)
            }
        })

        this.setState({
            MainComments: newcomments,
            replyComment: ''
        })
    }
// Function to enable user to reply on a particular comment
    replyFlag = (id) => {
        let newComments = []
        this.state.MainComments.map(element => {
            if (element.id == id) {
                let newelem = element
                newelem.token = !element.token
                newComments.push(newelem)
            }
            else {
                newComments.push(element)
            }
        })

        this.setState({
            MainComments: newComments
        })
    }

    render() {
        console.log(this.state)
        return (
            <React.Fragment>
                <div className="com">
                    <select className="size" onChange={(e) => { this.setState({ SelectedUser: e.target.value }) }}>
                        {this.state.Users.map((element) => {
                            if (element !== this.state.Users[0]) {
                                return <option value={element} >{element}</option>
                            }
                            else {
                                return <option  >{element}</option>
                            }
                        })}
                    </select>
                    <textarea placeholder={'Comment'} value={this.state.Comment} name="Comment" onChange={this.handleChange}></textarea>
                    <button onClick={this.addComment}>Add Comment</button>
                </div>
                <div >
                
                    {this.state.MainComments.map(element => {    // This is Main Comments and information of each comment
                        return <div className="comments">
                            <p ><b>{element.user} ---- {element.date}---- {element.time}</b></p>
                            <p>{element.comment}</p>
                            <button id="reply" onClick={() => this.replyFlag(element.id)}>Reply</button>
                            
                            
                             {/* These are all the replys if any related to above comments  */}


                            <div style={{ marginLeft: 15 }}>
                                {
                                    element.Reply.map(element => {
                                        return <div style={{ width: '40%', display: 'flex', flexDirection: "row", justifyContent: "space-around" }}>
                                            <p>{element.comment}</p>
                                            <p><b>User :{element.user}</b></p>
                                            <p>{element.date}</p>
                                        </div>

                                    })
                                }
                            </div>

                        {/* This is the reply textarea , userselect and addreply button */}
                           
                            {element.token ?
                                (
                                    <div style={{ padding: 3, display: "flex", flexDirection: "column" }}>
                                        <textarea placeholder={'Comment'} name="replyComment" onChange={this.handleChange}></textarea>
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <select className="size" onChange={(e) => { this.setState({ ReplyUser: e.target.value }) }}>
                                                {this.state.Users.map((element) => {
                                                    if (element !== this.state.Users[0]) {
                                                        return <option value={element} >{element}</option>
                                                    }
                                                    else {
                                                        return <option  >{element}</option>
                                                    }
                                                })}
                                            </select>
                                            <button onClick={() => this.addreply(element.id)}>Add Reply</button>
                                            <button onClick={() => this.replyFlag(element.id)}>Cancel</button>
                                        </div>

                                    </div>
                                )
                                : ('')}
                        </div>
                    })}
                </div>
            </React.Fragment>
        )
    }
}
