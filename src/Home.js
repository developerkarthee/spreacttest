import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import './Home.css';

import uparrow from './grayarrow.gif';
import Apicontext from './service/Apicontext';
import { BrowserRouter as Router, withRouter, Route, Redirect, useHistory, Link } from 'react-router-dom';
class Home extends Component {

    state = null;
    constructor(props) {
        super(props);
        this.state = { pageID: null, data: {} };
        this.HideClick = this.HideClick.bind(this)
    }


    componentDidUpdate(prevState) {
       
        if (prevState && this.props.pageIndex != prevState.pageIndex) {
            console.log("previous", prevState);
            this.getValuesFromAPi(this.props.pageIndex);
        }
    }
    componentDidMount() {
        const { match: { params: { id } } } = this.props;
        this.props.passParent(id);
    }

    getValuesFromAPi(paageId) {
        Apicontext.getRecords(paageId).then((res) => {
            this.setState({ data: { ...res.data } })
        });
    }

    HideClick(item){
        
        
           
     
    }

    rendertableRow() {
        if (this.state.data.hits && (this.state.data.hits instanceof Array)) {
            return (<tbody>
                {this.state.data.hits.map( (item, i)=> {
                    
                    const hideKey = item.objectID + "hide";
                    const voteKey = item.objectID + "vote";
                    if(localStorage.hasOwnProperty(hideKey)){
                        item.show = localStorage.getItem(hideKey)
                    }
                    if(localStorage.hasOwnProperty(voteKey)){
                        item.votecount = parseInt(localStorage.getItem(voteKey))
                    }
                    item.votecount = item.votecount == undefined ? 0 : item.votecount;
                    item.show = item.show == undefined ? 0 : item.show;
                    return <tr key={i}>
                        <td >{item.num_comments}</td>
                        <td>
                            {item.votecount}
                        </td>
                        <td>
                        <span className="up-arrow" onClick={()=>{
                            
                            item.votecount = item.votecount + 1;
                            localStorage.setItem(voteKey, item.votecount);
                            this.setState({data : {...this.state.data}});
                        }} ><img src={uparrow}/></span>
                        </td>
                        
                        <td align="left">{item.title}
                        {item.show == 0 && <section className="detail-section">
                           <span className="url">({item.url ? item.url.replace('http://','').replace('https://','').split(/[/?#]/)[0] : ""})</span>
                           <span className="by">by</span>
                           <span className="author">{item.author}</span>
                           <span className="time">{ Math.trunc((new Date() - new Date(item.created_at_i * 1000))/(60*60*1000))} hours ago</span>
                          
                        </section> }
                        <section className="detail-section"> {item.show == 0? <a onClick={()=>{
                               //debugger;
                                   item.show = 1; 
                                   
                                   localStorage.setItem(hideKey, item.show);
                                   //this.state.data.hits[i].show = "true"
                                   this.setState({data : {...this.state.data}})
                                   //console.log(this.state.data);
                           }}>[ hide ]</a> :
                            <a onClick={(()=>{
                               
                                item.show = 0; 
                                localStorage.setItem(hideKey, item.show);
                                this.setState({data : {...this.state.data}})
                               }).bind(this)}>[ show ]</a>}</section>
                        </td>
                </tr>
            })
        }
        </tbody>);

    }
   }

    render() {
        return (
                <div>
                    <span >Active page :  {this.props.pageIndex
                    }</span>
                    <Table striped bordered hover size="sm">
                        <thead className="table-header" >
                            <tr>
                                <th>Comments</th>
                                <th>Vote Count</th>
                                <th>Up Vote</th>
                                <th>News</th>
                            </tr>
                        </thead>

                        {
                            this.rendertableRow()
                        }

                    </Table>
                </div>
        );
    }


}

export default withRouter(Home);