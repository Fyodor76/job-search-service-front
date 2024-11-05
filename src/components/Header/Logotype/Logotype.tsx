import React from "react";
import cn from "classnames";

interface LogotypeProps {
  className?: string;
}

const Logotype: React.FC<LogotypeProps> = ({ className }) => {
  return (
    <div className={cn("logotype", className)}>
        <p>Logotype</p>
    </div>
  )
};

export default Logotype;