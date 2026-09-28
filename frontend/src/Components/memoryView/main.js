import React ,{Component}from 'react'
import "./memory_small.css"
import send from "./send.png"

export class memoryview extends Component
{
    addr_write=React.createRef()
    value_write=React.createRef()    
    state={
      
    }
    proxy_request(path)
    {
        this.props.parent.fetch_update(path);
    }
    componentDidMount(){
        
    }
    isPrintable(char)
    {
        return(' '.charCodeAt(0)<=char &&char<='~'.charCodeAt(0));
    }

    make_item_view(address, value){
        let ascii=""
        if (this.isPrintable(value))        
        {ascii=<td className="asciivalue memvalue">'{String.fromCharCode(value)}'</td> }
        else
        {ascii=<td className="asciivalue memvalue">'<span style={{color:"gray",opacity:0.5}}>•</span>'</td> }
        if(address==="...")
        {
            return(
                <tr className="mem_singles">
                <td className="address">
                    ....
                </td>
                <td className="memvalue">

                </td>
            </tr>
            )
        }
        else
        
        return(
            <tr className="mem_singles">
                <td className="address">
                    {parseInt(address).toString(16).padStart(4,'0').toUpperCase()+"H"}
                </td>
                    <td className="hexvalue memvalue">{value.toString(16).padStart(2,'0').toUpperCase()}h</td>
                    <td className="decvalue memvalue">{value}</td>
                    {ascii}
            </tr>
        )
    }
    get_memory_item_views(){
        let memory_items=[]
        let next=0;
        for(let base_addr in this.props.memory)
        {
            base_addr=parseInt(base_addr)
            let i=0;
            // console.log(next,base_addr)
            if(next!==base_addr)
                memory_items.push(this.make_item_view("...",null))
            for(let _ in this.props.memory[base_addr])
            {
                base_addr=parseInt(base_addr)
                let mem_item=this.make_item_view(base_addr+i,this.props.memory[base_addr][i])   
                memory_items.push(mem_item);   
                i++;          
            }
            next=base_addr+i;
        }
        if(next!==65536)
            memory_items.push(this.make_item_view("...",null))
        return memory_items;
    }
    writemem=e=>{
        fetch("/writemem",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                "addr":this.addr_write.current.value,
                "value":this.value_write.current.value
            })
        })
        .then(res=>res.json()).then(
            data=>{
              this.props.parent.setState({"registers":data["registers"],
              "memory":data["memory"],
              "port":data["ports"]})
              this.addr_write.current.value="";
              this.value_write.current.value="";
            }
          )
    }
    render(){
        
        return(
        <div className="memoryview">
            <div className="heading">
                Memory
            </div>
            <div className="body">
                <table>
            {this.get_memory_item_views()}
            </table>
            </div>
            <div className="inprow">
            <input type="text" placeholder="Address" ref={this.addr_write}></input>
            <input type="text" placeholder="Value" ref={this.value_write}></input>
            <button onClick={this.writemem}>
                <img src={send} alt= "send icon"></img>
            </button>
            </div>
        </div>
        )
    }
}

export default memoryview;