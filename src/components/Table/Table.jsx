import "./Table.css";
import React, { useState, useEffect } from "react";
import Tbody from "../Tbody/Tbody";
import Cookies from "universal-cookie";

const Table = ({progress}) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(token)
    fetch(`https://leetcode-app-backend.herokuapp.com/api/questions`,{
      credentials: 'include',
      headers: { "Content-Type": "application/json", "token": token },
      method: 'GET'
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.questions){
          console.log("questions --> ",json.questions)
          setData(json.questions);
          progress(json.questions);
        }
      });
  }, []);

  const checkBoxState = (q) => {
    data.forEach((p) => {
      if (p.id.toString() === q.id) {
        console.log(p.done, q.currStatus);
        p.done = q.currStatus;
        console.log(p.done, q.currStatus);
        console.log("changed");
      }
    });
    setData([...data]);
    progress([...data]);
  };
  return (
    <div className="con">
      <table className="table">
        <tbody>
          <tr>
            <td>Status</td>
            <td>Id</td>
            <td>Name</td>
            <td>Link</td>
            <td>Pattern</td>
            <td>Difficulty</td>
            <td>Companies</td>
            <td>Hint</td>
          </tr>
          {data.map((ques) => {
            return <Tbody key={ques.id} ques={ques} cState={checkBoxState} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
