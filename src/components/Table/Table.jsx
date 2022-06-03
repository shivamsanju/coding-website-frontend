import "./Table.css";
import React, { useState, useEffect } from "react";
import Tbody from "../Tbody/Tbody";

const Table = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${process.env.BACKEND_URL}api/questions`)
      .then((response) => response.json())
      .then((json) => {
        setData(json.questions);
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
  };
  return (
    <div className="con">
      <table className="table">
        <tbody>
          <tr>
            <td>Status</td>
            <td>Name</td>
            <td>Link</td>
            <td>Pattern</td>
            <td>Difficulty</td>
            <td>Companies</td>
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
