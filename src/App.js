import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {send_request} from './Request';


class App extends Component {
  constructor(props) {
         super(props);
         this.state = {result_from_input:'',result_from_txt:'',result_from_list:''};
        this.handleClick = this.handleClick.bind(this);
    }
    async handleClick(){
        let header = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
            }
            let header1 = {
               'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
            'content-type': 'multipart/form-data'
                }
        let name = document.getElementById('input_name').value;
        let name_list = document.getElementById('name-list').value;
        let name_text = document.getElementById('input_text');
        if(name){
           let inputdata ={'name':name};
            try {
               const res = await send_request('send_name',inputdata,'post',header)

                if(res.data){this.setState({result_from_input:res.data.output})}

              } catch (error) {
                alert(error.message);
              }
        }
        if(name_list){
          let list = name_list.split('\n');
          let d  = ''
          const promises = list.map(function (id) {
            d = {'name':id}
            return send_request('send_name',d,'post',header)
          });
          Promise.all(promises).then(res => {
              console.log(res)
              let arr = [];
              for(let i in res){
                arr.push([res[i].data.name , res[i].data.output])
              }
              console.log(arr)
              this.setState({result_from_list:arr})
            }).catch(error =>{
              alert(error.message)
            });
        }
        if(name_text.files){
          console.log(name_text.files[0])
            let file = new FormData();
             file.append('file',name_text.files[0]);
            try {
               const res = await send_request('send_file',file,'post',header1)

                if(res.data){this.setState({result_from_txt:res.data.data})}

              } catch (error) {
                alert(error.message);
              }
        }



    }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />


              <input
                name="name"

                id="input_name"

              />
          <br/>
            <h5>{`Your Result From Input IS:${this.state.result_from_input}`}</h5>
          <br/>
          <input name="file" type='file' accept='text/plain' id='input_text'/>
           <h5>{`Your Result From Txt IS:`}</h5>
            {this.state.result_from_txt&&this.state.result_from_txt.map(n=>{
            return(<p>{`${n.name}---${n.output}`}</p>)
          })}
          <br/>
          <textarea rows="4" cols="50" id='name-list'>

          </textarea>
          <br/>

          <h5>{`Your Result From LIST IS:`}</h5>
          {this.state.result_from_list&&this.state.result_from_list.map(n=>{
            return(<p>{`${n[0]}---${n[1]}`}</p>)
          })}
          <br/>
            <button onClick={this.handleClick}>Submit</button>
          <br/>
        </header>

      </div>
    );
  }
}

export default App;
