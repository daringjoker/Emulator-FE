import React ,{Component}from 'react'
import Editor from './Components/editor/main'
import Registers from "./Components/RegistersView/main"
import Toolbar from "./Components/toolbar/main"
import FileDialog from "./Components/filedialog/main"
import Memoryview from "./Components/memoryView/main"
import Portsview from "./Components/portsView/main"
import Stackview from "./Components/stacksView/main"
import Consoleview from "./Components/consoleview/main"
import Tabbar from "./Components/tabbar/main"
import Statusbar from "./Components/statusbar/main"
import './App.css';
class App extends Component
{
  untitled_count=0;
  editor=React.createRef()
  console=React.createRef()
  state={
    "dialog_show":false,
    "file_path":"",
    "registers":
      {
        'A':1,
        'B':20,
        'C':255,
        'D':45,
        'E':100,
        'H':150,
        'L':7,
        'SP':65531,
        'PC':0x4000,
        'flag':100
        },
       "memory":{"16384":[1,0,80,197,17,0,96,213,193,209,0,0,0,0,0,0],
       "65520":[0,0,0,0,0,0,0,0,0,0,0,0,96,0,80,0]},
        "port":{
          "0":[33,0,80,78,13,81,33,1,80,126,35,189,218,20,64,70],
          "32":[119,43,112,35,21,0,0,194,9,64,13,194,5,64,118,0]
        },
        "breakpoints":[],
        "mode":"editing",
        "status":"idle",
        "tabs":[],
        "saved":false,
        "current_tab_index":0
    }
  create_new_tab=()=>
  {
    let no =this.untitled_count++;
    let tabs=this.state.tabs;
    tabs.push({
      title:"untitled"+no,
      path:"",
      text:"",
    })
    this.setState({tabs})
  }
  switch_tab=(index)=>{
    let curindex=this.state.current_tab_index;
    let oldtxt=this.editor.current.state.text;
    let status=this.state.tabs
    status[curindex].text=oldtxt;
    let newtext=this.state.tabs[index].text;
    this.setState({
        file_path:this.state.tabs[index].path,
        tabs:status,
        current_tab_index:index,
        mode:"editing",
        saved:false
    })
    this.editor.current.textnode.current.value=newtext;
    this.editor.current.formatAndUpdate()         
    
}
  fetch_update=(path)=>
  {
      this.setState({status:"busy"})
      fetch(path).then(res=>res.json()).then(
        data=>{
          this.setState({"registers":data["registers"],
          "memory":data["memory"],
          "port":data["ports"],
          "breakpoints":data["breakpoints"],
          status:"idle",
        })
        }
      )
  }
  openfile(path,filename){
    this.file_name=filename;
    this.path=path
    fetch("/file/open",{
      method:"POST",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({
          path,
      })
  })
  .then(res=>res.json()).then(data=>{
    this.create_new_tab()
    let ni=this.state.tabs.length-1
    this.state.tabs[ni].text=data["text"];
    this.state.tabs[ni].path=this.path;
    this.state.tabs[ni].title=this.file_name;
    this.state.saved=true;
    this.switch_tab(ni)
  })
}
  savefile=(path,filename)=>{
    this.file_name=filename;
    this.path=path
    fetch("/file/save",{
      method:"POST",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({
          path,
          "text":this.editor.current.state.text
      })
  })
  .then(res=>res.json()).then(data=>{
    this.state.tabs[this.state.current_tab_index].text=this.editor.current.state.text;
    if(this.file_name)
    this.state.tabs[this.state.current_tab_index].title=this.file_name;
    this.state.tabs[this.state.current_tab_index].path=this.path;
    this.state.saved=true;
    this.forceUpdate();
  })
  }
  componentDidMount(){
    if(this.state.tabs.length===0)
    this.create_new_tab(0);
    this.state.current_tab_index=0;
  }
  render() {
    let dialog=this.state.dialog_show?<FileDialog parent={this} requirement={this.state.file_action}/>:null;
  return (
    <div className="App" style={{
      height:"100vh"
    }}>
    {dialog}
    <Tabbar tabs={this.state.tabs} active={this.state.current_tab_index} parent={this}/>
    <div  style={{
      display:"flex",
      flexDirection:"row",
      height:"52vh"
    }}>
      <Toolbar parent={this}/>
      <Editor ref={this.editor} parent={this} console={this.console}/>
      <Registers registers={this.state.registers}/>
    </div>
    <div className="bottomhalf" style={{
      display:"flex",
      flexDirection:"row",
      height:"40vh",
      borderTop:"ridge #AAAAAA 1px"
    }}>
    < Memoryview memory={this.state.memory} parent={this}/>
    < Portsview ports={this.state.port} parent={this} />
    <Stackview sp={this.state.registers.SP} parent={this} memory={this.state.memory}/>
    <Consoleview ref={this.console} parent={this}/>
    </div>
    <Statusbar status={this.state.status} mode={this.state.mode}/>
    </div>
  );
  }
}
export default App;
