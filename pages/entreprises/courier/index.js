import Extern from './Extern';
import Intern from './Intern';
import { ProgressSpinner } from "primereact/progressspinner";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function Courier(){
  const [Loading, setLoading] = useState(true);

  const router = useRouter();
  useEffect(() => {
    const isAuth =
      typeof window !== "undefined"
        ? window.localStorage.getItem("isAuth")
        : false;
    if (!isAuth) {
      router.push("/auth/login");
    } else if (isAuth) {
      setLoading(false);
    }
  }, []);

  if (Loading) {
    return (
      <div
        className=" absolute flex bg-white justify-content-center align-items-center top-0 left-0 bottom-0 right-0  bg-blue-900 "
        style={{ zIndex: "1000" }}
      >
        <ProgressSpinner />
      </div>
    );
  }

  return(
    <div>
      <Extern/>
      <Intern/>
    </div>
  )
}