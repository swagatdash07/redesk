import React, { useState, useEffect } from "react";
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import { Drawer } from "@material-ui/core/";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AllIssue = ({ updateUser, user, useStyles, project }) => {
  const classes = useStyles();
  const [taskList, setTaskList] = useState([]);
  const navigate = useNavigate();

  const getTaskList = async () => {
    await fetch("/api/taskList")
      .then((response) => response.json())
      .then((res) => {
        setTaskList(res.docs);
        //console.log(taskList)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getTaskList();
  }, []);

  const [taskOpen, setTaskOpen] = useState(false);

  const openTask = () => {
    setTaskOpen(true);
  };
  const closeTask = () => {
    setTaskOpen();
  };
  const [inputTask, setInputTask] = useState({
    task_name: "",
    task_description: "",
    task_attachment: "",
    task_subscribers: "",
    task_list: "",
    task_assignee: "",
    task_due_on: "",
    task_labels: "",
    task_time_estimation: "",
    task_priority: "",
  });

  // const handleIssue = (e) => {
  //   const { name, value } = e.target;
  //   setInputTask({
  //     ...inputTask,
  //     [name]: value,
  //   });
  // };

  //MultiSelect DropDown Value
  const [value, setValue] = useState("");
  const handleOnchange = (val) => {
    setValue(val);

    // console.log(val);
  };

  //User list api
  const [userList, setUserList] = useState([]);

  const getUserList = () => {
    axios
      .get("/api/userList", {
        headers: {
          Authorization: user.token,
        },
      })
      .then((response) => {
        const myUserList = response.data.docs;
        //console.log(myUserList);
        setUserList(myUserList);
      })
      .catch((error) => {
        // console.log(error);
        if (
          error.response.data.status === "422" ||
          error.response.status === 401
        ) {
          navigate("/login");
          getTaskList();
          updateUser({});
        } else {
          console.log(error.response);
        }
      });
  };
  useEffect(() => getUserList(), []);

  const [open, setOpen] = useState(false);

  //Edit Task
  const [id, setId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskLists, setTaskLists] = useState("");
  // const [taskAssignee, setTaskAssignee] = useState("");
  const [taskDue, setTaskDue] = useState("");
  const [taskLabel, setTaskLabel] = useState("");
  const [taskTimeEstimation, setTaskTimeEstimation] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [taskSubscribers, setTaskSubscribers] = useState("");
  const [defaultData, setDefaultData] = useState("");
  // const [openProject, setOpenProject] = useState("");
  const [count, setCount]=useState("")
  const editTaskOpen = (item,i) => {
    setOpen(true);
    console.log(i)
    // setOpenProject(item.task_assignee.length);
    setId(item._id);
    setTaskName(item.task_name);
    setTaskDesc(item.task_description);
    setTaskLists(item.task_list);
    // setTaskAssignee(options);
    setTaskDue(item.task_due_on);
    setTaskLabel(item.task_labels);
    setTaskTimeEstimation(item.task_time_estimation);
    setTaskPriority(item.task_priority);
    setTaskSubscribers(item.task_subscribers);
    //console.log(item);
    setDefaultData(item.task_assignee);
    // setValue(item.task_assignee);
    setValue(item.task_assignee.join(","))
    // setvalue(item.task_assignee.join(","));
    //  console.log(item.task_assignee)
  };
  const [options, setOptions] = useState([]);
  useEffect(() => {
    const temp = userList?.map((item, i) => {
      // console.log(item)
      
      return { label: i + 1 + "-" + item.firstname, value: item._id };
    });
    setOptions(temp);
  }, [userList]);

  const editTaskClose = () => {
    setOpen();
  };

  const handleEditTask = async (e) => {
    e.preventDefault();
    const arr = value.split(",");
    console.log(arr);
    const res = await fetch("/api/taskEdit/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: user.token,
      },
      body: JSON.stringify({
        task_name: taskName,
        task_description: taskDesc,
        task_subscribers: taskSubscribers,
        task_list: taskLists,
        task_due_on: taskDue,
        task_labels: taskLabel,
        task_assignee: arr,
        task_time_estimation: taskTimeEstimation,
        task_priority: taskPriority,
      }),
    }).catch((err) => {
      console.log(err);
    });
    const data = await res.json();
    console.log(data);
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
      setOpen();
      getTaskList();
    } else {
      toast.error(data.message, {
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
  const get = (data) => {
    setValue(data);
    return data;
  };

 
  return (
    <div>
      <TopNav updateUser={updateUser} user={user} />
      <div className="container-fluid page-body-wrapper">
        <SideNav user={user} />
        <ToastContainer />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-md-12 grid-margin">
                <div className="d-flex justify-content-between flex-wrap">
                  <div className="d-flex align-items-end flex-wrap">
                    <div className="me-md-3 me-xl-5">
                      <h2>Redesk Task Lists,</h2>
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
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 grid-margin stretch-card">
                <div className="">
                  <div className="card-body dashboard-tabs p-0">
                    <ul className="nav nav-tabs px-4" role="tablist">
                      <li className="nav-item">
                        <Link
                          className="nav-link active"
                          id="overview-tab"
                          data-bs-toggle="tab"
                          to="#overview"
                          role="tab"
                          aria-controls="overview"
                          aria-selected="true"
                        >
                          Open 
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          id="sales-tab"
                          data-bs-toggle="tab"
                          to="#sales"
                          role="tab"
                          aria-controls="sales"
                          aria-selected="false"
                        >
                          Close
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          id="purchases-tab"
                          data-bs-toggle="tab"
                          to="#purchases"
                          role="tab"
                          aria-controls="purchases"
                          aria-selected="false"
                        >
                          Unassigned
                        </Link>
                      </li>
                    </ul>
                    <br />
                    <div className="tab-content ">
                      <div
                        className=" row tab-pane fade show active"
                        id="overview"
                        role="tabpanel"
                        aria-labelledby="overview-tab"
                      >
                        {taskList
                          .filter((task) => task.task_labels !== "FIXED")
                          .map((item, i) => {
                           console.log(item.task_assignee.includes(user.id))
                          
                            return (
                              <div key={i}>
                                {item.task_assignee.includes(user.id) && (
                                  <div
                                    style={{ cursor: "pointer" }}
                                    key={i}
                                    onClick={() => editTaskOpen(item,i)}
                                    className="col-md-12 grid-margin "
                                  >
                                    <div
                                      className="card"
                                      style={{ borderRadius: "16px" }}
                                    >
                                      <div
                                        className="card-body dashboard-tabs"
                                        style={{ padding: "2.5rem" }}
                                      >
                                        {/* {projectName} */}{" "}
                                        <h3>{item.project_name}</h3>
                                        <div
                                          style={{
                                            marginLeft: "22rem",
                                            marginTop: "-25px",
                                            fontSize: "20px",
                                          }}
                                        >
                                          {item.task_name}
                                        </div>
                                        <span
                                          style={{
                                            marginLeft: "22rem",
                                            color: "red",
                                            padding: "4px",
                                          }}
                                        >
                                          BUG
                                        </span>
                                        |
                                        <span
                                          style={{
                                            color: "#86A0B7",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {item.task_due_on} added by swagat
                                        </span>
                                        <h4>{item.task_no}</h4>
                                        <span
                                          style={{
                                            fontSize: "x-small",
                                            color: "#86A0B7",
                                            textAlign: "center",
                                            marginLeft: "2px",
                                          }}
                                        >
                                          {item.updatedAt}
                                        </span>
                                        <div
                                          style={{
                                            marginLeft: "10rem",
                                            marginTop: "-37px",
                                          }}
                                        >
                                          <span
                                            style={{
                                              height: "2rem",
                                              color: "#45D9D0",
                                              backgroundColor: " #45d9d015",
                                              padding: "7px",
                                              borderRadius: "2rem",
                                            }}
                                          >
                                            {item.task_priority}
                                          </span>
                                        </div>
                                        <p
                                          style={{
                                            marginLeft: "22rem",
                                            marginTop: "-23px",
                                          }}
                                        >
                                          {item.task_description}
                                        </p>
                                        <div
                                          style={{
                                            marginLeft: "70rem",
                                            marginTop: "-45px",
                                          }}
                                        >
                                          <span
                                            style={{
                                              height: "2rem",
                                              color: " #45D9D0",
                                              backgroundColor: "#45d9d015",
                                              padding: "7px",
                                              borderRadius: "2rem",
                                            }}
                                          >
                                            {item.task_labels}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                      </div>
                      <div
                        className=" row tab-pane fade"
                        id="sales"
                        role="tabpanel"
                        aria-labelledby="sales-tab"
                      >
                        {taskList
                          .filter((task) => task.task_labels === "FIXED")
                          .map((item, i) => {
                            return (
                              <div key={i}>
                                {item.task_assignee.includes(user.id) && (
                                  <div
                                    style={{ cursor: "pointer" }}
                                    key={i}
                                    onClick={() => editTaskOpen(item)}
                                    className="col-md-12 grid-margin "
                                  >
                                    <div
                                      className="card"
                                      style={{ borderRadius: "16px" }}
                                    >
                                      <div
                                        className="card-body dashboard-tabs"
                                        style={{ padding: "2.5rem" }}
                                      >
                                        {/* {projectName} */}{" "}
                                        {item.project_name}
                                        <div
                                          style={{
                                            marginLeft: "22rem",
                                            marginTop: "-25px",
                                            fontSize: "20px",
                                          }}
                                        >
                                          {item.task_name}
                                        </div>
                                        <span
                                          style={{
                                            marginLeft: "22rem",
                                            color: "red",
                                            padding: "4px",
                                          }}
                                        >
                                          BUG
                                        </span>
                                        |
                                        <span
                                          style={{
                                            color: "#86A0B7",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {item.task_due_on} added by swagat
                                        </span>
                                        <h4>{item.task_no}</h4>
                                        <span
                                          style={{
                                            fontSize: "x-small",
                                            color: "#86A0B7",
                                            textAlign: "center",
                                            marginLeft: "2px",
                                          }}
                                        >
                                          {item.updatedAt}
                                        </span>
                                        <div
                                          style={{
                                            marginLeft: "10rem",
                                            marginTop: "-37px",
                                          }}
                                        >
                                          <span
                                            style={{
                                              height: "2rem",
                                              color: "#45D9D0",
                                              backgroundColor: " #45d9d015",
                                              padding: "7px",
                                              borderRadius: "2rem",
                                            }}
                                          >
                                            {item.task_priority}
                                          </span>
                                        </div>
                                        <p
                                          style={{
                                            marginLeft: "22rem",
                                            marginTop: "-23px",
                                          }}
                                        >
                                          {item.task_description}
                                        </p>
                                        <div
                                          style={{
                                            marginLeft: "70rem",
                                            marginTop: "-45px",
                                          }}
                                        >
                                          <span
                                            style={{
                                              height: "2rem",
                                              color: " #45D9D0",
                                              backgroundColor: "#45d9d015",
                                              padding: "7px",
                                              borderRadius: "2rem",
                                            }}
                                          >
                                            {item.task_labels}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Drawer className={classes.drawer} variant="persistent" anchor="right" open={taskOpen} classes={{
        paper:
          classes.drawerPaper,
      }}>
        <div className={classes.drawerHeader}>
          <div className="card-header-right">
            <button onClick={closeTask} className="collapsed btn btn-sm waves-effect waves-light btn-danger m-0 text-white">

              Close
            </button>
          </div>
        </div>
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card-body">
            <h4 className="card-title">Create Issue</h4>
            <form className="forms-sample" method="POST">
              <div className="form-group row">
                <label htmlFor="exampleInputprojectName" className="col-sm-3 col-form-label">
                  Task Name
                </label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id="exampleInputprojectName" name="task_name"
                    placeholder="Task Name" onChange={handleIssue} value={inputTask.task_name} required />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="exampleInputprojectDesc" className="col-sm-3 col-form-label">
                  Task Desc
                </label>
                <div className="col-sm-9">
                  <input type="textarea" className="form-control" id="exampleInputprojectDesc" name="task_description"
                    placeholder="Task Desc" onChange={handleIssue} value={inputTask.task_description} required />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="exampleInputprojectCategory" className="col-sm-3 col-form-label">
                  Task List
                </label>
                <div className="col-sm-9">
                  <select className="form-control form-control-lg" name="task_list" onChange={handleIssue}
                    value={inputTask.task_list}>
                    <option defaultValue>Choose Task List</option>
                    <option value="To Do">To Do</option>
                    <option value="2">Doing</option>
                    <option value="3">Client Review</option>
                    <option value="4">Done</option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="exampleInputprojectCategory" className="col-sm-3 col-form-label">
                  Task Assignee
                </label>
                <div className="col-sm-9">
                  <MultiSelect className="multi-select w-100 " onChange={handleOnchange} name="multiple"
                    options={options} />
                  <br />
                  <div className="preview-values">
                    <b>Values: </b>
                    {value}
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="exampleInputprojectClient" className="col-sm-3 col-form-label">
                  Task Due On
                </label>
                <div className="col-sm-9">
                  <input type="date" className="form-control" id="exampleInputprojectClient" name="task_due_on"
                    placeholder="Task Due On" onChange={handleIssue} value={inputTask.task_due_on} required />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="exampleInputprojectClient" className="col-sm-3 col-form-label">
                  Task Labels
                </label>
                <div className="col-sm-9">
                  <select className="form-control form-control-lg" name="task_labels" onChange={handleIssue}
                    value={inputTask.task_labels}>
                    <option defaultValue>Choose Task Label</option>
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
                <label htmlFor="exampleInputprojectClient" className="col-sm-3 col-form-label">
                  Task Time Estimation
                </label>
                <div className="col-sm-9">
                  <input type="number" className="form-control" id="exampleInputprojectClient" name="task_time_estimation"
                    placeholder="Task Time Estimation" onChange={handleIssue} value={inputTask.task_time_estimation}
                    required />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="exampleInputprojectClient" className="col-sm-3 col-form-label">
                  Task Priority
                </label>
                <div className="col-sm-9">
                  <select className="form-control form-control-lg" name="task_priority" onChange={handleIssue}
                    value={inputTask.task_priority}>
                    <option defaultValue>Choose Task List</option>
                    <option value="low">LOW</option>
                    <option value="medium">MEDIUM</option>
                    <option value="high">HIGH</option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="exampleInputprojectTemplate" className="col-sm-3 col-form-label">
                  Task Attachment
                </label>
                <div className="col-sm-9">
                  <input type="file" className="form-control" id="exampleInputprojectTemplate" name="task_attachment"
                    placeholder="Task Attachment" onChange={handleIssue} value={inputTask.task_attachment} required />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="exampleInputprojectCategory" className="col-sm-3 col-form-label">
                  Task Subscriber
                </label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id="exampleInputprojectCategory" name="task_subscribers"
                    placeholder="Task List" onChange={handleIssue} value={inputTask.task_subscribers} required />
                </div>
              </div>
              {/*
          <div className="form-check form-check-flat form-check-primary">
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input" />
              Remember me
            </label>
          </div>
          *
              <button onClick={handleIssueSubmit} type="submit" className="btn btn-primary me-2">
                Submit
              </button>
              <button onClick={closeTask} className="btn btn-light">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </Drawer> */}
      {/* Edit Task Drawer */}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <div className="card-header-right">
            <button
              onClick={editTaskClose}
              className="collapsed btn btn-sm waves-effect waves-light btn-danger m-0 text-white"
            >
              Close
            </button>
          </div>
        </div>
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card-body">
            <h4 className="card-title">Edit Issue</h4>
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
                    onChange={(e) => setTaskName(e.target.value)}
                    value={taskName}
                    disabled={user.role==="user"?true:false}
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
                    onChange={(e) => setTaskDesc(e.target.value)}
                    value={taskDesc}
                    disabled={user.role==="user"?true:false}
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
                    onChange={(e) => setTaskLists(e.target.value)}
                    value={taskLists}
                  >
                    <option defaultValue>Choose Task List</option>
                    <option value="To Do">To Do</option>
                    <option value="Doing">Doing</option>
                    <option value="Client Review">Client Review</option>
                    <option value="Done">Done</option>
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
                    defaultValue={defaultData}
                    disabled={user.role==="user"?true:false}
                  />
                  <br />
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
                    onChange={(e) => setTaskDue(e.target.value)}
                    value={taskDue}
                    disabled={user.role==="user"?true:false}
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
                    onChange={(e) => setTaskLabel(e.target.value)}
                    value={taskLabel}
                  >
                    <option defaultValue>Choose Task Label</option>
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
                    type="number"
                    className="form-control"
                    id="exampleInputprojectClient"
                    name="task_time_estimation"
                    placeholder="Task Time Estimation"
                    onChange={(e) => setTaskTimeEstimation(e.target.value)}
                    value={taskTimeEstimation}
                    disabled={user.role==="user"?true:false}
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
                    onChange={(e) => setTaskPriority(e.target.value)}
                    value={taskPriority}
                    disabled={user.role==="user"?true:false}
                  >
                    <option defaultValue>Choose Task List</option>
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
                    onChange={(e) => setTaskSubscribers(e.target.value)}
                    value={taskSubscribers}
                    required
                  />
                </div>
              </div>
              {/*
          <div className="form-check form-check-flat form-check-primary">
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input" />
              Remember me
            </label>
          </div>
          */}
              <button
                onClick={handleEditTask}
                type="submit"
                className="btn btn-primary me-2"
              >
                Submit
              </button>
              <button onClick={editTaskClose} className="btn btn-light">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default AllIssue;
