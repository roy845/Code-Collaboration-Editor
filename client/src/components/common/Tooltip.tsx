import React, { useState, ReactNode } from "react";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  className,
}): JSX.Element => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        className="cursor-pointer"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </div>
      {visible && (
        <div
          className={`absolute z-10 p-2 bg-gray-700 text-white text-sm rounded shadow-lg ${className}`}
          style={{ top: "100%", left: "50%", transform: "translateX(-50%)" }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
