import React ,{Component}from 'react'
import "./console.css"
export class Consoleview extends Component
{
    state={
        errors:[[],[]]
    }
    make_debug_line=(lineno,errors)=>{
        if(errors.length===0)
        return ""
        let errs=errors.map((error,index)=>{
            return(
                <div className="error">
                    <div className="errorno">Error {index+1}:</div>
                    <p className="errortext">
                    {error}
                    </p>
                </div>
            )
        })
        return(
            <div className="line_error">
            <div className="line_number">
                on line {lineno+1}
            </div>
            <div className="errors">
                {errs}
            </div>
        </div>
        )
    }
    display_errors(){
       let errlist= this.state.errors.map((errors,line_no)=>{
           return this.make_debug_line(line_no,errors)
       })
       return errlist
    }
    render(){
        return(
            <div className="consolebox">
            <div className="console">
                {this.display_errors()}
            </div>
            </div>
        )
    }
}

export default Consoleview;