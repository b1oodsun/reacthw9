import React from "react";
import styles from './styles.module.scss'
const Input = (props) =>{
    const{
        className,
        onChange,
        value,
        label,
        disabled,
        type='number'
    } = props
    return(
        <div className={styles['input-wrap']}>
            
             <span className={styles['label']}>Enter Amount</span>
            <input 
            className={className}
            onChange={onChange}
            value={value}
            disabled={disabled}
            label={label}
            placeholder="Write a number..."
            type={type} 
            />
        </div>
    )
}
export default Input;