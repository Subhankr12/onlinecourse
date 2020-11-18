import React from 'react';
import axios from 'axios';

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showInput: false,
            title: "",
            description: "",
            topics: [],
        }

        this.addCourse = this.addCourse.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount(){
        let id = window.location.search.substring(4, window.location.search.length);
       axios.get(`http://localhost:5000/topics/${id}`)
            .then(res => {
                console.log(res.data.topics);
                this.setState({
                    topics: res.data.topics,
                })
            })
            .catch(err => console.log(err));
    }

    addCourse() {
        this.setState({
            showInput: true,
        })
    }

    onInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit() {
        let id = window.location.search.substring(4, window.location.search.length);
        const { title, description } = this.state;
        axios.post(`http://localhost:5000/topics/create?id=${id}`, {
            title,
            description
        }).then(course => {
            console.log(course);
            window.location.reload();  
        }).catch(err => console.log(err));
    }

    onDelete(topicId) {
        let courseId = window.location.search.substring(4, window.location.search.length);
        
        axios.post('http://localhost:5000/topics/delete', {
            topicId,
            courseId
        }).then(res => {
            window.location.reload();
        }).catch(err => console.log(err));
    }
    render(){
        return(
            <div className="main">
                <a className="add" onClick={this.addCourse}>Add Topic +</a>
                {this.state.showInput && 
                    <div className="inputcontainer">
                        <div className="inputwrapper">
                            <span className="inputtitle">Topic Name</span>
                            <input type="text" name="title" placeholder="Enter course..." value={this.state.title} onChange={this.onInputChange}/>
                        </div>
                        <div className="inputwrapper">
                            <span className="inputtitle">Description</span>
                            <textarea rows="5" type="number" name="description" placeholder="Enter description..." value={this.state.description} onChange={this.onInputChange}/>
                        </div>
                        <a className="submit" onClick={this.onSubmit}>Submit</a>
                    </div>
                }
                {this.state.topics.map((topic, key) => 
                    <div className="coursecard" key={key}>
                        <h3 className="coursename">{topic.title}</h3>
                        <p className="coursedesc">{topic.description}</p>
                        <a className="delete" onClick={() => this.onDelete(topic._id)}>Delete</a>
                    </div>
                )}

                <style jsx="true" global="true">{`
                    .coursecard {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                    }
                `}</style>
            </div>
        )
    }
}