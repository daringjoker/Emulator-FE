import React ,{Component}from 'react'
import "./tabbar.css"

export class Tabbar extends Component
{
    tabcount=0
    state={
      
    }
    close_tab=(index)=>{
        let curindex=this.props.active;
        let lastindex=this.props.tabs.length-1;
        let dummy=this.props.tabs[curindex]
        let new_index=0;
        if(lastindex===0)
        {
            this.props.parent.create_new_tab();
            lastindex++;
    
        }
        if(curindex===index)
        {  
            let ni=(curindex===lastindex)?lastindex-1:lastindex;      
            let newtext=this.props.tabs[ni].text;
            this.props.parent.editor.current.setState({
                text:newtext
            })
            this.props.parent.editor.current.textnode.current.value=newtext;
            this.props.parent.editor.current.formatAndUpdate()
            new_index=this.props.tabs.length-2;  
        }
        this.props.tabs.splice(index,1)
        if(curindex!==index)
        {
            new_index=this.props.tabs.indexOf(dummy)
        }
        this.props.parent.setState({
            tabs:this.props.tabs,
            current_tab_index:new_index
        })
    }

    create_tab=(path,title,index,active=false)=>
    {
        let cname=active?"tab activetab":"tab";
        return(
            <div className={cname}>
                <div className="tab_title" onClick={e=>{
                    this.props.parent.switch_tab(index);
            }}>
                    {title}
                </div>
                <div className="tab_close" title="close tab" onClick={e=>{
                    this.close_tab(index);
                }}>
                    &#215;
                </div>
            </div>
        )
    }
    create_tabbar=()=>{
       return this.props.tabs.map((tab_item,index)=>{
           let active=this.props.active===index;
            let path=tab_item["path"];
            if(!tab_item.deleted)
               return this.create_tab(path,tab_item["title"],index,active);
            else return ""
        })
    }
    render(){
        return(
            <div className="tabbar">
                <div className="tabs">
                    {this.create_tabbar()}
                </div>
                <div className="heading">PRS85 Emulator</div>

            </div>
        )
    }
}

export default Tabbar;
