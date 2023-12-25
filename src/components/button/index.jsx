import React from "react";
import styles from './styles.module.scss'
import clsx from "clsx";

const Button =(props) =>{
    const{
        children,
        className,
        type = 'button',
        onClick,
        disabled
    } = props
    const mainClasses = clsx(
        styles.button,
            className,
            disabled
    )
    return(
            <button onClick={onClick} type={type} className={mainClasses}
            disabled={disabled}
            >
               {children}
            </button>
        
    )
}
export default Button;