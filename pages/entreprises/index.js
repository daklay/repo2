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
  const Status = ["Ouvert", "Actif", "Bloque", "Radie", "Resilie"];
  const [ShowForm, setShowForm] = useState(false);
  const [ShowFormUpdate, setShowFormUpdate] = useState(false);

  const [DataFormAjouter, setDataFormAjouter] = useState({
    IdEntreprise: "",
    denomination: "",
    data_creation: "",
    ice: "",
    n_rc: "",
    n_if: "",
    immatriculation_cnss: "",
    status: "",
  });

  const HandelDataAjouter = (e) => {
    const { name, value } = e.target;
    setDataFormAjouter({ ...DataFormAjouter, [name]: value });
  };

  const AjouterData = () => {
    setShowForm(false);
    console.log(DataFormAjouter);
  };

  const [DataFormUpdate, setDataFormUpdate] = useState({
    IdEntreprise: "",
    denomination: "",
    data_creation: "",
    ice: "",
    n_rc: "",
    n_if: "",
    immatriculation_cnss: "",
    status: "",
  });

  const HandelDataUpdate = (e) => {
    const { name, value } = e.target;
    setDataFormUpdate({ ...DataFormUpdate, [name]: value });
  };

  const UpdateData = () => {
    setShowFormUpdate(false);
    console.log(DataFormUpdate);
  };

  const [DataSearch, setDataSearch] = useState({
    libelle: "",
    telephone: "",
    ville: "",
    email: "",
  });

  const HandelDataSearch = (e) => {
    const { name, value } = e.target;
    setDataSearch({ ...DataSearch, [name]: value });
  };

  const ClearDataSearch = () => {
    setDataSearch({
      libelle: "",
      telephone: "",
      ville: "",
      email: "",
    });
  };

  const [EntrepriseData, setEntrepriseData] = useState([]);



  const confirmDelete = () => {
    confirmDialog({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        // accept,
        // reject
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
          <Fieldset legend="Formulaire de recherche des entreprise" toggleable>
            <form>
              <div className="p-fluid formgrid grid">
                <div className="field col-12 md:col-3">
                  <label htmlFor="libelle">Libelle</label>
                  <InputText
                    id="libelle"
                    name="libelle"
                    value={DataSearch.libelle}
                    onChange={HandelDataSearch}
                    type="text"
                  />
                </div>
                <div className="field col-12 md:col-3">
                  <label htmlFor="telephone">telephone</label>
                  <InputText
                    name="telephone"
                    id="telephone"
                    onChange={HandelDataSearch}
                    value={DataSearch.telephone}
                    type="text"
                  />
                </div>
                <div className="field col-12 md:col-3">
                  <label htmlFor="ville">ville : </label>
                  <InputText
                    id="ville"
                    name="ville"
                    value={DataSearch.ville}
                    onChange={HandelDataSearch}
                  />
                </div>
                <div className="field col-12 md:col-3">
                  <label htmlFor="email">email :</label>
                  <InputText
                    type="email"
                    id="email"
                    name="email"
                    value={DataSearch.email}
                    onChange={HandelDataSearch}
                  />
                </div>
              </div>
            </form>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                marginTop: "10px",
                flexWrap: "wrap",
              }}
            >
              <Button
                label="Ajouter une entreprise"
                severity="success"
                icon="pi pi-plus-circle"
                onClick={() => {
                  setShowForm(true);
                }}
              />
              <Button
                className="ml-2"
                label="Rechercher / Rafraîchir"
                icon="pi pi-search"
                onClick={()=>{
                  console.log(DataSearch);
                }}
              />
              <Button
                icon="pi pi-filter-slash"
                className="ml-2"
                onClick={ClearDataSearch}
                rounded
                severity="info"
              />
            </div>
          </Fieldset>

          <div className="card mt-4 ">
            <DataTable
              value={EntrepriseData}
              paginator
              dataKey="id"
              rows={5}
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column
                field="libelle"
                header="Libellé du entreprise"
                sortable
                style={{ width: "20%" }}
              ></Column>
              <Column
                field="email"
                header="Email"
                sortable
                style={{ width: "20%" }}
              ></Column>
              <Column
                field="telephone"
                sortable
                header="Telephone"
                style={{ width: "20%" }}
              ></Column>
              <Column
                field="etat"
                header="Etat dossier"
                sortable
                style={{ width: "20%" }}
                // body={(Domiciliations, id) => (
                //   <span
                //     className="order-badge order-pending"
                //     style={{ textTransform: "lowercase" }}
                //   >
                //     {Domiciliations.etat}
                //   </span>
                // )}
              ></Column>
              <Column
                field="etap_active"
                header="Etape active"
                sortable
                style={{ width: "20%" }}
              ></Column>

              <Column
                header="Action"
                style={{ width: "20%" }}
                body={(DataDomiciliations) => (
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

      {/* Popup  Ajouter */}
      <Dialog
        header="Header"
        visible={ShowForm}
        style={{ width: "50vw" }}
        onHide={() => setShowForm(false)}
      >
        <Fieldset legend="Formulaire de recherche">
          <form>
            <div className="p-fluid formgrid grid">
              <div className="field col-12 md:col-6">
                <label htmlFor="IdEntreprise">IdEntreprise : </label>
                <InputText
                  type="text"
                  id="IdEntreprise"
                  name="IdEntreprise"
                  value={DataFormAjouter.IdEntreprise}
                  onChange={HandelDataAjouter}
                />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="denomination">Denomination : </label>
                <InputText
                  type="text"
                  id="denomination"
                  name="denomination"
                  value={DataFormAjouter.denomination}
                  onChange={HandelDataAjouter}
                />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="data_creation">Data creation : </label>
                <InputText
                  type="date"
                  id="data_creation"
                  name="data_creation"
                  value={DataFormAjouter.data_creation}
                  onChange={HandelDataAjouter}
                />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="ice">ice : </label>
                <InputText
                  type="text"
                  id="ice"
                  name="ice"
                  value={DataFormAjouter.ice}
                  onChange={HandelDataAjouter}
                />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="n_rc">N°RC: </label>
                <InputText
                  type="text"
                  id="n_rc"
                  name="n_rc"
                  value={DataFormAjouter.n_rc}
                  onChange={HandelDataAjouter}
                />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="n_if">N°if : </label>
                <InputText
                  type="text"
                  id="n_if"
                  name="n_if"
                  value={DataFormAjouter.n_if}
                  onChange={HandelDataAjouter}
                />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="immatriculation_cnss">
                  Immatriculation CNSS :{" "}
                </label>
                <InputText
                  type="text"
                  id="immatriculation_cnss"
                  name="immatriculation_cnss"
                  value={DataFormAjouter.immatriculation_cnss}
                  onChange={HandelDataAjouter}
                />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="status">status</label>
                <Dropdown
                  id="status"
                  value={DataFormAjouter.status}
                  onChange={(e) =>
                    setDataFormAjouter({
                      ...DataFormAjouter,
                      status: e.target.value,
                    })
                  }
                  options={Status}
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
                onClick={() => setShowForm(false)}
                label="Femer"
              />
            </div>
            <div>
              <Button
                className="p-button-success"
                label=" Ajouter "
                onClick={AjouterData}
              />
            </div>
          </div>
        </Fieldset>
      </Dialog>

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
                <label htmlFor="IdEntreprise">IdEntreprise : </label>
                <InputText
                  type="text"
                  id="IdEntreprise"
                  name="IdEntreprise"
                  value={DataFormUpdate.IdEntreprise}
                  onChange={HandelDataUpdate}
                />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="denomination">Denomination : </label>
                <InputText
                  type="text"
                  id="denomination"
                  name="denomination"
                  value={DataFormUpdate.denomination}
                  onChange={HandelDataUpdate}
                />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="data_creation">Data creation : </label>
                <InputText
                  type="date"
                  id="data_creation"
                  name="data_creation"
                  value={DataFormUpdate.data_creation}
                  onChange={HandelDataUpdate}
                />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="ice">ice : </label>
                <InputText
                  type="text"
                  id="ice"
                  name="ice"
                  value={DataFormUpdate.ice}
                  onChange={HandelDataUpdate}
                />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="n_rc">N°RC: </label>
                <InputText
                  type="text"
                  id="n_rc"
                  name="n_rc"
                  value={DataFormUpdate.n_rc}
                  onChange={HandelDataUpdate}
                />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="n_if">N°if : </label>
                <InputText
                  type="text"
                  id="n_if"
                  name="n_if"
                  value={DataFormUpdate.n_if}
                  onChange={HandelDataUpdate}
                />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="immatriculation_cnss">
                  Immatriculation CNSS :{" "}
                </label>
                <InputText
                  type="text"
                  id="immatriculation_cnss"
                  name="immatriculation_cnss"
                  value={DataFormUpdate.immatriculation_cnss}
                  onChange={HandelDataUpdate}
                />
              </div>
              <div className="field col-12 md:col-12">
                <label htmlFor="status">status</label>
                <Dropdown
                  id="status"
                  value={DataFormUpdate.status}
                  onChange={(e) =>
                    setDataFormUpdate({
                      ...DataFormUpdate,
                      status: e.target.value,
                    })
                  }
                  options={Status}
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
