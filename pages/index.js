import React, { useEffect, useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { useRouter } from "next/router";
import Link from "next/link";
import CreationEffectue from "./Dashboard/CreationEffectue";
import CreationEnCours from "./Dashboard/CreationEnCours";
import CreationEnRetard from "./Dashboard/CreationEnRetard";
import Doniciliation from "./Dashboard/Doniciliation";
import Comptabilite from "./Dashboard/Comptabilite";
import CourierTraite from "./Dashboard/CourierTraite";
import Article from "./Dashboard/Article";

const Dashboard = () => {
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

  return (
    <div className="grid">
      <div className="col-12 xl:col-6">
        <div className="card">
          <h5>Creation Effectuee</h5>
          <CreationEffectue />
        </div>
        <div className="card">
          <h5> Creation En Retard </h5>
          <CreationEnRetard />
        </div>
        <div className="card">
          <h5> Comptabilite </h5>
          <Comptabilite />
        </div>
        <div className="card">
          <h5> Article </h5>
          <Article/>
        </div>
      </div>

      <div className="col-12 xl:col-6">
        <div className="card">
          <h5>Creation En Cours</h5>
          <CreationEnCours />
        </div>

        <div className="card">
          <h5>Doniciliation</h5>
          <Doniciliation />
        </div>
        <div className="card">
          <h5>CourierTraite</h5>
          <CourierTraite />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
