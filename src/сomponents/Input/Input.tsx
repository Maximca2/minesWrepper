import React from 'react';

import clsx from 'clsx';
import style from './style.module.scss'

interface InputProps{
    type?:string
    styles?:string,
    placeholder?:string,
    
    id?:string,
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void

  }

const Input = ({styles,type,...someProps}:InputProps) => {
    return (
        <div>
            <input  className={clsx(style.defInputClass,styles)} autoComplete=' ' {...someProps}/>
        </div>
    );
};

export default Input;