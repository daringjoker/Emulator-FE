import React ,{Component}from 'react'
import Register from "./register"
import Regpair from "./registerpairs"
import FlagRegister from "./flagregister"
import "./registers.css"

export class Registers extends Component
{

    render(){

        return(
            <div className="registers">
                <table className="byteregs">
                    <Register name="A" register={this.props.registers.A}/>
                    <Register name="B" register={this.props.registers.B}/>
                    <Register name="C" register={this.props.registers.C}/>
                    <Register name="D" register={this.props.registers.D}/>
                    <Register name="E" register={this.props.registers.E}/>
                    <Register name="H" register={this.props.registers.H}/>
                    <Register name="L" register={this.props.registers.L}/>
                </table>
                <table className="wordregs">
                    <Regpair name="BC" registerhigh={this.props.registers.B} registerlow={this.props.registers.C}/>
                    <Regpair name="DE" registerhigh={this.props.registers.D} registerlow={this.props.registers.E}/>
                    <Regpair name="HL" registerhigh={this.props.registers.H} registerlow={this.props.registers.L}/>
                    <Regpair name="SP" registerhigh={(this.props.registers.SP>>>8)} registerlow={(this.props.registers.SP&0xff)}/>
                    <Regpair name="PC" registerhigh={(this.props.registers.PC>>>8)} registerlow={(this.props.registers.PC&0xff)}/>
                    <Regpair name="PSW" registerhigh={this.props.registers.A} registerlow={this.props.registers.flag}/>
                </table>
                <FlagRegister register={this.props.registers.flag}/>
            </div>
        )
    }
}

export default Registers;
