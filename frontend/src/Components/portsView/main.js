import React ,{Component}from 'react'
import "./ports.css"
import send from "../memoryView/send.png"

export class Portsview extends Component
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
        {ascii=<td className="asciivalue portvalue">'{String.fromCharCode(value)}'</td> }
        else
        {ascii=<td className="asciivalue portvalue">'<span style={{color:"gray",opacity:0.5}}>•</span>'</td> }
        if(address==="...")
        {
            return(
                <tr className="port_singles">
                <td className="address">
                    ....
                </td>
                <td className="value">

                </td>
            </tr>
            )
        }
        else
        
        return(
            <tr className="port_singles">
                <td className="address">
                    {parseInt(address).toString(16).padStart(2,'0').toUpperCase()+"H"}
                </td>
                    <td className="hexvalue portvalue">{value.toString(16).padStart(2,'0').toUpperCase()}h</td>
                    <td className="decvalue portvalue">{value}</td>
                    {ascii}
            </tr>
        )
    }
    get_port_item_view(){
        let memory_items=[]
        let next=0
        for(let base_addr in this.props.ports)
        {
            base_addr=parseInt(base_addr)
            let i=0;
            if(next!==base_addr)
                memory_items.push(this.make_item_view("...",null))
            for(let _ in this.props.ports[base_addr])
            {
                let mem_item=this.make_item_view(base_addr+i,this.props.ports[base_addr][i])   
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
        fetch("/writeport",{
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
        <div className="portsview">
            <div className="heading">
                Ports
            </div>
            <div className="body">
            <table>
            {this.get_port_item_view()}
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

export default Portsview;