import React, { useEffect, useState } from "react";
import Link from "next/link";
import { InputText } from "primereact/inputtext";
import { Fieldset } from "primereact/fieldset";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { useRouter } from "next/router";
import { Dropdown } from "primereact/dropdown";

const EmptyPage = () => {
  const Creation = ["Denomination"];

  const [ShowFormUpdate, setShowFormUpdate] = useState(false);

  const [DataFormAjouter, setDataFormAjouter] = useState({
    designation: "",
    creation: "",
    message: "",
    temps_Declencheur: "",
    note: "",
    steper: "",
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
    creation: "",
    message: "",
    temps_Declencheur: "",
    note: "",
    steper: "",
  });

  const HandelDataUpdate = (e) => {
    const { name, value } = e.target;
    setDataFormUpdate({ ...DataFormUpdate, [name]: value });
  };

  const UpdateData = () => {
    setShowFormUpdate(false);
    console.log(DataFormUpdate);
  };

  const [NotifClient, setNotifClient] = useState([]);

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
          <Fieldset legend="Formulaire de Notifications clients" toggleable>
            <form>
              <div className="p-fluid formgrid grid">
                <div className="field col-4">
                  <label htmlFor="designation">Designation</label>
                  <InputText
                    id="designation"
                    name="designation"
                    value={DataFormAjouter.designation}
                    onChange={HandelDataAjouter}
                    type="text"
                  />
                </div>
                <div className="field col-4">
                  <label htmlFor="creation">Creation</label>
                  <Dropdown
                    id="creation"
                    value={DataFormAjouter.creation}
                    onChange={(e) =>
                      setDataFormAjouter({
                        ...DataFormAjouter,
                        creation: e.target.value,
                      })
                    }
                    options={Creation}
                    placeholder="Select a Creation"
                    filter
                  />
                </div>
                <div className="field col-4">
                  <label htmlFor="message">message</label>
                  <InputText
                    id="message"
                    name="message"
                    value={DataFormAjouter.message}
                    onChange={HandelDataAjouter}
                  />
                </div>
                <div className="field col-6">
                  <label htmlFor="temps_Declencheur">Temps Declencheur :</label>
                  <InputText
                    id="temps_Declencheur"
                    name="temps_Declencheur"
                    value={DataFormAjouter.temps_Declencheur}
                    onChange={HandelDataAjouter}
                  />
                </div>
                <div className="field col-6">
                  <label htmlFor="note">Note :</label>
                  <InputText
                    id="note"
                    name="note"
                    value={DataFormAjouter.note}
                    onChange={HandelDataAjouter}
                  />
                </div>
              </div>
              <Button
                label="Ajouter une Notifications "
                severity="success"
                icon="pi pi-plus-circle"
                onClick={HandelSubmit}
              />
            </form>
          </Fieldset>

          <ConfirmDialog />

          <div className="card mt-4 ">
            <DataTable
              value={NotifClient}
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
                field="creation"
                header="creation"
                sortable
                style={{ width: "20%" }}
              ></Column>
              <Column
                field="message"
                sortable
                header="message"
                style={{ width: "20%" }}
              ></Column>
              <Column
                field="temps_Declencheur"
                header="temps_Declencheur"
                sortable
                style={{ width: "20%" }}
              ></Column>

              <Column
                field="note"
                header="note"
                sortable
                style={{ width: "20%" }}
              ></Column>

              <Column
                header="Action"
                style={{ width: "20%" }}
                body={(DataNotif) => (
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
        <Fieldset legend="Formulaire de Update Notifications ">
          <form>
            <div className="p-fluid formgrid grid">
              <div className="field col-4">
                <label htmlFor="designation">Designation</label>
                <InputText
                  id="designation"
                  name="designation"
                  value={DataFormUpdate.designation}
                  onChange={HandelDataUpdate}
                  type="text"
                />
              </div>
              <div className="field col-4">
                <label htmlFor="creation">Creation</label>
                <Dropdown
                  id="creation"
                  value={DataFormUpdate.creation}
                  onChange={(e) =>
                    setDataFormUpdate({
                      ...DataFormUpdate,
                      creation: e.target.value,
                    })
                  }
                  options={Creation}
                  placeholder="Select a Creation"
                  filter
                />
              </div>
              <div className="field col-4">
                <label htmlFor="message">message</label>
                <InputText
                  id="message"
                  name="message"
                  value={DataFormAjouter.message}
                  onChange={HandelDataAjouter}
                />
              </div>
              <div className="field col-6">
                <label htmlFor="temps_Declencheur">Temps Declencheur :</label>
                <InputText
                  id="temps_Declencheur"
                  name="temps_Declencheur"
                  value={DataFormUpdate.temps_Declencheur}
                  onChange={HandelDataUpdate}
                />
              </div>
              <div className="field col-6">
                <label htmlFor="note">Note :</label>
                <InputText
                  id="note"
                  name="note"
                  value={DataFormUpdate.note}
                  onChange={HandelDataUpdate}
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
