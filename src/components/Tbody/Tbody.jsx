import React from "react";
import "./Tbody.css";
import Cookies from "universal-cookie";

const iconPath = `${process.env.PUBLIC_URL}/assets/icons/`;

const Tbody = ({ ques, cState }) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const checkboxHandler = (checkbox) => {
    const target = checkbox.currentTarget;
    const payload = {
      id: target.id,
      currStatus: target.checked,
    };
    console.log(payload);
    fetch(`https://leetcode-app-backend.herokuapp.com/api/status`, {
      method: "post",
      credentials: 'include',
      headers: { "Content-Type": "application/json", "token": token },
      body: JSON.stringify(payload),
    }).then(cState(payload));
  };

  return (
    <tr className={ques.done ? "done" : null}>
      <td className="qid">
        <input
          type="checkbox"
          checked={ques.done}
          id={ques.id}
          onChange={(checkbox) => {
            checkboxHandler(checkbox);
          }}
        ></input>
      </td>
      <td className="qname">{ques.name}</td>
      <td className="qlink">
        <a href={ques.url}><img src={`${iconPath}link.png`} alt="link" /></a>
      </td>
      <td className="qpatterns">{ques.pattern.map((pattern)=>{return <span className="pattern">{pattern}</span>})}</td>
      <td><span className={ques.difficulty.toLowerCase()}>{ques.difficulty}</span></td>
      <td className="qcomp">{ques.companies.map((company)=>{return (<img
                    key={company}
                    title={company}
                    src={`${iconPath}${company}.png`}
                    alt={company}
                    data-tip={company}
                  />)})}</td>
    </tr>
  );
};

export default Tbody;
