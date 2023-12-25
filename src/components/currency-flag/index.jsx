import React from "react";
import styles from "./styles.module.scss"
import flags from "../../flags";
import styled from "styled-components";

const StyledImgWrap =styled.div`
    height: ${props=>props.$height||10}px;
    width: ${props =>props.$widht||18}px;
`
const CurrencyFlag=(props)=>{
    const {
        currency,
        width,
        height
    }=props
    return(
       <StyledImgWrap $heighgt={height} $width={width} className={styles["currency-flag"]}>
           <img src={flags[currency.toLowerCase()]} alt="currency flag"/>
       </StyledImgWrap>
    )
}
export default CurrencyFlag