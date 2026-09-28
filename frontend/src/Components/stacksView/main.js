import React ,{Component}from 'react'
import "./stack.css"
export class Stackview extends Component
{

    state={
      
    }
    proxy_request(path)
    {
        this.props.parent.fetch_update(path);
    }
    make_item_view(address, value){
        let pointed=address===this.props.sp+1
        let classname=pointed?"stacktop":""    
        return(
            <div className={"stackentry "+classname}>
                <span className="address">
              {parseInt(address).toString(16).padStart(4,'0').toUpperCase()+"H"}
                </span>
                <span className="value">
                    <span className="hexvalue stackvalue">{value.toString(16).padStart(4,'0').toUpperCase()}h</span>
                </span>
            </div>
        )
    }
    get_memory_item_views(){
        let sp=this.props.sp

        let memory_items=[]
        let base_addr=sp&0xfff0
        if(this.props.memory[base_addr]){
        for(let i=0;i<16;i+=2)
        {
            let mem_item=this.make_item_view(base_addr+i,this.props.memory[base_addr][i]<<8+this.props.memory[base_addr][i+1])   
            memory_items.push(mem_item);   
        }
        return memory_items;
    }
    else 
    return <div className="emptymsg">Stack is Empty!</div>
    }
    render(){
        return(
        <div className="stackview">
            <div className="heading">
                Stack
            </div>
            <div className="body">
            {this.get_memory_item_views()}
            </div>
        </div>
        )
    }
}

export default Stackview;