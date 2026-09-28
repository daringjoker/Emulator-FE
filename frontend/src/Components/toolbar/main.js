import React ,{Component}from 'react'
import ni from "./ni.svg"
import reset from "./reset.svg"
import cont from "./continue.svg"
import stop from "./stop.svg"
import save from "./save.svg"
import open from "./open.svg"
import new_tab from "./newfile.png"
import "./toolbar.css"

export class Toolbar extends Component
{

    state={
      
    }
    proxy_request(path)
    {
        this.props.parent.fetch_update(path);
    }

    open_file=()=>
    {
        this.props.parent.setState({"dialog_show":true,
        "file_action":{
            "action":"open"                        
        }});
    }

    save_file=()=>
    {   
            if(this.props.parent.state.file_path==="")
            this.props.parent.setState({"dialog_show":true,
            "file_action":{
                "action":"save"                        
            }})
            else
            this.props.parent.savefile(this.props.parent.state.file_path)
 
    }
    reset_emulation=()=>
    {
        this.switch_to_emumode()
        this.proxy_request("/reset")
    }

    next_instruction=()=>
    {
        this.switch_to_emumode()
        this.proxy_request("/ni")
    }
    continue_execution=()=>
    {
        this.switch_to_emumode()
        this.proxy_request("/continue")
    }
    stop_emulation=()=>
    {
        this.proxy_request("/reset")
        this.props.parent.setState({
            mode:"editing"
        })
    }
    sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      }
    switch_to_emumode() {
        if (this.props.parent.state.mode === "editing") {
            this.save_file()
            this.props.parent.setState({
                mode: "emulating"
            })
        }
    }

    render(){
        return(
        <div className="toolbar">
            <div className="filebar">
                <button onClick={e=>{
                    this.props.parent.create_new_tab()
                    this.props.parent.switch_tab(this.props.parent.state.tabs.length-1)
                    }} title="new file">
                    <img src={new_tab} alt="new file tab"></img>
                </button>
                <button onClick={this.save_file} title="savefile">
                    <img src={save} alt="save file button"></img>
                </button>   
                <button onClick={this.open_file} title="openfile">
                    <img src={open} alt="open file button"></img>
                </button>  
            </div>

            <div className="debugbar">
            <button onClick={this.reset_emulation} title="restart execution">
                <img src={reset} alt="reset button"></img>
            </button>
            <button onClick={this.next_instruction} title="next instruction">
                <img src={ni} alt="next instruction button"></img>
            </button>
            <button onClick={this.continue_execution} title="continue till end">
                <img src={cont} alt="continue button"></img>
            </button>
            <button onClick={this.stop_emulation} title="stop execution">
                <img src={stop} alt="stop button"></img>
            </button>
            </div>
        </div>
        )
    }
}

export default Toolbar;
