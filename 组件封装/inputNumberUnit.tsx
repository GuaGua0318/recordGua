//根据antd的InputNumber组件二次封装而来
//在某些场景在输入了很长一段数字的时候需要添加单位为了方便阅读，
//在InputNumber组件中虽然有后缀来添加单位但是往往需要在输入框中就添加单位

import { Input, InputNumber } from "antd";
import React, { useState } from "react";

const InputNumberUnit = (props) => {
  const [number, setNumber] = useState<number | string>();

  //输入
  const onInput = (number) => {
    setNumber(number);
  };
  //取消焦点进行单位计算
  const onBlurUnit = () => {
    if (Number(number) >= 10000 && Number(number) < 100000000) {
      setNumber(`${Number(number) / 1000}万`);
    }
    if(Number(number) >= 100000000 && Number(number) < 1000000000000){
      setNumber(`${Number(number) / 10000}亿`)
    }
  };
  //获取焦点清除单位
  const onFoucus = () => {
    if (number?.toString().includes("万")) {
      // setNumber(Number(val.splice(val.length - 1,1)) * 1000)
      setNumber((number?.toString()).slice(0,number?.toString().length - 1) * 10000)
    } else if(number?.toString().includes("亿")){
      setNumber((number?.toString()).slice(0,number?.toString().length - 1) * 100000)
    }else{
      setNumber(number);
    }
  };

  return (
    <div>
      <InputNumber
      controls={false}
        onFocus={() => {
          onFoucus(number);
        }}
        value={number}
        onChange={(val) => {
          onInput(val);
        }}
        onBlur={() => {
          onBlurUnit();
        }}
      />
    </div>
  );
};

export default InputNumberUnit;
