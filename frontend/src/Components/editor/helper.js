let helps={
    "MVI":{
		"generic":"MVI Reg, Immediate",
		"size":2,
		"help":"Move immediate 8-bit"
		},
	"STAX":{
		"generic":"STAX Reg",
		"size":1,
		"help":"Store the accumulator indirect"
		},
	"OUT":{
		"generic":"OUT Immediate",
		"size":2,
		"help":"Output the data from the accumulator to a port with 8bit address"
		},
	"CP":{
		"generic":"CP Label",
		"size":3,
		"help":"Call on positive"
		},
	"ANI":{
		"generic":"ANI Immediate",
		"size":2,
		"help":"Logical AND immediate with the accumulator"
		},
	"RST":{
		"generic":"RST Number",
		"size":1,
		"help":"Restart"
		},
	"CMA":{
		"generic":"CMA ",
		"size":1,
		"help":"Complement accumulator"
		},
	"SBI":{
		"generic":"SBI Immediate",
		"size":2,
		"help":"Subtract the immediate from the accumulator with borrow"
		},
	"LXI":{
		"generic":"LXI Reg",
		"size":3,
		"help":"Load the register pair immediate"
		},
	"DAD":{
		"generic":"DAD Reg",
		"size":1,
		"help":"Add the register pair to H and L registers"
		},
	"CPO":{
		"generic":"CPO Label",
		"size":3,
		"help":"Call on positive"
		},
	"RAL":{
		"generic":"RAL ",
		"size":1,
		"help":"Rotate the accumulator left through carry"
		},
	"CMP":{
		"generic":"CMP Reg",
		"size":1,
		"help":"Compare the register or memory with the accumulator"
		},
	"RAR":{
		"generic":"RAR ",
		"size":1,
		"help":"Rotate the accumulator right through carry"
		},
	"CZ":{
		"generic":"CZ Label",
		"size":3,
		"help":"Call on zero"
		},
	"ADD":{
		"generic":"ADD Reg",
		"size":1,
		"help":"Add register or memory, to the accumulator"
		},
	"DI":{
		"generic":"DI ",
		"size":1,
		"help":"Disable Interrupts"
		},
	"INX":{
		"generic":"INX Reg",
		"size":1,
		"help":"Increment register pair by 1"
		},
	"CM":{
		"generic":"CM Label",
		"size":3,
		"help":"Call on minus"
		},
	"CNZ":{
		"generic":"CNZ Label",
		"size":3,
		"help":"Call on no zero"
		},
	"CALL":{
		"generic":"CALL Label",
		"size":3,
		"help":"Transfers the program sequence to the memory address given in the operand."
		},
	"POP":{
		"generic":"POP Reg",
		"size":1,
		"help":"Pop off stack to the register pair "		
		},
	"RPO":{
		"generic":"RPO ",
		"size":1,
		"help":"Return on parity odd"
		},
	"RRC":{
		"generic":"RRC ",
		"size":1,
		"help":"Rotate the accumulator right"
		},
	"RNC":{
		"generic":"RNC ",
		"size":1,
		"help":"Return on no Carry"
		},
	"SUB":{
		"generic":"SUB Reg",
		"size":1,
		"help":"Subtract the register or the memory from the accumulator"
		},
	"CC":{
		"generic":"CC Label",
		"size":3,
		"help":"Call on Carry"
		},
	"JZ":{
		"generic":"JZ Label",
		"size":3,
		"help":"Jump on zero"
		},
	"RNZ":{
		"generic":"RNZ ",
		"size":1,
		"help":"Return on no zero"
		},
	"XRA":{
		"generic":"XRA Reg",
		"size":1,
		"help":"Exclusive OR register or memory with the accumulator"
		},
	"DCX":{
		"generic":"DCX Reg",
		"size":1,
		"help":"Decrement the register pair by 1"
		},
	"RM":{
		"generic":"RM ",
		"size":1,
		"help":"Return on minus"
		},
	"DCR":{
		"generic":"DCR Reg",
		"size":1,
		"help":"Decrement the register or the memory by 1"
		},
	"SBB":{
		"generic":"SBB Reg",
		"size":1,
		"help":"Subtract the source and borrow from the accumulator"
		},
	"PUSH":{
		"generic":"PUSH Reg",
		"size":1,
		"help":"Push the register pair onto the stack"
		},
	"RPE":{
		"generic":"RPE ",
		"size":1,
		"help":"Return on parity even"
		},
	"RC":{
		"generic":"RC ",
		"size":1,
		"help":"Return on Carry"
		},
	"JNC":{
		"generic":"JNC Label",
		"size":3,
		"help":"Jump on no Carry"
		},
	"XTHL":{
		"generic":"XTHL ",
		"size":1,
		"help":"Exchange H and L with top of stack"
		},
	"ORA":{
		"generic":"ORA Reg",
		"size":1,
		"help":"Logical OR register or memory with the accumulator"
		},
	"JC":{
		"generic":"JC Label",
		"size":3,
		"help":"Jump on Carry"
		},
	"JM":{
		"generic":"JM Label",
		"size":3,
		"help":"Jump on minus"
		},
	"HLT":{
		"generic":"HLT ",
		"size":1,
		"help":"The processor is stopped."
		},
	"JPE":{
		"generic":"JPE Label",
		"size":3,
		"help":"Jump on parity even"
		},
	"JNZ":{
		"generic":"JNZ Label",
		"size":3,
		"help":"Jump on no zero"
		},
	"CNC":{
		"generic":"CNC Label",
		"size":3,
		"help":"Call on no Carry"
		},
	"JMP":{
		"generic":"JMP Label",
		"size":3,
		"help":"Content is transferred to the instruction whose address is specified"
		},
	"JPO":{
		"generic":"JPO Label",
		"size":3,
		"help":"Jump on parity odd"
		},
	"CPE":{
		"generic":"CPE Label",
		"size":3,
		"help":"Call on parity even"
		},
	"ACI":{
		"generic":"ACI Immediate",
		"size":2,
		"help":"Add the immediate to the accumulator with carry"
		},
	"LDAX":{
		"generic":"LDAX Reg",
		"size":1,
		"help":"Load the accumulator indirect"
		},
	"SHLD":{
		"generic":"SHLD Immediate",
		"size":3,
		"help":"Store H and L registers direct"
		},
	"DAA":{
		"generic":"DAA ",
		"size":1,
		"help":"Decimal adjust accumulator"
 


		},
	"LDA":{
		"generic":"LDA Immediate",
		"size":3,
		"help":"Load the accumulator"
		},
	"MOV":{
		"generic":"MOV Reg1, Reg2",
		"size":1,
		"help":"Copy from the source (Sc) to the destination(Dt)"
		},
	"XRI":{
		"generic":"XRI Immediate",
		"size":2,
		"help":"Exclusive OR immediate with the accumulator"
		},
	"CPI":{
		"generic":"CPI Immediate",
		"size":2,
		"help":"Compare immediate with the accumulator"
		},
	"ADC":{
		"generic":"ADC M",
		"size":1,
		"help":"Add register to the accumulator with carry"
		},
	"SPHL":{
		"generic":"SPHL ",
		"size":1,
		"help":"Copy H and L registers to the stack pointer"
		},
	"STA":{
		"generic":"STA Direct",
		"size":3,
		"help":"Copy accumulator to the memory location specified by the operand."
		},
	"LHLD":{
		"generic":"LHLD Immediate",
		"size":3,
		"help":"Load H and L registers direct"
		},
	"ANA":{
		"generic":"ANA Reg",
		"size":1,
		"help":"Logical AND register or memory with the accumulator"
		},
	"RET":{
		"generic":"RET ",
		"size":1,
		"help":"Return from subroutine unconditionally"
		},
	"INR":{
		"generic":"INR Reg",
		"size":1,
		"help":"Increment the register or the memory by 1"
		},
	"RZ":{
		"generic":"RZ ",
		"size":1,
		"help":"Return on zero"
		},
	"PCHL":{
		"generic":"PCHL ",
		"size":1,
		"help":"Load the program counter with HL contents."
		},
	"RIM":{
		"generic":"RIM ",
		"size":1,
		"help":"Read interrupts mask"
		},
	"JP":{
		"generic":"JP Label",
		"size":3,
		"help":"Jump on positive"
		},
	"XCHG":{
		"generic":"XCHG ",
		"size":1,
		"help":"Exchange H and L with D and E"
		},
	"SIM":{
		"generic":"SIM ",
		"size":1,
		"help":"Set interrupt mask "
		},
	"ORI":{
		"generic":"ORI Immediate",
		"size":2,
		"help":"Logical OR Immediate with the accumulator"
		},
	"EI":{
		"generic":"EI ",
		"size":1,
		"help":"Enable Interrupt"
		},
	"ADI":{
		"generic":"ADI Immediate",
		"size":2,
		"help":"Add the immediate to the accumulator"
		},
	"RLC":{
		"generic":"RLC ",
		"size":1,
		"help":"Rotate accumulator left"
		},
	"IN":{
		"generic":"IN Immediate",
		"size":2,
		"help":"Input data to accumulator from a port with 8-bit address"
		},
	"NOP":{
		"generic":"NOP ",
		"size":1,
		"help":"No	operation is performed."
		},
	"RP":{
		"generic":"RP ",
		"size":1,
		"help":"Return on positive	"
		},
	"STC":{
		"generic":"STC ",
		"size":1,
		"help":"The	CY flag is set to 1"
		},
	"CMC":{
		"generic":"CMC ",
		"size":1,
		"help":"The	CY	flag	is	complemented"
		},
	"SUI":{
		"generic":"SUI Immediate",
		"size":2,
		"help":"Subtract the immediate from the accumulator"
		}
}

export default helps;