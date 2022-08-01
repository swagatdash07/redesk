import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import Footer from "./Footer";
import { Drawer } from "@material-ui/core/";
import clsx from "clsx";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
// import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
// import sjasf from bhasas
const Dashboard = ({ updateUser, user, useStyles }) => {
  const navigate=useNavigate();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const openProject = () => {
    setOpen(true);
  };
  const closeProject = () => {
    setOpen();
  };

  const [projectInputs, setProjectInputs] = useState({
    project_name: "",
    project_desc: "",
    project_template: "",
    project_label: "",
    project_category: "",
    project_client: "",
  });
  const handleProject = (e) => {
    const { name, value } = e.target;
    setProjectInputs({
      ...projectInputs,
      [name]: value,
    });
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const {
      project_name,
      project_desc,
      project_template,
      project_label,
      project_category,
      project_client,
    } = projectInputs;
    const res = await fetch("/api/project", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project_name,
        project_desc,
        project_template,
        project_label,
        project_category,
        project_client,
      }),
    });
    const data = await res.json();
    console.log(data.status);
    if (data.status === "200") {
      toast.success(data.message, {
        position: "bottom-right",
        theme: "colored",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      closeProject();
      setProjectInputs({
        project_name: "",
        project_desc: "",
        project_template: "",
        project_label: "",
        project_category: "",
        project_client: "",
      });
      getProjectList();
    } else {
      toast.error("Project added failed", {
        position: "bottom-right",
        theme: "colored",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  //User list api
  const [userList, setUserList] = useState([]);

  const getUserList = () => {
    axios.get("/api/userList",{
      headers: {
        Authorization:user.token
      }
    }).then((response) => {
      const myUserList = response.data.docs;
      //console.log(myUserList);
      setUserList(myUserList);
    }).catch((err)=>{
      
      if (err.response.data.status==="422" || err.response.status===401) {
        updateUser({});
        navigate("/login")
    }else{
      console.log(err.response)
    }
    })
  };
  useEffect(() => getUserList(), []);

  //project list api
  const [projectList, setProjectList] = useState([]);

  const getProjectList = () => {
    axios.get("/api/projectList").then((response) => {
      const myProjectList = response.data.docs;
      // console.log(myProjectList);
      setProjectList(myProjectList);
    });
  };
  useEffect(() => getProjectList(), []);

  const Task = (item) => {
    console.log(item)
      navigate("/issue",{state:{project_id:item._id,name:item.project_name}})
  };

  
  return (
    <div>
      <TopNav updateUser={updateUser} user={user} />
      <ToastContainer />
      <div className="container-fluid page-body-wrapper">
        <SideNav />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-md-12 grid-margin">
                <div className="d-flex justify-content-between flex-wrap">
                  <div className="d-flex align-items-end flex-wrap">
                    <div className="me-md-3 me-xl-5">
                      <h2>Projects,</h2>
                      <p className="mb-md-0">
                        Your analytics dashboard template.
                      </p>
                    </div>
                    <div className="d-flex">
                      <i className="mdi mdi-home text-muted hover-cursor"></i>
                      <p className="text-muted mb-0 hover-cursor">
                        &nbsp;/&nbsp;Dashboard&nbsp;&nbsp;
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-end flex-wrap">
                    <button
                      type="button"
                      className="btn btn-light bg-white btn-icon me-3 d-none d-md-block "
                    >
                      <i className="mdi mdi-download text-muted"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-light bg-white btn-icon me-3 mt-2 mt-xl-0"
                    >
                      <i className="mdi mdi-clock-outline text-muted"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-light bg-white btn-icon me-3 mt-2 mt-xl-0"
                    >
                      <i className="mdi mdi-plus text-muted"></i>
                    </button>
                    {
                      user.role==="admin" &&
                   
                    <button
                      color="inherit"
                      aria-label="open drawer"
                      edge="start"
                      className={
                        clsx(classes.menuButton, open && classes.hide) &&
                        "btn btn-primary mt-2 mt-xl-0 text-white"
                      }
                      onClick={openProject}
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                    >
                      
                      Create Project
                    </button>
                     }
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 my-3">
                <div className="card">
                  <div className="card-body dashboard-tabs p-0">
                    <ul className="nav nav-tabs p-2" role="tablist">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          id="overview-tab"
                          data-bs-toggle="tab"
                          href="#overview"
                          role="tab"
                          aria-controls="overview"
                          aria-selected="true"
                        >
                          Active
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="sales-tab"
                          data-bs-toggle="tab"
                          href="#sales"
                          role="tab"
                          aria-controls="sales"
                          aria-selected="false"
                        >
                          Completed
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="purchases-tab"
                          data-bs-toggle="tab"
                          href="#purchases"
                          role="tab"
                          aria-controls="purchases"
                          aria-selected="false"
                        >
                          Purchases
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content py-0 px-0">
                      <div
                        className="tab-pane fade show active"
                        id="overview"
                        role="tabpanel"
                        aria-labelledby="overview-tab"
                      >
                        <div className="d-flex flex-wrap justify-content-xl-between">
                          <div className="d-none d-xl-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                            <i className="mdi mdi-calendar-heart icon-lg me-3 text-primary"></i>
                            <div className="d-flex flex-column justify-content-around">
                              <small className="mb-1 text-muted">
                                Start date
                              </small>
                              <div className="dropdown">
                                <Link
                                  className="btn btn-secondary dropdown-toggle p-0 bg-transparent border-0 text-dark shadow-none font-weight-medium"
                                  to=""
                                  role="button"
                                  id="dropdownMenuLinkA"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <h5 className="mb-0 d-inline-block">
                                    26 Jul 2018
                                  </h5>
                                </Link>
                                <div
                                  className="dropdown-menu"
                                  aria-labelledby="dropdownMenuLinkA"
                                >
                                  <Link className="dropdown-item" to="">
                                    12 Aug 2018
                                  </Link>
                                  <Link className="dropdown-item" to="">
                                    22 Sep 2018
                                  </Link>
                                  <Link className="dropdown-item" to="">
                                    21 Oct 2018
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                            <i className="mdi mdi-currency-usd me-3 icon-lg text-danger"></i>
                            <div className="d-flex flex-column justify-content-around">
                              <small className="mb-1 text-muted">Revenue</small>
                              <h5 className="me-2 mb-0">$577545</h5>
                            </div>
                          </div>
                          <div className="d-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                            <i className="mdi mdi-eye me-3 icon-lg text-success"></i>
                            <div className="d-flex flex-column justify-content-around">
                              <small className="mb-1 text-muted">
                                Total views
                              </small>
                              <h5 className="me-2 mb-0">9833550</h5>
                            </div>
                          </div>
                          <div className="d-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                            <i className="mdi mdi-download me-3 icon-lg text-warning"></i>
                            <div className="d-flex flex-column justify-content-around">
                              <small className="mb-1 text-muted">
                                Downloads
                              </small>
                              <h5 className="me-2 mb-0">2233783</h5>
                            </div>
                          </div>
                          <div className="d-flex py-3 border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                            <i className="mdi mdi-flag me-3 icon-lg text-danger"></i>
                            <div className="d-flex flex-column justify-content-around">
                              <small className="mb-1 text-muted">Flagged</small>
                              <h5 className="me-2 mb-0">3497843</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
             
              {user.role==="admin" && projectList.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="col-md-4 grid-margin stretch-card"
                    id="overview"
                    role="tabpanel"
                    aria-labelledby="overview-tab"
                  >
                    <div
                      className="card"
                      style={{
                        borderRadius: "1rem",
                        backgroundColor: "rgb(255, 255, 255)",
                      }}
                    >
                      <div className="card-body">
                      
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => Task(item)}
                            className="row"
                          >
                            <img
                              src="images/favicon.png"
                              alt="..."
                              className="rounded col-md-2"
                            />
                            <p
                              className="card-title col-md-10"
                              style={{ fontSize: "17px" }}
                            >{`Project Name - ${item.project_name}`}</p>
                            <p
                              style={{ marginLeft: "79px", marginTop: "-22px" }}
                            >{`Project Desc - ${item.project_desc}`}</p>
                          </div>
                      
                        <div
                          id="cash-deposits-chart-legend"
                          className="d-flex justify-content-center pt-3 row"
                          style={{
                            textAlign: "center",

                            marginBottom: "-16px",
                            marginLeft: "-29px",
                            marginTop: " 3rem",
                            marginRight: "-29px",
                          }}
                        >
                          <div
                            className="col-md-6"
                            style={{
                              border: "1px solid gray",
                              borderBottom: "none",
                              borderLeft: "none",
                              padding: "18px",
                              backgroundColor: "rgb(255, 255, 255) ",
                            }}
                          >
                            <span>Open</span> {i + 1}
                          </div>
                          <div
                            className="col-md-6"
                            style={{
                              border: "1px solid gray",
                              borderBottom: "none",
                              borderLeft: "none",
                              padding: "18px",
                              backgroundColor: "rgb(255, 255, 255) ",
                            }}
                          >
                            <span>Close</span> 0
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Footer />
        </div>
      </div>
      {/* Create Project drawer */}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        onClose={closeProject}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <div className="card-header-right">
            <Link
              onClick={closeProject}
              to=""
              className="collapsed btn btn-sm waves-effect waves-light btn-primary m-0"
            >
              {" "}
              Close{" "}
            </Link>
          </div>
        </div>

        <div className="col-md-12 grid-margin stretch-card">
          <div className="card-body">
            <h4 className="card-title">Create Project</h4>

            <form className="forms-sample" method="POST">
              <div className="form-group row">
                <label
                  htmlFor="exampleInputprojectName"
                  className="col-sm-3 col-form-label"
                >
                  Project Name
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputprojectName"
                    name="project_name"
                    placeholder="Project Name"
                    onChange={handleProject}
                    value={projectInputs.project_name}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="exampleInputprojectDesc"
                  className="col-sm-3 col-form-label"
                >
                  Project Description
                </label>
                <div className="col-sm-9">
                  <input
                    type="textarea"
                    className="form-control"
                    id="exampleInputprojectDesc"
                    name="project_desc"
                    placeholder="Project Description"
                    onChange={handleProject}
                    value={projectInputs.project_desc}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="exampleInputprojectTemplate"
                  className="col-sm-3 col-form-label"
                >
                  Project Template
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputprojectTemplate"
                    name="project_template"
                    placeholder="Project Template"
                    onChange={handleProject}
                    value={projectInputs.project_template}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="exampleInputprojectLabel"
                  className="col-sm-3 col-form-label"
                >
                  Project Lebel
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputprojectLabel"
                    name="project_label"
                    placeholder="Project Lebel"
                    onChange={handleProject}
                    value={projectInputs.project_label}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="exampleInputprojectCategory"
                  className="col-sm-3 col-form-label"
                >
                  Project Category
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputprojectCategory"
                    name="project_category"
                    placeholder="Project Category"
                    onChange={handleProject}
                    value={projectInputs.project_category}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="exampleInputprojectClient"
                  className="col-sm-3 col-form-label"
                >
                  Project Client
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputprojectClient"
                    name="project_client"
                    placeholder="Project Client"
                    onChange={handleProject}
                    value={projectInputs.project_client}
                  />
                </div>
              </div>

              <div className="form-check form-check-flat form-check-primary">
                <label className="form-check-label">
                  <input type="checkbox" className="form-check-input" />
                  Remember me
                </label>
              </div>
              <button
                onClick={handleProjectSubmit}
                type="submit"
                className="btn btn-primary me-2"
              >
                Submit
              </button>
              <button className="btn btn-light">Cancel</button>
            </form>
          </div>
        </div>
      </Drawer>

      {/* Create issue drawer */}
      {/* <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={taskOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <div className="card-header-right">
            <Link
              onClick={closeTask}
              to=""
              className="collapsed btn btn-sm waves-effect waves-light btn-danger m-0"
            >
              {" "}
              Close{" "}
            </Link>
          </div>
        </div>
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card-body">
            <h4 className="card-title">Create Issue</h4>

            <form className="forms-sample" method="POST">
              <div className="form-group row">
                <label
                  htmlFor="exampleInputprojectName"
                  className="col-sm-3 col-form-label"
                >
                  Task Name
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputprojectName"
                    name="task_name"
                    placeholder="Task Name"
                    onChange={handleIssue}
                    value={inputTask.task_name}
                    required
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="exampleInputprojectDesc"
                  className="col-sm-3 col-form-label"
                >
                  Task Desc
                </label>
                <div className="col-sm-9">
                  <input
                    type="textarea"
                    className="form-control"
                    id="exampleInputprojectDesc"
                    name="task_description"
                    placeholder="Task Desc"
                    onChange={handleIssue}
                    value={inputTask.task_description}
                    required
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="exampleInputprojectCategory"
                  className="col-sm-3 col-form-label"
                >
                  Task List
                </label>
                <div className="col-sm-9">
                  <select
                    className="form-control form-control-lg"
                    name="task_list"
                    onChange={handleIssue}
                    value={inputTask.task_list}
                  >
                    <option value="To Do">To Do</option>
                    <option value="2">Doing</option>
                    <option value="3">Client Review</option>
                    <option value="4">Done</option>
                  </select>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="exampleInputprojectCategory"
                  className="col-sm-3 col-form-label"
                >
                  Task Assignee
                </label>
                <div className="col-sm-9">
                  <MultiSelect
                    className="multi-select w-100 "
                    onChange={handleOnchange}
                    name="multiple"
                    options={options}
                  />
                  <br />
                  <div className="preview-values">
                    <b>Values: </b>
                    {value}
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="exampleInputprojectClient"
                  className="col-sm-3 col-form-label"
                >
                  Task Due On
                </label>
                <div className="col-sm-9">
                  <input
                    type="date"
                    className="form-control"
                    id="exampleInputprojectClient"
                    name="task_due_on"
                    placeholder="Task Due On"
                    onChange={handleIssue}
                    value={inputTask.task_due_on}
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="exampleInputprojectClient"
                  className="col-sm-3 col-form-label"
                >
                  Task Labels
                </label>
                <div className="col-sm-9">
                  <select
                    className="form-control form-control-lg"
                    name="task_labels"
                    onChange={handleIssue}
                    value={inputTask.task_labels}
                  >
                    <option value="NEW">NEW</option>
                    <option value="FIXED">FIXED</option>
                    <option value="ASSIGNED">ASSIGNED</option>
                    <option value="WORKS FOR ME">WORKS FOR ME</option>
                    <option value="VARIFIED">VARIFIED</option>
                    <option value="IN PROGRESS">IN PROGRESS</option>
                    <option value="WONT FIX">WONT FIX</option>
                    <option value="APPROVED BY CLIENT">
                      APPROVED BY CLIENT
                    </option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="exampleInputprojectClient"
                  className="col-sm-3 col-form-label"
                >
                  Task Time Estimation
                </label>
                <div className="col-sm-9">
                  <input
                    type="time"
                    className="form-control"
                    id="exampleInputprojectClient"
                    name="task_time_estimation"
                    placeholder="Task Time Estimation"
                    onChange={handleIssue}
                    value={inputTask.task_time_estimation}
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="exampleInputprojectClient"
                  className="col-sm-3 col-form-label"
                >
                  Task Priority
                </label>
                <div className="col-sm-9">
                  <select
                    className="form-control form-control-lg"
                    name="task_priority"
                    onChange={handleIssue}
                    value={inputTask.task_priority}
                  >
                    <option value="low">LOW</option>
                    <option value="medium">MEDIUM</option>
                    <option value="high">HIGH</option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="exampleInputprojectTemplate"
                  className="col-sm-3 col-form-label"
                >
                  Task Attachment
                </label>
                <div className="col-sm-9">
                  <input
                    type="file"
                    className="form-control"
                    id="exampleInputprojectTemplate"
                    name="task_attachment"
                    placeholder="Task Attachment"
                    onChange={handleIssue}
                    value={inputTask.task_attachment}
                    required
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="exampleInputprojectCategory"
                  className="col-sm-3 col-form-label"
                >
                  Task Subscriber
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputprojectCategory"
                    name="task_subscribers"
                    placeholder="Task List"
                    onChange={handleIssue}
                    value={inputTask.task_subscribers}
                    required
                  />
                </div>
              </div>

              {/* <div className="form-check form-check-flat form-check-primary">
                <label className="form-check-label">
                  <input type="checkbox" className="form-check-input" />
                  Remember me
                </label>
              </div> 
              <button
                onClick={handleIssueSubmit}
                type="submit"
                className="btn btn-primary me-2"
              >
                Submit
              </button>
              <button className="btn btn-light">Cancel</button>
            </form>
          </div>
        </div>
      </Drawer> */}
    </div>
  );
};

export default Dashboard;
