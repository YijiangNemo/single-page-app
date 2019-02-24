import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {send_request} from './Request';


class App extends Component {
  constructor(props) {
         super(props);
         this.state = {input_name:'',result_from_input:'',result_from_txt:''};
        this.handleClick = this.handleClick.bind(this);
    }
    async handleClick(){
        var name = document.getElementById('input_name').value;
        var inputdata ={'name':name};
        const res = await send_request('send_name',inputdata,'post')
        if(res.data){this.setState({result_from_input:res.data})}


    }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          {/*<InputLabel style={{color:'#afafaf'}}htmlFor="name">Input Name Here</InputLabel>*/}
              <input
                name="name"

                id="input_name"

              />
          <br/>
            <h5>{`Your Result From Input IS:${this.state.result_from_input}`}</h5>
          <br/>
          <input type='file' accept='text/plain' id='input_text'/>
           <h5>{`Your Result From Txt IS:${this.state.result_from_txt}`}</h5>
          <br/>
            <button onClick={this.handleClick}>Submit</button>
        </header>

      </div>
    );
  }
}

export default App;
