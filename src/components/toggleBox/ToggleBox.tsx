import React, {useEffect, useRef, useState } from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

interface IToggleBox {
  title: React.ReactNode;
  children: React.ReactNode;
  isOpen?:boolean;
}
const ToggleBox = ({ title, children,isOpen }: IToggleBox) => {
  const [isBoxVisible, setIsBoxVisible] = useState(isOpen);
  const [childHeight, setChildHeight] = useState<number>(50);
  const boxRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (childRef.current) {
        setChildHeight(childRef.current.scrollHeight);
      }
    });

    if (boxRef.current) {
      observer.observe(boxRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      });
    }

    if (childRef.current) {
      setChildHeight(childRef.current.scrollHeight);
    }

    return () => {
      observer.disconnect();
    };
  }, [children]);

  const handleToggleBox = () => {
    const box = boxRef.current;

    if (box) {
      if (isBoxVisible) {
        // Animate to close
        box.style.height = `${childHeight + 50}px`;

        requestAnimationFrame(() => {
          box.style.height = `50px`;
        });
      } else {
        // Animate to open
        box.style.height = `50px`;

        requestAnimationFrame(() => {
          box.style.height = `${childHeight + 50}px`;
        });
      }
    }

    setIsBoxVisible(!isBoxVisible);
  };

  return (
    <div
      className={`flex   flex-col bg-white   rounded-md  cursor-pointer border overflow-hidden transition-[height] duration-500 ease-in-out `}
      ref={boxRef}
      style={{
        height: isBoxVisible ? childHeight + 50 : "50px",
      }}
    >
      <div
        onClick={() => handleToggleBox()}
        className={`flex justify-between w-full px-2 shrink-0 items-center h-[50px] cursor-pointer transition-all  duration-1000 ease-in-out
                ${isBoxVisible ? " border-b-0" : "border-b-2"}`}
      >
        <span className="text-sm font-semibold w-full  ">{title}</span>
        <span
          className={`text-gray-400 transform transition-transform duration-500 ease-in-out ${
            isBoxVisible ? "-rotate-180" : "rotate-0"
          }`}
        >
          <ExpandMoreRoundedIcon fontSize="small" />
        </span>
      </div>
      <div ref={childRef} >
        {children}
      </div>
    </div>
  );
};

export default ToggleBox;
