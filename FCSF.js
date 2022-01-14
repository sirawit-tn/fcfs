import React, { useEffect } from "react";

import './App.css';

const App = () => {
  const [get_fcfs, set_fcfs] = React.useState([
  ]);

  const [get_arrival, set_arrival] = React.useState(0);
  const [get_burst, set_burst] = React.useState(0);
  const [get_priory, set_priory] = React.useState(0);
  const [get_rgb,set_rgb] = React.useState([])

  const insertdata = () => {
    set_fcfs([
      ...get_fcfs,
      {
        ps: "P" + +(get_fcfs.length + 1),
        arrival: get_arrival,
        burst: get_burst,
        priory: get_priory,
        rt:get_burst,
        ct:0,
        wt:0,
        tat:0,
        status: 'Ready',
        color_effect:'#'+Math.floor(Math.random()*16777215).toString(16),
        color:"#FFFF00"

      },
    ]);
    
  };

  useEffect(() => {
    cloneArray();
  }, [get_fcfs]);

  const cloneArray = (randomColor) => {
    set_rgb([...get_fcfs]);
  };
  const deldata = (dps) => { 
    set_fcfs(get_fcfs.filter(({ps}) => ps !== dps));
  };

  const calculate = () => {    
    
      const interval = setInterval(() => { //กำหนดระยะเวลาการทำงานแบบต่อเนื่องตลอด ตามระยะเวลาที่เราระบุ
        const minarrival = get_fcfs
          .filter(({ rt }) => rt !== 0)
          .map((e) => e.arrival);
         
        const minrun = get_fcfs
          .filter(({ rt }) => rt !== 0)
          .map((e) => e.arrival);
         
        const maxburst = get_fcfs
          .map((e) => e.ct);
         
        set_fcfs(
          get_fcfs.map((x) => {
           
            console.log("x");
            console.log(Math.min(...minarrival));
            console.log(x.ps);
  
            if (Math.min(...minarrival) === Infinity) {
              clearInterval(interval);
            }
            // get_fcfs.filter(({ balance }) => balance === "P1"
            if(get_fcfs.filter(({rt}) => rt === 0).length>0){
              if(x.rt > 0 ){
              
                x.status = 'Waiting'
              
              }              
              if (x.arrival === Math.min(...minrun)) {
                if(get_fcfs.length > 0){
                  x.color ={
                    width: x.tat / (15 / 50) + "%",
                    height: "50px",
                    background: x.color_effect,
                    transition: "width 2s"
                  }
                }
                
              // จำนวนที่ต้องการ = จำนวนทั้งหมด/100 %
                if (x.rt > 0) {
                  
                  x.status = 'Running'
                  
                  if (x.rt === 1 ) {
                    
                    x.status = 'Terminated'

                    x.checkcolor = true;
                    x.ct = +(Math.max(...maxburst)) + +(x.burst)
                     x.tat = x.ct
                     x.wt = x.tat - x.burst - x.arrival
                    // x.wt = x.tat - x.burst
                    console.log(maxburst);
                  }
                                   
                  x.rt = x.rt - 1;
                 
                }
                              
              }
  
            }else{
              
                x.status = 'Waiting'
              
              if (x.arrival === Math.min(...minarrival)) {
                if(get_fcfs.length > 0){
                x.color ={
                  width: x.tat / (15 / 50) + "%",
                  height: "50px",
                  background: x.color_effect,
                  transition: "width 2s"
                }
              }

                
                if (x.rt > 0) {
                  x.status = 'Running'

                  if (x.rt === 1) { //ทำงานเสร็จ
                    x.status = 'Terminated'
                    x.checkcolor = true;
                    x.ct = x.burst
                    x.tat = x.ct
                    x.wt = x.tat - x.burst - x.arrival
  
                  }
                                    
                  x.rt = x.rt - 1;
                 
                }
                               
              }
              
            }
            return x;
            // console.log(get_fcfs.filter(({balance}) => balance === 0));
                                  
          })
        );
      }, 1000);
    };
 
    let total_wt = 0   //การหาค่าผลรวมและค่าเฉลี่ย
    let total_tat = 0
    let avg_wt = 0
    let avg_tat = 0

    if(get_fcfs.length >0){
      total_wt = get_fcfs
      .map(({wt}) =>wt)
      .reduce((wt,a) => wt + a); 
     
      total_tat = get_fcfs
      .map(({tat}) =>tat)
      .reduce((tat,t) => tat +t)
      
      avg_wt = total_wt / get_fcfs.length
      avg_tat = total_tat / get_fcfs.length
    }
    
    let base = {
      width:"100%",
      height:"100%",
      backgroundColor:"rgba(255, 248, 248, 0.849)",
      align:'center'
    }
    
    let font1 ={
      color: "  rgb(9, 160, 9)"
    }
    let font2 ={
      color: " rgb(247, 77, 65)"
    }
    
        
  return (
   < >
 <div className="container" style={base} >
   
   
      <center><h1>Frist come Frist serve</h1></center>
   

      <table class="table table-hover">
        <thead class="thead-dark">
          <tr >
            <th scope="col">Process</th>
            <th scope="co1">Status</th>
            <th scope="col">Arrival time(ms)</th>
            <th scope="col">Burst time(ms)</th>
            <th scope="col">Running</th>           
            <th scope="col">Turnaround time</th>
            <th scope="col"></th>
            <th scope="col">Waiting time</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>

          {get_fcfs.map(
            ({ ps, arrival, burst,rt,ct, tat,wt,status,color_effect }) => (
              <tr>
                <th scope="row" style={{background:color_effect}}>{ps}</th>

                <td>{status}</td>
                <td>{arrival}</td>
                <td>{burst}</td>
                <td>{rt}</td>
                <td>{tat}</td>
                <td></td>
                <td>{wt}</td>
                <td></td>
               
                <td><button class="btn btn-outline-danger" onClick={() => deldata(ps) }>
                <svg class="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clip-rule="evenodd"/>
                  <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clip-rule="evenodd"/>
                </svg>
                &nbsp;Delete</button></td>
              </tr>
            )
          )}
          <tr>

          </tr>
          <tr align="center" >

            <td>

            </td>
            <td colspan = "3">
              <input type="text" 
                defaultValue={get_arrival}
                onChange={(e) => set_arrival(parseFloat(e.target.value))}
                
              />
            </td>
            <td colspan = "3">
              <input type="text"
                defaultValue={get_burst}
                onChange={(e) => set_burst(parseFloat(e.target.value))}
                align="center"
              />
            </td>
            <td colspan = "2">      
              <button onClick={insertdata} type="button" class="btn btn-outline-primary"><right>
              <svg class="bi bi-plus-square" width="1.1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/>
              <path fill-rule="evenodd" d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z" clip-rule="evenodd"/>
              <path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>
              </svg>
              &nbsp;Add Process</right></button>
            </td>
           
            <td><button class="btn btn-outline-success " onClick = {calculate}>
              <svg class="bi bi-check" width="2em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>
              </svg>
              &nbsp;Run</button>
              
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tr>
          <td><h6 style={font1}>Total waiting time   :  {total_wt}</h6></td>
          <td><h6 style={font1}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Average waiting time :  {avg_wt}</h6></td>
        </tr>
        <tr>
          <td> <h6 style={font2}> Total turnaround time :    {total_tat}</h6></td>
          <td><h6 style={font2}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Average turnaround time :  {avg_tat}</h6> </td>
        </tr>
        </table>
    </div>
    <div align="center">
   {get_rgb
   .filter(({tat}) => tat>0)
   .sort((a,b) => a?.tat - b?.tat)
   .filter(({color}) => Object.keys(color).length>0)
   .map((e) => {
     return <div  style={ e.color}></div>;
   })}
   </div>
   </>
  );
}

export default App;