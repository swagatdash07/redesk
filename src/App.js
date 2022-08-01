import './App.css';
import {useState,useEffect} from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Login from './components/Login'
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard';
import TopNav from './components/TopNav'
import Issue from './components/Issue'
import AllIssue from './components/AllIssue'
import UserDashboard from './components/UserDashboard'
import SideNav from './components/SideNav'
// import CloseTask from './components/CloseTask'
function App() {
  const drawerWidth = 700;
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex', 
    }, 
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      boxShadow:"0px 0px 50px 15px"
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }));
  const [user,setLoginUser]=useState({})
  useEffect(() => {
    setLoginUser(JSON.parse(localStorage.getItem("redesk_panel")));
    }, [])
    
    const updateUser=(user) => {
      localStorage.setItem("redesk_panel", JSON.stringify(user))
      setLoginUser(user)
    }
    //console.log(user)

  return (
    <div >
      <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login updateUser={updateUser}/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      {/* <Route path="/issue/close" element={<CloseTask/>}></Route> */}
      <Route exact path="/" element={
        user && user.id ? <Dashboard updateUser={updateUser} user={user} useStyles={useStyles} /> : <Login updateUser={updateUser}/>}/>
      <Route exact path="/issue" element={
        user && user.id ? <Issue updateUser={updateUser} user={user} useStyles={useStyles}/> : <Login updateUser={updateUser}/>}/>
      <Route exact path="/all_issue" element={
        user && user.id ? <AllIssue updateUser={updateUser} user={user} useStyles={useStyles}/> : <Login updateUser={updateUser}/>}/>
      <Route exact path="/user_dashboard" element={
        user && user.id ? <UserDashboard updateUser={updateUser} user={user} useStyles={useStyles}/> : <Login updateUser={updateUser}/>}/>
      {/* <Route element={
        user && user.id ? <SideNav  user={user} /> : <Login updateUser={updateUser}/>}/> */}
    
    
      <Route element={
        user && user.id ? <TopNav updateUser={updateUser} user={user}/> : <Login updateUser={updateUser}/>}/>
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
