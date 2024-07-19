import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type DrawerTableContextType<T> = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit?: (values: any) => void;
  data?: T;
};

const DrawerTableContext = createContext<DrawerTableContextType<any> | null>(
  null
);

export default function DrawerTableContextProvider<T>({
  children,
  ...restProps
}: {
  children: ReactNode;
} & DrawerTableContextType<T>) {
  return (
    <DrawerTableContext.Provider value={{ ...restProps }}>
      {children}
    </DrawerTableContext.Provider>
  );
}

export const useDrawerTableContext = () => {
  const context = useContext(DrawerTableContext);
  if (context === null) {
    throw new Error("Context must be used inside the DrawerTableProvider");
  }

  return context;
};
