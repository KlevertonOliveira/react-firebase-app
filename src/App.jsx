import Posts from "./components/Posts";
import PostSlug from "./components/PostSlug";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";

import { Menu } from 'antd';
import { ReadOutlined, FolderAddOutlined} from '@ant-design/icons';

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { AuthContextProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";


function App() {

  return (
    
    <Router>
      <AuthContextProvider>
      <div className='app_container'>
        
        <div className="app_main_navigation">
          
          <Menu  mode="horizontal">
          
            <Menu.Item key="mail" icon={<ReadOutlined />}>
              <Link to='/'>
                Posts
              </Link>
            </Menu.Item>

            <Menu.Item key="app" icon={<FolderAddOutlined />}>
              <Link to='/create-post'>
                Create Post
              </Link>
            </Menu.Item>
          </Menu>
        </div>

            <Switch>
              <PrivateRoute exact path='/' component={Posts} />
              <Route path='/post/:id' component={PostSlug}/>
              <Route path='/create-post' component={CreatePost}/>
              <Route path='/edit-post/:id' component={EditPost}/> 
              <Route path='/login' component={Login} />
              <Route path='/signup' component={SignUp} />
              <Route path='*' component={()=><h1>404 Not Found</h1>} />
            </Switch>
          </div>
        </AuthContextProvider>
      </Router>
  );
}

export default App;
