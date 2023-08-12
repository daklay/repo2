import React, { useEffect, useState } from "react";
import Link from "next/link";
import { InputText } from "primereact/inputtext";
import { Fieldset } from "primereact/fieldset";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { useRouter } from "next/router";

const EmptyPage = () => {
  const Statut = ["Actif", "Promotion", "Suspendu"];
  const [ShowFormUpdate, setShowFormUpdate] = useState(false);

  const [DataFormAjouter, setDataFormAjouter] = useState({
    designation: "",
    montant: "",
    duree: "",
    statut: "",
  });

  const HandelDataAjouter = (e) => {
    const { name, value } = e.target;
    setDataFormAjouter({ ...DataFormAjouter, [name]: value });
  };

  const HandelSubmit = (e) => {
    e.preventDefault();
    console.log(DataFormAjouter);
  };

  const [DataFormUpdate, setDataFormUpdate] = useState({
    designation: "",
    montant: "",
    duree: "",
    statut: "",
  });

  const HandelDataUpdate = (e) => {
    const { name, value } = e.target;
    setDataFormUpdate({ ...DataFormUpdate, [name]: value });
  };

  const UpdateData = () => {
    setShowFormUpdate(false);
    console.log(DataFormUpdate);
  };

  const [Packs, setPacks] = useState([
    {
      designation: "test",
      montant: "test",
      duree: "test",
      statut: "test",
    },
  ]);

  const accept = () => {
    console.log("dd");
  };
  const reject = () => {
    console.log("dd");
  };

  const confirmDelete = () => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept,
      reject,
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

  return (
    <>
      <div className="grid">
        <div className="col-12">
          <Fieldset legend="Formulaire Packs" toggleable>
            <form>
              <div className="p-fluid formgrid grid">
                <div className="field col-6">
                  <label htmlFor="designation">Designation</label>
                  <InputText
                    id="designation"
                    name="designation"
                    value={DataFormAjouter.designation}
                    onChange={HandelDataAjouter}
                    type="text"
                  />
                </div>
                <div className="field col-6">
                  <label htmlFor="montant">Montant</label>
                  <InputText
                    name="montant"
                    id="montant"
                    onChange={HandelDataAjouter}
                    value={DataFormAjouter.montant}
                    type="text"
                  />
                </div>
                <div className="field col-6">
                  <label htmlFor="duree">Duree : </label>
                  <InputText
                    id="duree"
                    name="duree"
                    value={DataFormAjouter.duree}
                    onChange={HandelDataAjouter}
                  />
                </div>
                <div className="field col-6">
                  <label htmlFor="statut">Statut :</label>
                  <Dropdown
                    id="status"
                    value={DataFormAjouter.statut}
                    onChange={(e) =>
                      setDataFormAjouter({
                        ...DataFormAjouter,
                        statut: e.target.value,
                      })
                    }
                    options={Statut}
                    placeholder="Select a Statut"
                    filter
                  />
                </div>
              </div>
              <Button
                label="Ajouter une Pack"
                severity="success"
                icon="pi pi-plus-circle"
                onClick={HandelSubmit}
              />
            </form>
          </Fieldset>

          <ConfirmDialog />

          <div className="card mt-4 ">
            <DataTable
              value={Packs}
              paginator
              dataKey="id"
              rows={5}
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column
                field="designation"
                header="Designation"
                sortable
                style={{ width: "20%" }}
              ></Column>
              <Column
                field="montant"
                header="Montant"
                sortable
                style={{ width: "20%" }}
              ></Column>
              <Column
                field="duree"
                sortable
                header="Duree"
                style={{ width: "20%" }}
              ></Column>
              <Column
                field="statut"
                header="Statut"
                sortable
                style={{ width: "20%" }}
              ></Column>

              <Column
                header="Action"
                style={{ width: "20%" }}
                body={(DataPacks) => (
                  <div className=" flex ">
                    <Button
                      icon="pi pi-pencil"
                      className="mr-2"
                      rounded
                      onClick={() => {
                        setShowFormUpdate(true);
                      }}
                      severity="info"
                    />
                    <Button
                      icon="pi pi-trash"
                      onClick={confirmDelete}
                      rounded
                      severity="danger"
                    />
                  </div>
                )}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>

      {/* Popup Modifier */}
      <Dialog
        header="Header"
        visible={ShowFormUpdate}
        style={{ width: "50vw" }}
        onHide={() => setShowFormUpdate(false)}
      >
        <Fieldset legend="Formulaire de recherche">
          <form>
            <div className="p-fluid formgrid grid">
              <div className="field col-12 md:col-6">
                <label htmlFor="designation">Designation : </label>
                <InputText
                  type="text"
                  id="designation"
                  name="designation"
                  value={DataFormUpdate.designation}
                  onChange={HandelDataUpdate}
                />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="montant">Montant : </label>
                <InputText
                  type="text"
                  id="montant"
                  name="montant"
                  value={DataFormUpdate.montant}
                  onChange={HandelDataUpdate}
                />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="duree">Duree : </label>
                <InputText
                  type="text"
                  id="duree"
                  name="duree"
                  value={DataFormUpdate.duree}
                  onChange={HandelDataUpdate}
                />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="statut">statut</label>
                <Dropdown
                  id="statut"
                  value={DataFormUpdate.statut}
                  onChange={(e) =>
                    setDataFormUpdate({
                      ...DataFormUpdate,
                      statut: e.target.value,
                    })
                  }
                  options={Statut}
                  placeholder="Select a Country"
                  filter
                />
              </div>
            </div>
          </form>

          {/* Buttons */}
          <div className="flex justify-content-between center_media mt-2">
            <div>
              <Button
                type="button"
                className="p-button-danger"
                onClick={() => setShowFormUpdate(false)}
                label="Femer"
              />
            </div>
            <div>
              <Button
                className="p-button-success"
                label=" Modifier "
                onClick={UpdateData}
              />
            </div>
          </div>
        </Fieldset>
      </Dialog>
    </>
  );
};

export default EmptyPage;
