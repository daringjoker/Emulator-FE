import React ,{Component}from 'react'
import './main.css'
import Formatter from "./formatter"
import Highlighter from "./highlighter"
import processor from "./processor"
export class Editor extends Component
{
    textnode=React.createRef();
    lineno=React.createRef();
    rawbytes=React.createRef();
    highlight=React.createRef();
    cursorstart=0;
    cursorend=0;
    formatter=new Formatter();
    currentHelpElem=null;
    state={
        text:"",
    }

    syncScroll=()=>{
        this.highlight.current.scrollTop=this.textnode.current.scrollTop;
        this.highlight.current.scrollLeft=this.textnode.current.scrollLeft;
        this.lineno.current.scrollTop=this.textnode.current.scrollTop;
        this.rawbytes.current.scrollTop=this.textnode.current.scrollTop;
    }


    formatAndUpdate=(e)=>{
        this.cursorend=this.textnode.current.selectionEnd;
        this.cursorstart=this.textnode.current.selectionStart;
        this.textnode.current.value=this.formatter.Format(this.textnode.current.value,this.cursorstart);
        this.cursorend+=this.formatter.deltachars;
        this.cursorstart+=this.formatter.deltachars;
        this.textnode.current.selectionEnd=this.cursorend;
        this.textnode.current.selectionStart=this.cursorstart
        this.textnode.current.focus();
        processor.process(this.textnode.current.value);
        let errors=processor.errors;
        this.props.console.current.setState({
            errors
        })
        this.setState({text:this.textnode.current.value})
    }

    makeHelpDiv()
    {
        if(this.currentHelpElem)
        {
            this.helpstring=this.currentHelpElem.getAttribute("data-help");
            let r=this.currentHelpElem.getBoundingClientRect();
            let gap=20;
            let offset=-25-gap;
            if(r.top<50) 
                // offset*=-1;
                offset=gap;
                
            return(
                <div 
                className="hint"
                style={{
                    position:"fixed",
                    top:r.top+offset,
                    left:r.left,           
                       }}>
                   {this.helpstring}
                   </div>
            )
        }
        else
        return("");
    }
    generateMouseEvent=(e)=>{
        let x=e.clientX;
        let y=e.clientY;
        if(this.currentHelpElem)
        {
            let r=this.currentHelpElem.getBoundingClientRect();
            if(x>r.x&&x<r.x+r.width&&y>r.y&&y<r.y+r.height)
            return;
            else
            {
            this.currentHelpElem=null;
            this.forceUpdate();
            }
        }
        if(!this.currentHelpElem)
        {
            let alltokens=document.querySelectorAll(".tokens");
            if(alltokens){
                alltokens.forEach((elem,index,arr)=>{
                    let r=elem.getBoundingClientRect();
                    if(x>r.x&&x<r.x+r.width&&y>r.y&&y<r.y+r.height)
                    {
                        this.currentHelpElem=elem;
                        this.forceUpdate()
                    }
            })
            }
        }
     }
    handleKeyUP=(e)=>{
        this.props.parent.setState({
            mode:"editing"
        })
        switch(e.key)
        {
            case "Tab":
                break;
            default:
                break;
        }
    }
    componentDidMount()
    {
        processor.reset();
        processor.process(this.state.text);
        this.forceUpdate();
    }
    getSnapshotBeforeUpdate()
    {
        this.cursorstart=this.textnode.current.selectionStart;
        this.cursorend=this.textnode.current.selectionEnd;
        return null;
    }
    componentDidUpdate(curposition)
    {
        this.textnode.current.selectionStart=this.cursorstart;
        this.textnode.current.selectionEnd=this.cursorend;
    }
    get_line_num_addr(){
         return processor.lineAddresses.map((addr,index)=>{
            let disp=(processor.errors[index] && processor.errors[index].length===0)?<span>{"\n"}</span>:<span><span className="errsym">&#9888;</span>{index+1}</span>
            if(!addr)
            return(
                <div className="err_lineno">
                    {disp}
                </div>
            )
            if(this.props.parent.state.breakpoints.includes(parseInt(addr,16)))
            {
                return (
                    <div onClick={e=>{
                        fetch("/rem_brk",{
                            method:"POST",
                            headers:{
                                "Content-Type":"application/json"
                            },
                            body:JSON.stringify({
                                addr
                            })
                        }).then(res=>{
                            this.props.parent.fetch_update("/refresh_status")
                        })
                    }}
                    className="brk line_addr" title="Remove Breakpoint">
                        {addr}
                    </div>
                )         
            }
            else
            {
                return (
                    <div onClick={e=>{
                        fetch("/add_brk",{
                            method:"POST",
                            headers:{
                                "Content-Type":"application/json"
                            },
                            body:JSON.stringify({
                                addr
                            })
                        }).then(res=>{
                            this.props.parent.fetch_update("/refresh_status")
                        })
                    }}
                    className="line_addr" title="Add Breakpoint">
                        {addr}
                    </div>
                ) 
            }

        })
    }

    render()
    {
        return (
            <div className="editor">
                <pre className="line-number" ref={this.lineno}>
                   {
                       this.get_line_num_addr()
                   }
                </pre>
                <pre className="rawbytes" ref={this.rawbytes}>
                   {
                       processor.Raw_Bytes_for_line.join("\n")+"\n\n"
                   }
                </pre>
            <div className="editor-box" onMouseMove={this.generateMouseEvent}>
            <textarea className="real" 
            ref={this.textnode}
            onMouseMove={this.generateMouseEvent}
            onClick={this.formatAndUpdate}
            onChange={this.formatAndUpdate}
            value={this.state.text}
            onKeyUp={this.handleKeyUP}
            onScroll={this.syncScroll}
            spellCheck="false"
            autoCapitalize="false"
            autoComplete="false"
            >
            </textarea>

            <pre ref={this.highlight} className='fake' id='fake'>
               <Highlighter parent={this.props.parent} text={this.state.text+(this.state.text.endsWith("\n")?" ":"")}/>
            </pre>
            {this.makeHelpDiv()}
            </div>
            </div>
        );
    }
}

export default Editor;
