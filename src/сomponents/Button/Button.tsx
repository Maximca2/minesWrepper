import React from 'react';
import { NavLink } from "react-router-dom";
import { mockedFunction } from 'helpers';
import './style.scss'

type ButtonProps = {
    styles: string,
    value: string,
    to:string,
    onClick: typeof mockedFunction 
  }

const Button = ({ styles, value, to ,onClick}:ButtonProps) => {
    if (to) {
        return (
          <NavLink onClick={onClick}  className={`button ${styles}`} to={to}>
            {value}
          </NavLink>
        );
      }
      return <button onClick={onClick} className={`button ${styles}`}>{value}</button>;
};

export default Button;