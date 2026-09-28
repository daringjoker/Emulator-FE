
   export class Instruction{
     static instructions=["MOV","RAL","RNZ","RP","CPI","ADD","RPO","DCX","SHLD","XCHG",
	"SBI","CNC","POP","STA","ADC","IN","DAD","RET","XRI","CZ",
	"STC","JPE","INX","JM","CC","LDAX","PUSH","RM","CALL","LDA",
	"RNC","CMA","SPHL","XRA","OUT","CP","JZ","CNZ","DCR","ORA",
	"NOP","JMP","LXI","RAR","HLT","CMP","RIM","PCHL","DI","JPO",
	"DAA","STAX","CPO","EI","SIM","JC","JNC","RST","ANA","CMC",
	"RRC","SUB","RC","SBB","CPE","JP","RLC","CM","JNZ","ADI",
    "INR","ANI","MVI","ACI","RZ","SUI","RPE","XTHL","ORI","LHLD"];    
    static Arithmetic=['DCR','INR','ADD','ADI','ADC','ACI','SUB','SUI','SBB','SBI','INX','DCX','DAD','DAA']
    static Datatransfer=['MOV','MVI','LXI','LDA','STA','LHLD','SHLD','LDAX','STAX','XCHG']
    static FlowControl=['PCHL','JMP','CALL','RET','RST',"RZ",]
    static InputOutput=['IN','OUT']
    static Interrupts=['EI','DI','SIM','RIM']
    static Logical=['ANA','ANI','XRA','XRI','ORA','ORI','CMP','CPI','RLC','RRC','RAL','RAR','CMA','CMC','STC']
    static special=['NOP','HLT',]
    static StackOperations=['PUSH','POP','XTHL','SPHL']
    static registers=["A","B","C","D","E","H","L","PSW","M","SP"]
    static isInstruction(para)
    {
        return this.instructions.includes(para.toUpperCase());
    }
    static isRegister(para)
    {
        return this.registers.includes(para.toUpperCase());
    }
    static isImmediate(para)
    {
        let isimm=false;
        let value=null;
        if(para.match(/^[0-9]+$/))
        {
            isimm=true;
            value=parseInt(para,10);
        }
        else if(para.match(/^[0-9a-fA-F]+[hH]$/))
        {
            isimm=true;
            value=parseInt(para,16);   
        }
        else if(para.match(/^[0-1]+[bB]$/))
        {
            isimm=true;
            value=parseInt(para,2);
        }
        else if(para.match(/^[0-7]+[oO]$/))
        {
            isimm=true;
            value=parseInt(para,8);
        }
        else if(para.match(/^'.'$/))
        {
            isimm=true;
            value=para.charCodeAt(1);
        }
        if(isimm)
        return{
            value
        }
        else 
        return null
    }

   }



export default Instruction;
