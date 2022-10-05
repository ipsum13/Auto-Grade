import React, { useState, useEffect } from "react";
import axios from "axios";
import { Jumbotron, Card, Button, DropdownButton, Dropdown, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import Footer from '../footer/Footer';
import image1 from "../../images/course_cover1.jpg";
import image2 from "../../images/course_cover2.jpg";
import image3 from "../../images/course_cover3.png";
import "./Dashboard.css";
import AddStudentModal from "./AddStudentModal";


var imageArr = [image1, image2, image3];

const Dashboard = props => {
  const [courses, setCourses] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const getCourses = () => {

    axios.get(`/api/course/get-courses/${props.auth.user.id}`).then((response) => {
      const data = [];
      for (let i = 0; i < response.data.length; i++) {
        const item = {
          faculty: response.data[i].faculty,
          course: response.data[i].course_title,
          section: response.data[i].section
        }
        data.push(item);
      }
      setCourses(data);
      setFetching(false);
    })
  }

  useEffect(() => getCourses(), []);

  const toggleModal = () => {
    setShowModal(!showModal)
}
const handleModal = () => {
    setShowModal(true);
}
  const { user } = props.auth;

  const renderCourses = () => {
    let i = 0;
    if (fetching) {
      return <h4 class="loading">Loading...</h4>;
    }

    if (courses.length === 0) {
      return (
        <div style={{ display: 'table', margin: '0 auto', paddingTop: '5vw' }}>
          <Card
            style={{ width: '18rem' }}
            className="mb-2"
          >
            <Card.Header></Card.Header>
            <Card.Body>
              <Card.Title>You have not created any courses yet </Card.Title>
              <Button variant="primary" href="/create-course">
                Create A Course
              </Button>
            </Card.Body>
          </Card>
        </div>
      )
    }
    if (courses.length > 0) {
      return (
        <div style={{ display: 'table', margin: '0 auto', paddingTop: '5vw' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gridGap: "3vw" }}>
          {courses.map((item, idx) =>
            <Card key={item.course} style={{ width: '18rem' }}>
              <Card.Img variant="top" src={imageArr[i++]} style={{height: '22vh'}}/>
              <Card.Body>
                <Card.Title>{item.course}</Card.Title>
                <Card.Text>
                  Autumn 2021
                </Card.Text>
                <DropdownButton id="dropdown-basic-button" variant="success" title="Upload Assessment Marks" style={{ marginTop: '8px', marginLeft: '15px' }}>
                  <Dropdown.Item href="/upload-quiz-marks">Quizes</Dropdown.Item>
                  <Dropdown.Item href="/upload-assignment-marks">Assignments</Dropdown.Item>
                  <Dropdown.Item href="/upload-project-marks">Project</Dropdown.Item>
                  <Dropdown.Item href="/upload-midterm-marks">Midterm</Dropdown.Item>
                  <Dropdown.Item href="/upload-final-marks">Final</Dropdown.Item>
                </DropdownButton>
                <DropdownButton id="dropdown-basic-button" title="View Assessment Marks" style={{ marginTop: '8px' }}>
                  <Dropdown.Item href={`/quizes/${item.course}/${item.section}`}>Quizes</Dropdown.Item>
                  <Dropdown.Item href={`/assignments/${item.course}/${item.section}`}>Assignments</Dropdown.Item>
                  <Dropdown.Item href={`/projects/${item.course}/${item.section}`}>Project</Dropdown.Item>
                  <Dropdown.Item href={`/midterm/${item.course}/${item.section}`}>Midterm</Dropdown.Item>
                  <Dropdown.Item href={`/final/${item.course}/${item.section}`}>Final</Dropdown.Item>
                </DropdownButton>
                <Button href={`/generate-grades/${item.course}/${item.section}`} style={{marginTop: '9px', marginRight: '39px', background: "#092040", border: "none" }}>View Course Grades</Button>
                <AddStudentModal showModal={showModal} toggle={toggleModal} user={user}/>
                <Button onClick={handleModal} style={{marginTop: '9px', marginRight: '50px', background: "#092040", border: "none" }}>Add A New Student</Button>
              </Card.Body>
            </Card>
          )}
        </div>
        </div>
      )
    }

  }

  return (
    <>
    <Jumbotron fluid style={{ textAlign: "center", height: "100vh" }}>
      <h4>
        <b>Hey there,</b> {user.name.split(" ")[0]}
        <p>
          Welcome to Auto-Grade 👏
        </p>
      </h4>
      {renderCourses()}
    </Jumbotron>
    <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
