import React,{useState} from 'react';
import logo from './logo.svg';
import 'antd/dist/antd.css'
import Employees from './components/Employees'
import Departments from './components/Department'
import { Modal, Button } from 'antd'
import './App.css';

function App() {

  const [action,setAction] = useState(null);

  return (
    

    <div className="App">

     <div className="buttomStyle">
        <Button className="empButton" disabled={action} type="primary" onClick={() => setAction(true)} style={{backgroundColor:action?'#1890ff':'grey',color:'white'}}  >
          Employee
        </Button>
        <Button disabled={!action} type="primary" onClick={() => setAction(false)} style={{backgroundColor:!action?'#1890ff':'grey' ,color:'white'}}>
          Department
        </Button>
    </div>
  
    {action ?
    <div>      <Employees />  </div> :
    <div>      <Departments/> </div>
    }    
    
    </div>

  );
}

export default App;
