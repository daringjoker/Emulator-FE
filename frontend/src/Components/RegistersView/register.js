import React ,{Component}from 'react'
import "./registers.css"

export class Register extends Component
{
    isPrintable(char)
    {
        return(' '.charCodeAt(0)<=char &&char<='~'.charCodeAt(0));
    }

    render()
    {
        let ascii=""
        if (this.isPrintable(this.props.register))        
        {ascii=<td className="asciivalue value">'{String.fromCharCode(this.props.register)}'</td> }
        else
        {ascii=<td className="asciivalue value">'<span style={{color:"gray",opacity:0.5}}>•</span>'</td> }
        return(
            <tr className='register-row'>
            <td className='regname'>{this.props.name}</td>
            <td className="hexvalue value">{this.props.register.toString(16).padStart(2,'0').toUpperCase()}h</td>
            <td className="decvalue value">{this.props.register}</td>
            {ascii}
            </tr>
        )
    }
}
export default Register;