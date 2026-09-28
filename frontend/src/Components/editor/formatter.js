import Instruction from './instructions'
export class Formatter
{
    nodes=[];
    deltachars=0;
    maxlabel=0;
    formatline(toformat,toDelta=false)
    {
        toformat=toformat.replaceAll(/,(\S)/g,(match,p1)=>{
            this.deltachars+=toDelta?1:0;
            return ", "+p1;
        })
        toformat=toformat.replaceAll(/:(\S)/g,(match,p1)=>{
            this.deltachars+=toDelta?1:0;
            return ": "+p1;
        })
        let eachwordreg=/\S+/g;
        toformat=toformat.replaceAll(eachwordreg,(match,offset,string)=>
        {
            let tocomma=match.endsWith(",");
            if(tocomma)match=match.replace(",","");
            if(Instruction.isInstruction(match) || Instruction.isRegister(match))
            match=match.toUpperCase();
            return tocomma?match+",":match;
        }
        );
        return  toformat
    }
    calcLabelSize(text)
    {
        let maxlabel=0;
        let lines=text.split("\n");
        if(lines)
        {
            lines.forEach((line,index,lines)=>{
                let label=line.match(/(^.*?:)/);
                if(label)
                {
                    label[0]=label[0].trim();
                    if(label[0].length>maxlabel) maxlabel=label[0].length;
                }
            })
            this.maxlabel=maxlabel;
        }
    }

    addPadding(toformat,toDelta)
    {
        let inp=toformat;
        let tmatch=toformat.trimLeft();
        toformat=(this.maxlabel>0)?" ".repeat(this.maxlabel+1)+tmatch:tmatch;
        toformat=toformat.replaceAll(/(^\s*[\S]+:)/gm,(match,p1)=>{
            let tmatch=match.trimLeft();
            let nmatch=tmatch.padStart(this.maxlabel," ");
            return nmatch;
        })
        
        if (toDelta)this.deltachars+=toformat.length-inp.length;
        return toformat;
    }
    Format(text,position=0)
    {
        this.calcLabelSize(text);
        this.deltachars=0;
        let currentPosition=0;
        if(text.length>0){
            let lines=text.split("\n");
            if(lines.length>0)
            {
                
                lines.forEach((line,index,lines)=>{
                    if(position>currentPosition+line.length)
                    {
                        currentPosition+=line.length+1;
                        let endat=line.indexOf(";");
                        endat=endat<0?line.length:endat;
                        let comment=line.substring(endat);
                        line=line.substring(0,endat);
                        line=this.addPadding(line,true);
                        lines[index]=this.formatline(line,true)+comment;
                    }
                    else if(position<currentPosition)
                    {
                        currentPosition+=line.length+1;   
                        let endat=line.indexOf(";");
                        endat=endat<0?line.length:endat;
                        let comment=line.substring(endat);
                        line=line.substring(0,endat);
                        line=this.addPadding(line);
                        lines[index]=this.formatline(line)+comment;
                    }
                    else{
                        currentPosition+=line.length+1;
                        let endat=line.indexOf(";");
                        endat=endat<0?line.length:endat;
                        let comment=line.substring(endat);
                        line=line.substring(0,endat);
                        if (comment&&line[endat-1]!==" "&&endat>0)
                        {
                            line=line+" "
                            this.deltachars+=position>=endat?1:0;
                        }
                        let beforeCursor=line.lastIndexOf(" ",position-2);
                        beforeCursor=beforeCursor<0?0:beforeCursor;
                        let afterCursor=line.indexOf(" ",position+2);
                        afterCursor=afterCursor<0?line.length:afterCursor;
                        let before=line.substring(0,beforeCursor);
                        let word=line.substring(beforeCursor,afterCursor);
                        let after=line.substring(afterCursor);
                        before=this.formatline(before,true);
                        after=this.formatline(after);
                        lines[index]=before+word+after+comment;
                    }
                })
            }
           text= lines.join("\n");
        }
        return text;        
    }

}

export default Formatter;
