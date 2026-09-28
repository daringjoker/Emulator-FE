import Instructions from "./instructions"
import opcodeof from "./opcodes"
import helps from "./helper"
export class Processor
{
    static baseAddress=0x4000;
    static assembleCache={};
    static lineAddresses=[];
    static Raw_Bytes_for_line=[];
    static toaddressify=[];
    static labelMap;
    static addr2line;
    static line2error;
    static errors=[]
    static current_line_no=0;
    static raiseError(error)
    {
        this.errors[this.current_line_no].push(error);
    }
    static process_label(label,address)
    {
        this.labelMap[label]={address:address,
        line:this.current_line_no
    }
    }
    static process_argument(argument)
    {
        if(Instructions.isRegister(argument))
        {
            return {
                stencil:argument.toUpperCase(),
                type:"reg",
                data:0
            }
        }
        else if(Instructions.isImmediate(argument))
        {
            return {
                stencil:"DATA",
                type:"imm",
                data:Instructions.isImmediate(argument).value
            }
        }
        else
        {
            return {
                stencil:"",
                type:"unknown",
                data:0
            }
        }
    }
    static process_arguments(argument1,comma,argument2)
    {
        argument1=argument1?argument1:""
        comma=comma?comma:""
        argument2=argument2?argument2:""
        if (argument1 && !comma &&!argument2)
        {
            //single argument mode
            let processed=this.process_argument(argument1)
            return {
                stencil:processed.stencil,
                value:processed.data
                }
        }
        else if (argument1&&comma&&argument2)
        {
            let processed1=this.process_argument(argument1)
            let processed2=this.process_argument(argument2)
            if(processed1.type==="imm"&&processed2.type==="imm")
            this.raiseError("Both arguments cannot be Immediates,Immediately wrong!!");
            else{
            let stencil=processed1.stencil+", "+processed2.stencil;
            let data=(processed1.type==="imm")?processed1.data:((processed2.type==="imm")?processed2.data:0);
            return{
                stencil,
                value:data
                };
            }

        }
        else if(argument1&&argument2&&!comma)
        {
            //missing comma
            this.raiseError("Comma seems to be missing, please look for it!")
        }
        else if(argument1&&comma &&!argument2)
        {
            //missing second argument
            this.raiseError("Missing second operand, Yet to type?")
        }
        else if(!argument1&&comma && argument2)
        {
            //missing first argument
            this.raiseError("No first argument!,or comma out of place?")
        }
        else if (!argument1&&!argument2&&comma)
        {
            // dangling comma mov ,
            this.raiseError("Commas are used to separate arguments not instructions!!")
        }
        else
        {
            // no argument mode
            return{
                stencil:"",
                value:0
            }
        }
        return{
            stencil:"",
            value:0
        }
    }
    static byte2str(number,numBytes=1)
    {
        if(numBytes===0) return "";
        let result="";
        if(numBytes===1)number=number&0xff;
        if(numBytes===2)number=number&0xffff;
        let str=number.toString(16).padStart(numBytes*2,"0").toUpperCase();
        if(numBytes>1)
        {
           let strh=str.substring(0,2);
           let strl=str.substring(2);
           result+=strl+" "+strh;
        }
        else 
        result=str;
        return result;
    }
    static reset()
    {
        this.lineAddresses=[];
        this.Raw_Bytes_for_line=[];
        this.toaddressify=[];
        this.labelMap={};
        this.errors=[]
    }
    static process(text)
    {
        this.reset();
        let CurrentAddress=this.baseAddress;
        let textlines=text.split("\n");
        textlines.forEach((line,index,textlines)=>{
            this.current_line_no=index;
            this.errors[this.current_line_no]=[]
            line=line.replace(/;.*?$/,"")
            line=line.trim();
            if(line)
            {
                let tokens=line.match(/^(\w+:)?\s*(\w*)\s*(\w*|(?:'.'))\s*(,)?\s*(\w*|(?:'.'))$/);
                    if(tokens)
                    {
                        let label=tokens[1];
                        if(label) this.process_label(label,CurrentAddress);
                        else{
                            if(this.assembleCache[line])
                            {
                                let lineData=this.assembleCache[line];
                                this.Raw_Bytes_for_line[this.current_line_no]=lineData.rawbytes;
                                this.lineAddresses[this.current_line_no]=CurrentAddress.toString(16).padStart(4,'0').toUpperCase();                    
                                CurrentAddress+=lineData.size;
                                return;
                            }
                        }
                        let instruction=tokens[2];
                        let argument1=tokens[3];
                        let comma=tokens[4];
                        let argument2=tokens[5];
                        if(instruction)
                        {
                            if(Instructions.isInstruction(instruction))
                            {
                                let opcode;
                                let size=helps[instruction.toUpperCase()].size                            
                                if(instruction.match(/^C(?:C|M|NC|NZ|PE|PO|P|Z|ALL)$|^J(?:NZ|MP|C|MP|NC|PO|PE|P|M|Z)/))
                                {
                                    let fullstencil=instruction.toUpperCase()+" Label"
                                    opcode= opcodeof[fullstencil]
                                    this.toaddressify.push({line:this.current_line_no,label:argument1})
                                    this.Raw_Bytes_for_line[this.current_line_no]=opcode.toString(16).padStart(2,'0').toUpperCase();
                                    this.lineAddresses[this.current_line_no]=CurrentAddress.toString(16).padStart(4,'0').toUpperCase();
                                    CurrentAddress+=size;
                                }
                                else{
                                    let argdata=this.process_arguments(argument1,comma,argument2)
                                    let fullstencil=instruction.toUpperCase()+" "+argdata.stencil;
                                    fullstencil=fullstencil.trim()
                                    opcode= opcodeof[fullstencil]
                                    if (opcode||instruction==="NOP")
                                    {
                                        this.Raw_Bytes_for_line[this.current_line_no]=this.byte2str(opcode,1)+" "+this.byte2str(argdata.value,size-1);
                                        this.lineAddresses[this.current_line_no]=CurrentAddress.toString(16).padStart(4,'0').toUpperCase();
                                        this.assembleCache[line]={
                                            size,
                                            rawbytes:this.Raw_Bytes_for_line[this.current_line_no]
                                        }
                                        CurrentAddress+=size;                                
                                    }
                                    else{
                                        this.raiseError(`Syntax invalid for instruction '${instruction}' it should be in form ${helps[instruction.toUpperCase()].generic}`)
                                        this.lineAddresses[this.current_line_no]="";
                                    }  
                                }                          
                            }
                            else
                            {
                                this.raiseError("unknown Instruction or a comment with missing semicolon ;")
                                this.lineAddresses[this.current_line_no]="";
                            }
                        }
                    }
                    else{
                        this.raiseError("wrong syntax, use semicolon if writing a comment!");
                        this.lineAddresses[this.current_line_no]="";
                    }
                }
         
            else{
                this.lineAddresses[this.current_line_no]="";
            }          
        })
        if(this.lineAddresses[this.current_line_no]) this.current_line_no++;
        this.lineAddresses[this.current_line_no]=CurrentAddress.toString(16).padStart(4,'0').toUpperCase();
        this.Raw_Bytes_for_line[this.current_line_no]=" ";
            this.toaddressify.forEach((elem)=>{
            let label=elem.label;
            let line2change=elem.line;
            let labeldata=this.labelMap[label+":"];
            if(labeldata)
            {
                this.Raw_Bytes_for_line[line2change]+=" "+this.byte2str(labeldata.address,2);
            }
            else
            {
                this.Raw_Bytes_for_line[line2change]+=" XX XX";
            }
        })
    }
    

}

export default Processor;