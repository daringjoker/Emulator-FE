import React ,{Component}from 'react'
import processor from "./processor"
import Token from './token'
export class Highlighter extends Component
{
    lines=[]
    constructor(props)
    {
        super(props);
        this.lines=this.props.text.split("\n");
    }
    render()
    {
        let elements=[];
       let lines= this.props.text.split("\n")
        lines.forEach((line,index,lines)=>{
            let linebreaker=/^(\s*)(.*?:)?(\s*)(?:(\w*)(\s*)(\w*|(?:'.'))(\s*)(,?)(\s*)(\w*|(?:'.'))(\s*))(;.*?)?$/;
            let tokens=line.match(linebreaker);
            let line_elems=[];
            if(tokens)
            {
                for(let i=1;i<tokens.length;++i)
                {
                    if(!tokens[i])tokens[i]="";
                    if(tokens[i].trim()) 
                    {
                    line_elems.push(<Token line={line} word={tokens[i]}/>)                            
                    }
                    else{
                        if(tokens[i])
                    line_elems.push(<span>{tokens[i]}</span>)
                    }
                }
                line_elems.push(<span>{"\n"}</span>)
                let curr_line_add=processor.lineAddresses.length>index?processor.lineAddresses[parseInt(index)]:0;
                curr_line_add=parseInt(curr_line_add,16)
                let error=processor.errors[index]
                let selected=(curr_line_add===this.props.parent.state.registers.PC)?"line PC":"line";
                if(error)
                selected+=(error.length===0)?"":" ErrorLine"
                elements.push(<span className={selected}>{line_elems}</span>)
            }else
            {
                elements.push(<span className="ErrorLine">{line +"\n"}</span>)
            }  

        })
        return(
            <span className="highlighted">
                {
                    elements
                }

            </span>
        )
    }
}
export default Highlighter;