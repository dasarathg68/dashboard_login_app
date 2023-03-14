import './dashboard.css';
import React, {useState} from 'react';
import Row from '../widget/row';
import moment from "moment";
import leftAr from "../assets/arrow-left.png";
import calendar from "../assets/calendar.png";
import rightAr from "../assets/arrow-right.png";
import styled from "styled-components";
import {IconButton, Paper, Tooltip} from "@material-ui/core";
import axios from "axios";
import face1 from "../assets/level1.png";
import face2 from "../assets/level2.png";
import face3 from "../assets/level3.png";
import face4 from "../assets/level4.png";
import BtnRound from "../widget/btn_round";
import PadChart from "../widget/pad_chart";

let init = 0;
//const url = window.location.href;
//let arr = url.split("/");
// let location_url = arr[0] + "//" + arr[2]+"/dev/wellbeing";
// let location_url = "http://localhost:8080/dev/active";
let location_url = "https://tnar265kz4.execute-api.us-west-2.amazonaws.com/dev/wellbeing";

const DashBoardPage = () => {


    let [date = moment(new Date()).add(-1, 'days').toDate(), setDate] = useState();
    let [data = [], setData] = useState();

    if (init < 2) {
        getAPI().then();
        init++;
    }

    function dateChange (dir) {
        if (dir === 0) {
            setDate(date = moment(date).add(-1, 'days').toDate());
        } else {
            setDate(date = moment(date).add(1, 'days').toDate());
        }
    }

    const getChartDataSet = (dataSet) => {
        return ({
            datasets: [
                {
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.7)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: dataSet.data,
                    backgroundColor: dataSet.color,
                    weights: dataSet.weight,
                    hover: "false",
                },
            ],
            labels: dataSet.label,
        });
    };

    async function getAPI () {
        let params = {
            headers: {
                'Content-Type': 'application/json',
            },
            response: false,
            params: {
                date: moment(date).format('YYYY/MM/DD'),
            },
        }
        await axios.get(location_url, params)
            .then(res => {
                console.log("test data", res.data);
                // setData(data = res.data);
                setData(data = [{
                    "date": "2023/03/08",
                    "Id": "Home2001",
                    "Status": 1,
                    "UserInput": 1,
                    "VitalSign": 0,
                    "WhizPad": 1,
                    "ActiveScore": 2,
                    "Regularity": 3,
                    "VSlevels": {"bloodPressure_sys": 0, "bloodGlucose": 0},
                    "rawVS": {
                        "bloodGlucoseBase": 0,
                        "bloodPressureBase": 0,
                        "bloodPressure_sys": 0,
                        "bloodGlucose": 0,
                    },
                    "WPlevels": {
                        "inbedtimeHour": 0,
                        "correlation": 0,
                        "sleeptimeHour": 0,
                        "sleepEfficiency": 0,
                        "pressuretimeHour": 0
                    },
                    "rawWP": {
                        "sleeptimeNorm": 0,
                        "inbedtimeHour": 0,
                        "correlation": 0,
                        "inbedtimeNorm": 0,
                        "sleepEfficiency": 0,
                        "pressuretimeHour": 0,
                        "sleeptimeHour": 0
                    },
                    "ASlevel": 2,
                    "rawAS": 35,
                    "Regularitylevels": {"low": 1, "medium": 2, "high": 3},
                    "rawRegularity": {
                        "low": 45.24,
                        "medium": 66.66,
                        "high": 87.88
                    }
                }])
            })
        console.log("myData", data);
    }

    const dayStatus = (status,
                       UserInput,
                       VitalSign,
                       WhizPad,
                       ActiveScore,
                       Regularity,
                       VSlevels,
                       WPlevels,
                       ASlevel,
                       Regularitylevels,
                       rawVS,
                       rawWP,
                       rawAS,
                       rawRegularity,) => {

        const displayColor = (num) => {
            if (num === -1) {
                return '#dddddd'
            } else if (num === 0) {
                return '#333333'
            } else if (num === 1) {
                return '#58a878'
            } else if (num === 2) {
                return '#5b9bd5'
            } else if (num === 3) {
                return '#d97172'
            } else if (num === 4) {
                return '#632039'
            } else {
                return '#FFFFFF'
            }
        }

        const displayTTColor = (num) => {
            if (num === 0) {
                return '#ffffff'
            } else if (num === 1) {
                return '#88d8a8'
            } else if (num === 2) {
                return '#8bcbff'
            } else if (num === 3) {
                return '#ffa1a2'
            } else if (num === 4) {
                return '#f33039'
            } else {
                return '#FFFFFF'
            }
        }

        const displayText = (num) => {
            if (num === -1) {
                return '暫無紀錄'
            } else if (num === 0) {
                return '當日離床'
            } else if (num === 1) {
                return '狀況良好'
            } else if (num === 2) {
                return '大致正常'
            } else if (num === 3) {
                return '需要注意'
            } else if (num === 4) {
                return '狀況異常'
            } else {
                return ''
            }
        }

        const BtnColor = (colorCode) => {

            if (colorCode === -1) {
                return '#dddddd'
            } else if (colorCode === 0) {
                return '#777777'
            } else if (colorCode === 1) {
                return '#58a878'
            } else if (colorCode === 2) {
                return '#5b9bd5'
            } else if (colorCode === 3) {
                return '#d97172'
            } else if (colorCode === 4) {
                return '#632039'
            } else {
                return '#dddddd'
            }
        }

        const FaceIc = (faceCode) => {

            if (faceCode === 1) {
                return face1
            } else if (faceCode === 2) {
                return face2
            } else if (faceCode === 3) {
                return face3
            } else if (faceCode === 4) {
                return face4
            } else {
                return null
            }
        }

        return (
            <>
                <DashboardItem style={{justifyContent: 'center'}}>
                    <BtnRound
                        width={`140px`}
                        btncolor={displayColor(status)}>
                        <div style={{color: '#ffffff'}} className="Padding">{displayText(status)}</div>
                    </BtnRound>
                </DashboardItem>
                <DashboardItem style={{justifyContent: 'center'}}>
                    <span>
                        <img className="UserIc" src={FaceIc(UserInput)}/>
                    </span>
                </DashboardItem>
                <DashboardItem style={{justifyContent: 'center'}}>
                    <Tooltip title={
                        <h2>
                            <div
                                style={{color: displayTTColor(VSlevels.bloodGlucose)}}>血糖:&nbsp;&nbsp;{rawVS.bloodGlucose} &nbsp;&nbsp; mg/dl<br></br><br></br>
                            </div>
                            <div
                                style={{color: displayTTColor(VSlevels.bloodPressure_sys)}}>收縮壓:&nbsp;&nbsp;{rawVS.bloodPressure_sys} &nbsp;&nbsp;mm/Hg<br></br><br></br>
                            </div>
                        </h2>}>
                            <span>
                                <BtnRound
                                    className="BtnText"
                                    width={`50px`}
                                    btncolor={BtnColor(VitalSign)}>
                                <div style={{color: '#ffffff'}}>VS</div>
                                </BtnRound>
                            </span>
                    </Tooltip>
                </DashboardItem>
                <DashboardItem style={{justifyContent: 'center'}}>
                    <div className="MarginSide">
                        <Tooltip title={
                            <h2>
                                <div
                                    style={{color: displayTTColor(WPlevels.inbedtimeHour)}}>臥床時間:&nbsp;&nbsp;{rawWP.inbedtimeHour}&nbsp;&nbsp;hrs<br></br><br></br>
                                </div>
                                <div
                                    style={{color: displayTTColor(WPlevels.pressuretimeHour)}}>久壓時間:&nbsp;&nbsp;{rawWP.pressuretimeHour}&nbsp;&nbsp;hrs<br></br><br></br>
                                </div>
                                <div
                                    style={{color: displayTTColor(WPlevels.sleeptimeHour)}}>睡眠時間:&nbsp;&nbsp;{rawWP.sleeptimeHour} &nbsp;&nbsp;hrs<br></br><br></br>
                                </div>
                                <div
                                    style={{color: displayTTColor(WPlevels.sleepEfficiency)}}>睡眠效率:&nbsp;&nbsp;{rawWP.sleepEfficiency}
                                    <br></br><br></br></div>
                                <div
                                    style={{color: displayTTColor(WPlevels.correlation)}}>相關係數:&nbsp;&nbsp;{rawWP.correlation}
                                    <br></br><br></br></div>
                            </h2>}>
                        <span>
                            <BtnRound
                                className="BtnText"
                                width={`50px`}
                                btncolor={BtnColor(WhizPad)}>
                                <div style={{color: '#ffffff'}}>SS</div>
                            </BtnRound>
                        </span>
                        </Tooltip>
                    </div>
                </DashboardItem>
                <DashboardItem style={{justifyContent: 'center'}}>
                    <div className="MarginSide">
                        <Tooltip title={
                            <h2>
                                <div
                                    style={{color: displayTTColor(ASlevel)}}>當日活躍分數:&nbsp;&nbsp;{rawAS}
                                    <br></br><br></br></div>
                            </h2>}>
                        <span>
                            <BtnRound
                                className="BtnText"
                                width={`50px`}
                                btncolor={BtnColor(ActiveScore)}>
                            <div style={{color: '#ffffff'}}>AS</div>
                        </BtnRound>
                        </span>
                        </Tooltip>
                    </div>
                </DashboardItem>
                <DashboardItem style={{justifyContent: 'center'}}>
                    <div className="MarginSide">
                        <Tooltip title={
                            <h2>
                                <div
                                    style={{color: displayTTColor(Regularitylevels.medium)}}>均標:&nbsp;&nbsp;{rawRegularity.medium}
                                    <br></br><br></br></div>
                                <div
                                    style={{color: displayTTColor(Regularitylevels.high)}}>高標:&nbsp;&nbsp;{rawRegularity.high}
                                    <br></br><br></br></div>
                                <div
                                    style={{color: displayTTColor(Regularitylevels.low)}}>低標:&nbsp;&nbsp;{rawRegularity.low}
                                    <br></br><br></br></div>
                            </h2>}>
                        <span>
                            <BtnRound
                                className="BtnText"
                                width={`50px`}
                                btncolor={BtnColor(Regularity)}>
                            <div style={{color: '#ffffff'}}>RE</div>
                        </BtnRound>
                        </span>
                        </Tooltip>
                    </div>
                </DashboardItem>
            </>
        );
    }

    return (
        <>
            <div className="AppBar">
                <Row style={{textAlign: 'right'}}>
                    <h3 className="AppBarTitle">健康狀態儀表板</h3>
                    <h3 className="AppBarSet"></h3>
                    <div className="AppBarSet">管理</div>
                    <span className="AppBarSet">設定</span>
                    <span className="AppBarSet"><a className="AppBarSet"
                                                   href="https://designer.mech.yzu.edu.tw/">語言</a></span>
                </Row>
            </div>
            <div className="Content">
                <DatePickerWrapper>
                    <SvgIconButton onClick={() => {
                        dateChange(0);
                        setData(data = []);
                        getAPI();
                    }}>
                        <img className="Icon" src={leftAr}/>
                    </SvgIconButton>
                    <span className="TextDesc" style={{marginLeft: `5px`, marginRight: `5px`}}>
                    <span className="TextNum">{date.getFullYear()}</span>&nbsp;{'/'}&nbsp;
                        <span className="TextNum">{date.getMonth() + 1}</span>&nbsp;{'/'}&nbsp;
                        <span className="TextNum">{date.getDate()}</span>&nbsp;{''}
                    </span>
                    <SvgIconButton style={{marginRight: `10px`}} onClick={() => {
                    }}>
                        <img className="Icon" src={calendar}/>
                    </SvgIconButton>
                    <SvgIconButton onClick={() => {
                        dateChange(1);
                        setData(data = []);
                        getAPI();
                    }}>
                        <img className="Icon" src={rightAr}/>
                    </SvgIconButton>
                </DatePickerWrapper>
                <DashboardTitle>
                    <div>姓名</div>
                    <div>狀態</div>
                    <div>用戶自我評估</div>
                    <div>生理指標</div>
                    <div>睡眠狀態</div>
                    <div>活躍度</div>
                    <div>規律性</div>
                </DashboardTitle>
                {/*<DashBoardPage/>*/}
                {/**todo 資料格式*/}
                {data.map((item, index) => {
                    let {
                        Id,
                        Status,
                        UserInput,
                        VitalSign,
                        WhizPad,
                        ActiveScore,
                        Regularity,
                        VSlevels,
                        WPlevels,
                        ASlevel,
                        Regularitylevels,
                        rawVS,
                        rawWP,
                        rawAS,
                        rawRegularity,
                    } = item;
                    return (
                        <DashboardCard style={{justifyContent: 'center'}}>
                            <Row height={'100%'} width={'100%'}>
                                <DashboardName>
                                    <div>{Id}</div>
                                </DashboardName>
                                {dayStatus(
                                    Status,
                                    UserInput,
                                    VitalSign,
                                    WhizPad,
                                    ActiveScore,
                                    Regularity,
                                    VSlevels,
                                    WPlevels,
                                    ASlevel,
                                    Regularitylevels,
                                    rawVS,
                                    rawWP,
                                    rawAS,
                                    rawRegularity,
                                )}
                            </Row>
                            <Row width='100%' height='auto' style={{paddingTop: '50px'}}>
                                <PadChart
                                    name='weekPosture'
                                    refresh
                                    data={getChartDataSet(
                                        {
                                            data: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 3, 3, 3, 3, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 2, 1, 1, 1, 1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            color: ['#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB','#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB','#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB','#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB','#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB','#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB','#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB','#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB','#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB','#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB'],
                                            weight: new Array(96).fill(1),
                                            label: [{from: 480, to: 510, state: '用戶持續臥床'},{from: 480, to: 510, state: '用戶持續臥床'},{from: 480, to: 510, state: '用戶持續臥床'},{from: 480, to: 510, state: '用戶持續臥床'},{from: 480, to: 510, state: '用戶持續臥床'},{from: 480, to: 510, state: '用戶持續臥床'},{from: 480, to: 510, state: '用戶持續臥床'},{from: 480, to: 510, state: '用戶持續臥床'},{from: 480, to: 510, state: '用戶持續臥床'},{from: 480, to: 510, state: '用戶持續臥床'}]
                                        }
                                    )}
                                    max={3}
                                    min={0}/>
                            </Row>
                            <Row width='100%' height='auto' style={{paddingTop: '50px'}}>
                                <PadChart
                                    name='posture'
                                    refresh
                                    data={getChartDataSet(
                                        {
                                            data: [0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0],
                                            color: ['#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB','#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB','#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB','#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB','#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB','#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB','#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB','#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB','#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB','#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB', '#87BCEB'],
                                            weight: new Array(96).fill(1),
                                            label: [{from: 480, to: 510, state: '用戶持續臥床'},{from: 480, to: 510, state: '用戶持續臥床'},{from: 480, to: 510, state: '用戶持續臥床'},{from: 480, to: 510, state: '用戶持續臥床'},{from: 480, to: 510, state: '用戶持續臥床'},{from: 480, to: 510, state: '用戶持續臥床'},{from: 480, to: 510, state: '用戶持續臥床'},{from: 480, to: 510, state: '用戶持續臥床'},{from: 480, to: 510, state: '用戶持續臥床'},{from: 480, to: 510, state: '用戶持續臥床'}]
                                        }
                                    )}
                                    max={3}
                                    min={0}/>
                            </Row>
                        </DashboardCard>
                    )
                })}
            </div>
        </>
    );
}

const DatePickerWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SvgIconButton = styled(IconButton)`
  && {
    align-self: center;
    padding: 3px;
  }

  &:focus {
    outline: none;
  }
`;

const DashboardCard = styled(Paper)`
  width: 100%;
  height: 80px;
  margin-bottom: 20px;
  cursor: pointer;

  &&& {
    border-radius: 8px;
  }
`;

const DashboardTitle = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  //justify-content: center;
  text-align: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;

  div {
    flex: 1;
    font-weight: bold;
    font-size: 1.1rem;
  }
`;

const DashboardName = styled.div`
  flex: 1;
  display: flex;
  text-align: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;

  * {
    //padding-left: 30px;
  }

  div {
    font-weight: bold;
    font-size: 1.1rem;
  }

  p {
    margin: 2px 0 0 0;
    font-size: 0.95rem;
    color: #222222;
  }

  @media screen and (max-width: 768px) {
    * {
      padding-left: 10px;
    }
  }
`;

const DashboardItem = styled.div`
  flex: 1;
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: bold;
  font-size: 1.1rem;

  span {
    font-weight: normal;
    font-size: 0.95rem;
    margin: 0 5px 0 5px;
  }

`;

export default DashBoardPage;
