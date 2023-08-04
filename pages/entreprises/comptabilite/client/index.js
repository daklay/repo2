import React, { useRef, useState } from "react";
import { Fieldset } from "primereact/fieldset";
import { Divider } from "primereact/divider";
import { FileUpload } from "primereact/fileupload";
import { Tree } from "primereact/tree";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import Link from "next/link";
import CituationComptable from "./CituationComptable";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { useRouter } from "next/router";
import { useEffect } from "react";

const EmptyPage = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const toast = useRef(null);
  const [FormUpdate, setFormUpdate] = useState({
    date: "",
    chiffre: "",
    nombre: "",
  });

  const onUpload = () => {
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };

  const customBase64Uploader = async (event) => {
    // convert file to base64 encoded
    console.log(event);
    const file = event.files[0];
    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

    reader.readAsDataURL(blob);

    reader.onloadend = function () {
      const base64data = reader.result;
    };
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      const doc = new jsPDF.default(0, 0);
      doc.save("products.pdf");
    });
  };

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

  const actionBodyTemplate = () => {
    // return <Button onClick={()=>{alert('downloading')}} type="button" icon="pi pi-download" rounded></Button>;
    return (
      <Button
        type="button"
        icon="pi pi-download"
        rounded
        onClick={exportPdf}
        data-pr-tooltip="PDF"
      />
    );
  };

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <Fieldset legend="Tenu de la Comptabilite">
            <table style={{ width: "500px" }}>
              <tbody>
                <tr>
                  <td>client ID </td>
                  <td>ahmed</td>
                </tr>
                <tr>
                  <td>Raison sociale </td>
                  <td>mohamed</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>Chiffre d&apos;affaires </td>
                  {/* <div className="field col-12 md:col-6"> */}
                  <td>
                    <div>
                      <InputText
                        id="chiffre"
                        name="chiffre"
                        className="mr-2"
                        value={FormUpdate.chiffre}
                        onChange={(e) =>
                          setFormUpdate({
                            ...FormUpdate,
                            chiffre: e.target.value,
                          })
                        }
                      />
                      <InputText
                        id="date"
                        type="month"
                        name="date"
                        value={FormUpdate.date}
                        onChange={(e) =>
                          setFormUpdate({
                            ...FormUpdate,
                            date: e.target.value,
                          })
                        }
                      />
                    </div>
                  </td>
                  {/* </div> */}
                </tr>
                <tr>
                  <td>Nombre des salariés </td>
                  <td>
                    <InputText
                      id="nombre"
                      name="nombre"
                      className="mr-2"
                      value={FormUpdate.nombre}
                      onChange={(e) =>
                        setFormUpdate({
                          ...FormUpdate,
                          nombre: e.target.value,
                        })
                      }
                    />
                    <InputText
                      id="date"
                      type="month"
                      name="date"
                      value={FormUpdate.date}
                      onChange={(e) =>
                        setFormUpdate({
                          ...FormUpdate,
                          date: e.target.value,
                        })
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            {/* <Divider align="left">
              <div className="inline-flex align-items-center">
                <b>Piece comptable</b>
              </div>
            </Divider> */}
            <DataTable
              scrollable
              scrollHeight="flex"
              onCellClick={() => {
                alert("testt");
              }}
              value={[
                {
                  chifreAffaire: 10,
                  Date: "10/06/2020",
                  NbrSalarie: 10,
                },
                {
                  chifreAffaire: 12,
                  Date: "10/05/2020",
                  NbrSalarie: 50,
                },
              ]}
              // tableStyle={{ minWidth: "50rem" }}
            >
              <Column
                field="chifreAffaire"
                header="chifreAffaire"
                sortable
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="NbrSalarie"
                header="NbrSalarie"
                sortable
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="Date"
                header="Date"
                sortable
                style={{ width: "25%" }}
              ></Column>
            </DataTable>
          </Fieldset>

          {/* Cituation Comptable */}

          <CituationComptable />

          {/* Client */}

          <Divider align="left">
            <div className="inline-flex align-items-center">
              <i className="pi pi-user mr-2"></i>
              <b>Piece comptable</b>
            </div>
          </Divider>
          <Fieldset
            toggleable
            collapsed={true}
            className="mt-4"
            legend="Facture achat"
            style={{ minWidth: "100%" }}
          >
            <DataTable
              scrollable
              scrollHeight="flex"
              onCellClick={() => {
                alert("testt");
              }}
              value={[
                {
                  Designation: "test1",
                  "Date/Heure": "test",
                  file: "file.pdf",
                  action: "upload",
                  Fournisseur: "fournisse",
                },
                {
                  Designation: "test2",
                  "Date/Heure": "test",
                  file: "file.pdf",
                  action: "upload",
                  Fournisseur: "fournisse",
                },
              ]}
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column
                field="Designation"
                header="Designation"
                sortable
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="Fournisseur"
                header="Fournisseur"
                sortable
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="Date/Heure"
                header="Date/Heure"
                sortable
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="file"
                header="file"
                style={{ width: "25%" }}
                onCellClick={() => {
                  alert("testt");
                }}
              ></Column>
              <Column
                field="action"
                header="action"
                headerStyle={{ width: "5rem", textAlign: "center" }}
                bodyStyle={{ textAlign: "center", overflow: "visible" }}
                body={actionBodyTemplate}
              />
              <Column
                field="action"
                header="action"
                headerStyle={{ width: "5rem", textAlign: "center" }}
                bodyStyle={{ textAlign: "center", overflow: "visible" }}
                body={actionBodyTemplate}
              />
            </DataTable>
          </Fieldset>
          <Fieldset
            toggleable
            collapsed={true}
            className="mt-4"
            legend="Facture Vente"
            style={{ minWidth: "100%" }}
          >
            <DataTable
              scrollable
              scrollHeight="flex"
              onCellClick={() => {
                alert("testt");
              }}
              value={[
                {
                  Designation: "test1",
                  "Date/Heure": "test",
                  file: "file.pdf",
                  client: "client",
                },
                {
                  Designation: "test2",
                  "Date/Heure": "test",
                  file: "file.pdf",
                  client: "client",
                },
              ]}
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column
                field="Designation"
                header="Designation"
                sortable
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="client"
                header="client"
                sortable
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="Date/Heure"
                header="Date/Heure"
                sortable
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="file"
                header="file"
                style={{ width: "25%" }}
                onCellClick={() => {
                  alert("testt");
                }}
              ></Column>
              <Column
                field="action"
                header="action"
                headerStyle={{ width: "5rem", textAlign: "center" }}
                bodyStyle={{ textAlign: "center", overflow: "visible" }}
                body={actionBodyTemplate}
              />
            </DataTable>
          </Fieldset>
          <Fieldset
            toggleable
            collapsed={true}
            className="mt-4"
            legend="Releve Bancaire"
            style={{ minWidth: "100%" }}
          >
            <DataTable
              scrollable
              scrollHeight="flex"
              onCellClick={() => {
                alert("testt");
              }}
              value={[
                {
                  Designation: "test1",
                  "Date/Heure": "test",
                  file: "file.pdf",
                  action: "upload",
                },
                {
                  Designation: "test2",
                  "Date/Heure": "test",
                  file: "file.pdf",
                  action: "upload",
                },
              ]}
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column
                field="Designation"
                header="Designation"
                sortable
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="Date/Heure"
                header="Date/Heure"
                sortable
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="file"
                header="file"
                style={{ width: "25%" }}
                onCellClick={() => {
                  alert("testt");
                }}
              ></Column>
              <Column
                field="action"
                header="action"
                style={{ width: "25%" }}
              ></Column>
              <Column
                headerStyle={{ width: "5rem", textAlign: "center" }}
                bodyStyle={{ textAlign: "center", overflow: "visible" }}
                body={actionBodyTemplate}
              />
            </DataTable>
          </Fieldset>
          <Fieldset
            toggleable
            collapsed={true}
            className="mt-4"
            legend="Autre piece"
            style={{ minWidth: "100%" }}
          >
            <DataTable
              scrollable
              scrollHeight="flex"
              onCellClick={() => {
                alert("testt");
              }}
              value={[
                {
                  Designation: "test1",
                  "Date/Heure": "test",
                  file: "file.pdf",
                  action: "upload",
                },
                {
                  Designation: "test2",
                  "Date/Heure": "test",
                  file: "file.pdf",
                  action: "upload",
                },
              ]}
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column
                field="Designation"
                header="Designation"
                sortable
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="Date/Heure"
                header="Date/Heure"
                sortable
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="file"
                header="file"
                style={{ width: "25%" }}
                onCellClick={() => {
                  alert("testt");
                }}
              ></Column>
              <Column
                field="action"
                header="action"
                style={{ width: "25%" }}
              ></Column>
              <Column
                headerStyle={{ width: "5rem", textAlign: "center" }}
                bodyStyle={{ textAlign: "center", overflow: "visible" }}
                body={actionBodyTemplate}
              />
            </DataTable>
          </Fieldset>
          {/* <Divider align="left">
            <div className="inline-flex align-items-center">
              <i className="pi pi-download mr-2"></i>
              <b>upload</b>
            </div>
          </Divider>
          <FileUpload name="demo[]" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
          <div className="m-3 flex">
            <Toast ref={toast}></Toast>
            <Dropdown
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.value)}
              options={[
                { name: "Doc comptable", code: "cp" },
                { name: "Doc fiscal", code: "df" },
                { name: "Doc social", code: "ds" },
              ]}
              optionLabel="name"
              placeholder="Select a type"
              className="w-full md:w-14rem mr-3"
            />
            <FileUpload
              mode="basic"
              name="demo[]"
              url="/api/upload"
              accept="image/*"
              maxFileSize={1000000}
              onUpload={onUpload}
              chooseLabel="telecharger un file"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default EmptyPage;
