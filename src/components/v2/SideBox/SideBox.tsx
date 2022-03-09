import React, { useEffect, useState } from "react";
import "./SideBox.scss";

interface SideBarProps {
  msg?: string;
  className?: string;
}

export type { SideBarProps };

const SideBar = (props: SideBarProps): JSX.Element => {
  const { msg = "HI", className } = props;

  const [value1, setValue1] = useState("VALUE 1");
  const [value2, setValue2] = useState("VALUE 2");
  const [value3, setValue3] = useState("VALUE 3");

  useEffect(() => {
    console.log("Effect");
  }, [value1, value2]);

  const clickHandler1 = () => {
    setValue1((prevState) => prevState + "VALUE 1");
  };
  const clickHandler2 = () => {
    setValue2((prevState) => prevState + "VALUE 2");
  };
  const clickHandler3 = () => {
    setValue3((prevState) => prevState + "VALUE 3");
  };

  return (
    <div className="sidebar">
      <p>#TEST useEffect 🛠</p>
      <p onClick={clickHandler1}>{value1}</p>
      <p onClick={clickHandler2}>{value2}</p>
      <p onClick={clickHandler3}>{value3}</p>
      <p>#TEST Props 🛠</p>
      <p className={className}>{msg ? msg : ""}</p>
    </div>
  );
};

export default SideBar;
