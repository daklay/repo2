import Link from "next/link";
import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Fieldset } from "primereact/fieldset";
import { InputText } from "primereact/inputtext";

export default function EmptyPage() {
  const [Loading, setLoading] = useState(true);

  const [FormData, setFormData] = useState({
    test1: "",
    test2: "",
    test3: "",
    test4: "",
    test5: "",
  });

  const HandelChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });
  };

  const HandelSubmit = (e) => {
    e.preventDefault();
  };
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
    <div className="">
      <div className="card">
        <Fieldset legend="Formulaire de Ajouter un comptble" toggleable>
          <form>
            <div className="p-fluid formgrid grid">
              <div className="field col-4 ">
                <label htmlFor="test1">test1</label>
                <InputText
                  id="test1"
                  name="test1"
                  value={FormData.test1}
                  onChange={HandelChange}
                  type="text"
                />
              </div>
              <div className="field col-4 ">
                <label htmlFor="test2">test2</label>
                <InputText
                  name="test2"
                  id="test2"
                  value={FormData.test2}
                  onChange={HandelChange}
                  type="text"
                />
              </div>
              <div className="field col-4 ">
                <label htmlFor="test3">test3</label>
                <InputText
                  name="test3"
                  id="test3"
                  value={FormData.test3}
                  onChange={HandelChange}
                  type="text"
                />
              </div>
              <div className="field col-6">
                <label htmlFor="test4">test4 : </label>
                <InputText
                  id="test4"
                  name="test4"
                  value={FormData.test4}
                  onChange={HandelChange}
                />
              </div>
              <div className="field col-6 ">
                <label htmlFor="test5">test5 :</label>
                <InputText
                  type="test5"
                  id="test5"
                  name="test5"
                  value={FormData.test5}
                  onChange={HandelChange}
                />
              </div>
            </div>
            <Button
              label="Ajouter un Comptable"
              severity="success"
              icon="pi pi-plus-circle"
              onClick={HandelSubmit}
            />
          </form>
        </Fieldset>
      </div>

      <div className="card mt-3">
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
    </div>
  );
}
