import React from "react";
import "./Table.module.css";
import { useState } from "react";

const Table = ({ header, body, changeBody }) => {
  const changeTable = (b) => {
    const newBody = body.filter((body) => body !== b);
    changeBody(newBody);
  };
  return (
    <table>
      <thead>
        <tr>
          {header.map((header) => (
            <th key={header.key}>{header.name}</th>
          ))}
          <th>{""}</th>
        </tr>
      </thead>
      <tbody>
        {body.map((b) => (
          <tr>
            {header.map((header) => (
              <td key={header.key}>{String(b[header.key])}</td>
            ))}
            <td>
              {" "}
              <button onClick={() => changeTable(b)}>{"Delete"}</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
