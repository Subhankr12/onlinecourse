import React from 'react';
import axios from 'axios';
import arrowRight from '../assets/arrowright.svg';
import { Link } from "react-router-dom";

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showInput: false,
            title: "",
            duration: "",
            description: "",
            alertmsg: "",
            courses: [],
        }

        this.addCourse = this.addCourse.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:5000/courses/')
            .then(courses => {
                console.log(courses);
                this.setState({
                    courses: courses.data,
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
        const { title, duration, description } = this.state;
        axios.post('http://localhost:5000/courses/create', {
            title: title.split(" ")[0],
            duration,
            description
        }).then(course => {
            console.log(course);
            if(course.data.message !== 'created'){
                this.setState({
                    alertmsg: course.data.message,
                })
            }
            else {
                window.location.reload();  
            }
        }).catch(err => console.log(err));
    }
    onDelete(id) {
        axios.post('http://localhost:5000/courses/delete', {
            id
        }).then(res => {
            window.location.reload();
        }).catch(err => console.log(err));
    }

    render(){
        return(
            <div className="main">
                <a className="add" onClick={this.addCourse}>Add Course +</a>
                {this.state.showInput && 
                    <div className="inputcontainer">
                        <div className="inputwrapper">
                            <span className="inputtitle">Course Name</span>
                            <input type="text" name="title" placeholder="Enter course..." value={this.state.title} onChange={this.onInputChange}/>
                        </div>
                        <div className="inputwrapper">
                            <span className="inputtitle">Duration(in days)</span>
                            <input type="number" name="duration" placeholder="Enter duration(in days)..." value={this.state.duration} onChange={this.onInputChange}/>
                        </div>
                        <div className="inputwrapper">
                            <span className="inputtitle">Description</span>
                            <textarea rows="5" type="number" name="description" placeholder="Enter description..." value={this.state.description} onChange={this.onInputChange}/>
                        </div>
                        <a className="submit" onClick={this.onSubmit}>Submit</a>
                    </div>
                }
                {this.state.alertmsg !== "" && 
                    <small className="alertmsg">{this.state.alertmsg}</small>
                }
                {this.state.courses.map((course, key) => 
                    <div className="coursecard" key={key}>
                        <div>
                            <h3 className="coursename">{course.title}</h3>
                            <h4>Duration: {course.duration} days</h4>
                            <p className="coursedesc">{course.description}</p>
                            <a className="delete" onClick={() => this.onDelete(course._id)}>Delete</a>
                        </div>
                        <Link to={`/topics?id=${course._id}`}><img className="next" src={arrowRight} alt="move next icon"/></Link>
                    </div>
                )}
            </div>
        )
    }
}