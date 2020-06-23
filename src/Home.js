import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import './Home.css';
import LineChart from 'react-linechart';
import uparrow from './grayarrow.gif';
import Apicontext from './service/Apicontext';
import { BrowserRouter as Router, withRouter, Route, Redirect, useHistory, Link } from 'react-router-dom';
class Home extends Component {

    state = null;
    constructor(props) {
        super(props);
        this.state = {
            pageID: null, data: {}, chartdata: [
                {
                    color: "steelblue",
                    points: []
                }]
        };
        this.HideClick = this.HideClick.bind(this)
    }


    componentDidUpdate(prevState) {

        if (prevState && this.props.pageIndex != prevState.pageIndex) {
            console.log("previous", prevState);
            this.getValuesFromAPi(this.props.pageIndex);
            //preparingmap((item)=>{}) data for chart

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

    updateChart() {
        if (this.state.data.hits && (this.state.data.hits instanceof Array)) {
            let k = 0;
            this.state.chartdata[0].points = this.state.data.hits.filter((item)=>{ return item.hiderow != 1}).map((item) => {
                k = k + 1;
                return { id: item.objectID, x: k, y: item.votecount };
            })
            //this.setState({ chartdata: [...this.state.chartdata]  })
        }
    }

    HideClick(item) {




    }

    rendertableRow() {
        if (this.state.data.hits && (this.state.data.hits instanceof Array)) {
            return (<tbody>
                {this.state.data.hits.map((item, i) => {

                    const { voteKey, lessKey, hiderowKey } = updateValueFromLocalStorage(item);
                    item.votecount = item.votecount == undefined ? 0 : item.votecount;
                    item.show = item.show == undefined ? 0 : item.show;
                    item.hiderow = item.hiderow == undefined ? 0 : item.hiderow;
                    if (i == (this.state.data.hits.length - 1)) {
                        this.updateChart();
                    }
                    //dont render the row if the row is hidden
                    if(item.hiderow == 1){
                        return;
                    }
                    return <tr key={i}>
                        <td >{item.num_comments}</td>
                        <td>
                            {item.votecount}
                        </td>
                        <td>
                            <span className="up-arrow" onClick={() => {

                                item.votecount = item.votecount + 1;
                                localStorage.setItem(voteKey, item.votecount);
                                this.setState({ data: { ...this.state.data } });
                            }} ><img src={uparrow} /></span>
                        </td>

                        <td align="left">{item.title}
                            {item.show == 0 && <section className="detail-section">
                                <span className="url">({item.url ? item.url.replace('http://', '').replace('https://', '').split(/[/?#]/)[0] : ""})</span>
                                <span className="by">by</span>
                                <span className="author">{item.author}</span>
                                <span className="time">{Math.trunc((new Date() - new Date(item.created_at_i * 1000)) / (60 * 60 * 1000))} hours ago</span>

                            </section>}
                            <section className="detail-section"> {item.show == 0 ? <a onClick={() => {
                                //debugger;
                                item.show = 1;

                                localStorage.setItem(lessKey, item.show);
                                //this.state.data.hits[i].show = "true"
                                this.setState({ data: { ...this.state.data } })
                                //console.log(this.state.data);
                            }}>[ less ]</a> :
                                <a onClick={(() => {

                                    item.show = 0;
                                    localStorage.setItem(lessKey, item.show);
                                    this.setState({ data: { ...this.state.data } })
                                }).bind(this)}>[ more ]</a>
                            }
                                <a onClick={(() => {

                                    item.hiderow = 1;
                                    localStorage.setItem(hiderowKey, item.hiderow);
                                    this.setState({ data: { ...this.state.data } })
                                }).bind(this)}>[ Hide ]</a>
                            </section>

                        </td>
                    </tr>
                })
                }
            </tbody>);

        }
    }

    render() {
        const $this = this;
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
                <br>
                </br>
                <br>
                </br>
                <section>
                    <LineChart
                        width={1200}
                        height={400}
                        ticks={100}
                        yMin={-5}
                        pointRadius={4}
                        data={this.state.chartdata}
                        xParser={(x) => {

                            return x;
                        }}
                        yLabel={"votes"}
                        xLabel={"ID"}
                        xDisplay={(x) => {

                            if (x % 1 == 0 && $this.state.chartdata[0].points) {
                                console.log($this.state.chartdata[0].points[x - 1].id)
                                //return $this.state.chartdata[0].points[x-1].id;
                                return x;
                            }
                        }}
                        interpolate={"cardinal"}
                        showLegends={true}
                        labelClass={"svg-line-chart-label"}
                    />


                </section>
            </div>
        );
    }


}

export default withRouter(Home);

function updateValueFromLocalStorage(item) {
    const lessKey = item.objectID + "less";
    const voteKey = item.objectID + "vote";
    const hiderowKey = item.objectID + "hide";
    if (localStorage.hasOwnProperty(lessKey)) {
        item.show = localStorage.getItem(lessKey);
    }
    if (localStorage.hasOwnProperty(hiderowKey)) {
        item.hiderow = localStorage.getItem(hiderowKey);
    }

    if (localStorage.hasOwnProperty(voteKey)) {
        item.votecount = parseInt(localStorage.getItem(voteKey));
    }
    return { voteKey, lessKey, hiderowKey };
}
