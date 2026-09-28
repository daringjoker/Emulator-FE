import React ,{Component}from 'react'
import "./registers.css"

export class Regpair extends Component
{
    render()
    {
    return(
            <tr className='register-row'>
            <td className='regname'>{this.props.name}</td>
            <td className="hexvalue value">{this.props.registerhigh.toString(16).padStart(2,'0').toUpperCase()+this.props.registerlow.toString(16).padStart(2,'0').toUpperCase()}h</td>
            <td className="decvalue value">{(this.props.registerhigh<<8)|this.props.registerlow}</td>
            </tr>
        )
    }
}
export default Regpair;