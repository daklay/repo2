import Link from "next/link";
import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function EmptyPage() {
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

  const actionBodyTemplate = (e) => {
    // return <Button onClick={()=>{alert('downloading')}} type="button" icon="pi pi-download" rounded></Button>;
    return <Link href="/entreprises/comptabilite/client">{e.id}</Link>;
  };
  return (
    <div className="card">
      <h5>Clients</h5>
      <DataTable
        paginator
        rows={5}
        value={[
          { id: 2, "raison sociale": "test" },
          { id: 1, "raison sociale": "test" },
          { id: 2, "raison sociale": "test" },
          { id: 1, "raison sociale": "test" },
          { id: 2, "raison sociale": "test" },
          { id: 1, "raison sociale": "test" },
        ]}
        scrollable
        scrollHeight="400px"
        virtualScrollerOptions={{ itemSize: 46 }}
      >
        <Column
          field="id"
          header="Id"
          style={{ width: "20%" }}
          body={(e) => actionBodyTemplate(e)}
        ></Column>
        <Column
          field="raison sociale"
          header="Raison sociale"
          style={{ width: "20%" }}
        ></Column>
      </DataTable>
    </div>
  );
}
