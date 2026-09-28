import React ,{Component}from 'react'
import folder_logo from "./folder.png"
import file_logo from "./file.png"
import "./explorer.css"
export class FileDialog extends Component
{
    input_bar=React.createRef()
    state={
      current_path:"",
      current_content:[],
      clicked:"",
      clicked_type:""

    }
    item_clicked=(clicked)=>{
        fetch("/explorer/list",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                current_path:this.state.current_path,
                clicked:clicked
            })
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState(data)
        })
    }
    componentDidMount(){
        this.item_clicked("")
    }
    componentDidUpdate(){
        document.querySelectorAll(".selected").forEach(icon=>{
            icon.classList.remove("selected")
        });
    }
    confirmed=e=>{
        let newpath=this.state.current_path+"\\"+this.input_bar.current.value;
        if(this.props.requirement.action==="open")
        this.props.parent.openfile(newpath,this.input_bar.current.value);
        else
        this.props.parent.savefile(newpath,this.input_bar.current.value);
        this.close()
    }
    canceled=e=>{
        this.close()
    }
    close=()=>{
        this.props.parent.setState({"dialog_show":false})
    }
    displaypath(){
        let path_tokens=this.state.current_path.split("\\").map((item,index,array)=>{
            if(item.trim().length>0)
            return(
                
                <div className="pathToken" onClick={e=>{
                    this.item_clicked("../".repeat((array.length-index-1)))
                }}>
                    <div className="text">
                    {item}
                    </div>
                    <div className="arrow">

                    </div>
                </div>
            )
        })
        return(
            <div className="pathbar">
                                <div className="pathToken">
                    <div className="text" style={{
                        borderRight:"5px solid rgba(31,6,130,1)"
                    }}>              
                      <button className="backButton" onClick={(e)=>{
                        this.item_clicked("..")
                    }}>                    	
                     &#5130; Back
                    </button>
                        path::
                    </div>
                </div>

                {
                    path_tokens
                }
            </div>
        )
    }
    render(){
        let items=this.state.current_content.map((item)=>{
            let logo=(item.type==="folder")?folder_logo:file_logo;
            return(
            <button className="ExplorerItem" onDoubleClick={e=>{
                    this.state.clicked=item.name;
                    this.state.clicked_type=item.type;
                    if(item.type==="file")
                    {
                        this.confirmed();
                    }
                    else{
                        this.item_clicked(item.name)
                    }
                    
                }
                } onClick={e=>{
                    this.state.clicked=item.name;
                    this.state.clicked_type=item.type;
                    document.querySelectorAll(".selected").forEach(i=>{
                        if(i!==e.currentTarget)
                        i.classList.remove("selected");
                    })
                    e.currentTarget.classList.add("selected");
                    this.input_bar.current.value=item.name;
                }}>
                    <img src={logo} alt="folder-icon"></img>
                    <p>
                    {item.name}
                    </p>
                </button>
            )
        })
        let path=this.displaypath()
        let title_text=this.props.requirement.action+" file"
        return(
        <div className="page">
            <div className="titlebar">
                <div className="ttext">
                {title_text}
                </div>
                <button className="closeBtn" onClick={e=>{
                    this.close();
                }}>
                &#215;
                </button>
            </div>
            <div className="dialogmain"  onClick={e=>{
            if(!e.target.classList.contains("ExplorerItem")&&!e.target.parentNode.classList.contains("ExplorerItem"))
            {
                document.querySelectorAll(".selected").forEach(icon=>{
                    icon.classList.remove("selected")
                });
            }
            }}>
            {
                //display the pathbar
                path
            }
            <div className="sidepanel">

            </div>
            <div className="dialogbody">

                {
                    items
                }
            </div>
            <div className="finalbar">
            <input ref={this.input_bar}type="text" id="filename"></input>
            <input type="submit" onClick={this.confirmed} value="submit"></input>
            <button onClick={this.canceled}>Cancel</button>
            </div>
            <div className="finalbarSpacer"></div>
            </div>
        </div>
        )
    }
}

export default FileDialog;
