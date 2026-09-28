from flask import Flask, render_template,send_file,request,url_for
import os
import json

from translator import Emulator
defname=os.path.join(os.path.dirname(__file__),"sort.asm")
emu=Emulator(defname)

template_dir=os.path.join(os.path.dirname(__file__),"../frontend/build")
static_dir=os.path.join(template_dir,"static")
print(template_dir)
app=Flask(__name__,template_folder=template_dir,static_folder=static_dir)

@app.route("/")
def index():
    return send_file(os.path.join(template_dir,"index.html"))


@app.route("/favicon.ico")
def favicon():
    return send_file(os.path.join(template_dir,"favicon.ico"))

@app.route("/refresh_status")
def refresh():
    registers={
        'A':emu.registers.A,
        'B':emu.registers.B,
        'C':emu.registers.C,
        'D':emu.registers.D,
        'E':emu.registers.E,
        'H':emu.registers.H,
        'L':emu.registers.L,
        'SP':emu.registers.SP,
        'PC':emu.registers.PC,
        'flag':emu.registers.Flags
        }
    breaks=emu.get_break()
    memory={
        int(key):value for key,value in emu.get_mem().items() if any(value)
    }
    ports={
        int(key):value for key,value in emu.get_ports().items() if any(value)
    }
    status={
        "registers":registers,
        "memory":memory,
        "ports":ports,
        "breakpoints":breaks
    }
    return status

@app.route("/start_emulation",methods=["POST"])
def start_emulation():
    text_data=request.form["text"]
    file_name=request.form["fname"]
    with open(file_name,"w") as outfile:
        outfile.write(text_data)
    emu=Emulator(file_name)

@app.route("/explorer/list",methods=["POST"])
def list_allfiles():
    form=json.loads(request.data)
    current_path=form["current_path"]
    if(not current_path):
        current_path=os.getcwd()
    clicked_name=form["clicked"]
    new_root=os.path.join(current_path,clicked_name)
    new_root=os.path.realpath(new_root)
    print(new_root)
    items=[]
    with os.scandir(new_root) as scanitems:
        for item in scanitems:
            entry={
                "name":item.name,
                "type":"file" if item.is_file() else "folder"
            }
            items.append(entry)
    items.sort(key=lambda a:a["type"],reverse=True)
    return {"current_path":new_root,
            "current_content":items,
            "clicked":""
            }
   

@app.route("/reset")
def reset_emulation():
    emu.reset()
    return refresh()

@app.route("/continue")
def continue_emulation():
    emu.continue_execution()
    return refresh()

@app.route("/ni")
def next_instruction():
    emu.single_step()
    return refresh()

@app.route("/file/open",methods=["POST"])
def open_file():
    global emu
    form=json.loads(request.data)
    path=form["path"]
    text=""
    if(os.path.exists(path) and  os.path.isfile(path)):
        with open(path,"r") as infile:
           text=infile.read()
        emu.close()
        emu=Emulator(path)
    return{
        "text":text
    }

@app.route("/file/save",methods=["POST"])
def save_file():
    global emu
    form=json.loads(request.data)
    path=form["path"]
    text=form["text"]
    with open(path,"w") as outfile:
        outfile.write(text)
    emu.close()
    emu=Emulator(path)
    return{
        "status":"success"
    }

@app.route("/writemem",methods=["POST"])
def writemem():
    global emu
    form=json.loads(request.data)
    addr=form["addr"]
    value=form["value"]
    emu.set_memory(addr,value)    
    return refresh()

@app.route("/writeport",methods=["POST"])
def writeport():
    global emu
    form=json.loads(request.data)
    addr=form["addr"]
    value=form["value"]
    emu.set_port(addr,value)    
    return refresh()

@app.route("/add_brk",methods=["POST"])
def addbrk():
    global emu
    form=json.loads(request.data)
    addr=form["addr"]
    emu.add_break(addr)
    return ""    

@app.route("/rem_brk",methods=["POST"])
def rembrk():
    global emu
    form=json.loads(request.data)
    addr=form["addr"]
    emu.rem_break(addr)
    return ""  
