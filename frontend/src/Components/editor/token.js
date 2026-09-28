import React ,{Component}from 'react'
import Instructions from "./instructions"
import helps from "./helper"
import Processor from './processor';

export class Token extends Component
{
    help=""
    helpable=false;
    fontwt="auto";
    color="#e1efff";
    coloring=()=>
    {
        let word=this.props.word;
        if(Instructions.isInstruction(word))
        {
            this.color="rgb(255, 0, 38)";
            this.fontwt="bold"
            this.helpable=true;
            this.help=helps[word.toUpperCase()]["help"] 
        }
        else if(Instructions.isRegister(word)){
             this.color="#0088ff";
             this.fontwt="bolder"
             this.help="";
             this.helpable=false;
        }
        else if(word.startsWith(";")){
            this.color="#3ad900";
            this.helpable=false;
            this.help="";
        }
        else if(word.endsWith(":"))
        {
            this.color="#ff9d00";
            let pointedby=""
            Processor.toaddressify.forEach((jumps)=>{
                if(jumps.label+":"===word)
                    pointedby+="0x"+Processor.lineAddresses[jumps.line]+", ";
                
            })
            pointedby=pointedby.substring(0,pointedby.length-2)
            this.help=pointedby?"Refrenced from : "+pointedby:"Not refrenced anywhere"
            this.helpable=true;
        }
        else if (Instructions.isImmediate(word)){
            // console.log("immediate found!!",word);
            this.color="rgb(255, 0, 106)"
            let value=Instructions.isImmediate(word).value;
            let binary=value.toString(2)
            let hex=value.toString(16);
            let octal=value.toString(8)
            this.help=`HEX:${hex}   DEC:${value}   BIN:${binary}   OCT:${octal}`
            this.helpable=true;
        }
        else if (Processor.labelMap[word+":"]){
            this.color="#ffc600"
            let label=Processor.labelMap[word+":"];
            let address=label.address.toString(16).padStart(4,'0').toUpperCase();
            this.help="Declared on 0x"+address
            this.helpable=true;
        }
    }

 render()
    {
        this.help=""
        this.helpable=false;
        this.fontwt="auto";
        this.color="black";
        this.coloring();
            return<span
            className={this.helpable?"tokens":""}
            style={{color:this.color,
                    fontWeight:this.fontwt
                }}
            data-help={this.help}
            >
                {this.props.word}
            </span>
    }

}

export default Token;