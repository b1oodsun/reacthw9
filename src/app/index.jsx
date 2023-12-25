import React, { useEffect } from "react";
import Button from "../components/button";
import styles from "./styles.module.scss";
import { useState } from "react";
import CustomSelect from "../components/select";
import Input from "../components/input";
import { API, REQUEST_HEADERS } from "../api/endpoints";



function App() {


  const [amount, setAmount] = useState('')
  const [fromOption, setFromOption] = useState(null);
  const [toOption, setToOption] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const [isDisabled, setIsDisabled] = useState(false)
  const [symbolsOptions, setSymbolsOptions] = useState([])
  const [result, setResult] = useState({
    amount: '',
    result: '',
    from: '',
    to: ''
  })




  const handleConvertCurrency = async () => {

    if (!amount || !toOption || !fromOption) {
      return;
    }
    try {
      setIsDisabled(true)
      setIsLoading(true)
      const res = await fetch(API.CURRENCY.convert(toOption.value, fromOption.value, amount), REQUEST_HEADERS);
      const data = await res.json();
      setResult({
        amount: data.query.amount,
        result: data.result,
        from: data.query.from,
        to: data.query.to,
      });
    } catch (error) {
      console.error("Error converting currency:", error);
    } finally {
      setIsDisabled(false)
      setIsLoading(false)
    }
  };

  const handleSwitchClick = () => {
    setFromOption(toOption);
    setToOption(fromOption);
  }


  const getSymbols = async () => {
    const res = await fetch(API.CURRENCY.symbols, REQUEST_HEADERS)
    const data = await res.json()
    return data.symbols
  }
  const transformSymbolsDataToOptions = (symbolsObj) => {
    return Object.keys(symbolsObj).map(item => {
      return {
        value: item,
        label: item
      }
    })
  }



  useEffect(() => {
    (async () => {
      try {
        setIsDisabled(true)
        const symbols = await getSymbols()
        const options = transformSymbolsDataToOptions(symbols)

        setSymbolsOptions(options)
      } catch (error) {
        console.error("Error loading symbols:", error);
      } finally {
        setIsLoading(false);
        setIsDisabled(false)
      }
    })()
  }, [])


  return (
    <div>
      {isLoading ? (
        <div className={styles["center-loader"]}>
           <span className={styles["loader"]}></span>
        </div>
      ) : ( 
        <div className={styles["currency-converter-wrap"]}>
      <span className={styles["title"]}> Currency Converter</span>
      <Input
        className={styles['forms-input']}
        onChange={e => setAmount(e.target.value)}
      />
      <div className={styles["Selects"]}>
        <CustomSelect
          label="From"
          value={fromOption}
          onChange={(val) => setFromOption(val)}
          options={symbolsOptions}
        />
        <div className={styles["icon"]} onClick={handleSwitchClick}>
          <img src="https://cdn-icons-png.flaticon.com/512/7133/7133490.png" alt="swap-icon" className={styles["swap-icon"]} />
        </div>
        <CustomSelect
          label="To"
          value={toOption}
          onChange={(val) => setToOption(val)}
          options={symbolsOptions}
        />
      </div>
      <span>Result</span>
      <span className={styles[result]}>
        {result && `${result.amount} ${result.from} = ${result.result} ${result.to}`}
      </span>

      <Button
        onClick={handleConvertCurrency}
        className={styles["convert-btn"]}
        disabled={!amount || !fromOption || !toOption || isDisabled}
      >
        {isLoading ? <span>Please wait...</span> : <span>Get Exchange Rate </span>}
      </Button>

    </div>
      )}
    </div>
    
  );
}

export default App;
