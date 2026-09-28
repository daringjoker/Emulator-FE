import React ,{Component}from 'react'
import "./registers.css"

export class Flagregister extends Component
{
    flags=0;
    signFlag=0;
    carryFlag=0;
    zeroFlag=0;
    pairityFlag=0;
    auxCarryFlag=0;

    constructor(props)
    {
        super(props)
        this.flags=this.props.register;
        this.segregateFlags();
    }

    segregateFlags()
    {
        this.carryFlag=this.nthBitValue(0);
        this.pairityFlag=this.nthBitValue(2);
        this.auxCarryFlag=this.nthBitValue(4);
        this.zeroFlag=this.nthBitValue(6);
        this.signFlag=this.nthBitValue(7);
    }
    nthBitValue(n){
        return (this.flags &(1<<n))>>>n;
    }

    styleFlag(flag)
    {
       if(flag===1)
       {
           return({
                color:"gold",
                textShadow:"0px 0px 2px gold",
                fontWeight:"bold",
                opacity:"1"
           })
       }
       else{
        return({
            color:"grey",
            fontWeight:"100",
            fontStyle:"auto",
            opacity:"0.4",
            textShadow:"none",
       } )
       }
        
    }
    render()
    {
        this.flags=this.props.register;
        this.segregateFlags();
        return (
            <div className='flag-row'>
                {/* <span className='regname'>flags</span> */}
                <span className="carryFlag flag" style={this.styleFlag(this.carryFlag)}>CY</span>
                <span className="zeroFlag flag" style={this.styleFlag(this.zeroFlag)}>Z</span>
                <span className="signFlag flag" style={this.styleFlag(this.signFlag)}>S</span>
                <span className="pairityFlag flag" style={this.styleFlag(this.pairityFlag)}>P</span>
                <span className="auxCarryFlag flag" style={this.styleFlag(this.auxCarryFlag)}>AC</span>
            </div>
        )
    } 
}
export default Flagregister;