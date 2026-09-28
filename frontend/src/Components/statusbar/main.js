import React ,{Component}from 'react'
import "./statusbar.css"

export class Statusbar extends Component
{

    render(){
        return(
            <div className="statusbar">
                <div className={this.props.mode}>{this.props.mode}</div>
                <div className="msg">
                    <div className="shortmsg">
                        with <span class="heart" >&#9829;</span> from <span className="ourname">PRS Company</span>
                    </div>
                    <div className="longmsg">
                        <span className="ourname">Pukar Giri</span>, <span className="ourname">Ram Bharati</span>  &amp; <span className="ourname">Sulochan Dahal</span> (THA 074 BEX)
                    </div>
                </div>
                <div className={this.props.status}>{this.props.status}</div>

            </div>
        )
    }
}

export default Statusbar;
