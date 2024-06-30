"use client";
import useClickOutside from "@/hooks/useClickOutside";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal, useFormStatus } from "react-dom";

interface ModelContextType {
  openId: string;
  close: () => void;
  open: (id: string) => void;
}

const ModelContext = createContext<ModelContextType | undefined>(undefined);

interface ModelProps {
  children: ReactNode;
}

function Model({ children }: ModelProps) {
  const [openId, setOpenId] = useState<string>("");
  const close = () => setOpenId("");
  const open = (id: string) => setOpenId(id);

  return (
    <ModelContext.Provider value={{ openId, close, open }}>
      <div className="max-sm:flex-1">{children}</div>
    </ModelContext.Provider>
  );
}

interface OpenModelProps {
  id: string;
  children: React.ReactNode;
}

function useModelContext() {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("Model context must be used within a Model provider");
  }
  return context;
}

function OpenModel({ id, children }: OpenModelProps) {
  const { open } = useModelContext();
  const { pending } = useFormStatus();
  function handleClick() {
    open(id);
  }

  return (
    <button disabled={pending} onClick={handleClick} type="button">
      {children}
    </button>
  );
}

interface ContentProps {
  id: string;
  children: (props: { close: () => void }) => React.ReactNode;
  isSuccess?: boolean | undefined;
  deleteModel?: boolean;
}

function Content({ id, children, isSuccess, deleteModel }: ContentProps) {
  const { openId, close } = useModelContext();
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSuccess) {
      close();
    }
  }, [isSuccess, close]);
  useClickOutside([elementRef], () => {
    close();
  });

  if (openId !== id) return null;
  console.log("Exuted");

  return createPortal(
    <div className="fixed z-[100px] w-full h-screen flex-center bg-black/30 backdrop-blur-sm top-0 left-0 animate-model overflow-auto ">
      <div
        ref={elementRef}
        className={` w-[90%] md:w-[70%] max-w-[650px] ${
          !deleteModel && "h-screen-78"
        }  mt-[78px] `}
      >
        {children({ close })}
      </div>
    </div>,
    document.body
  );
}

Model.OpenModel = OpenModel;
Model.Content = Content;

export default Model;
