import type { ButtonHTMLAttributes } from "react";

export interface Iprops extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: "submit" | "reset" | "button";
  className: string;
}
export default function Buton({ className, ...rest }: Iprops) {
  return (
    <>
      <button className={className} {...rest}></button>
    </>
  );
}
