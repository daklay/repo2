import React, { useState } from "react";
import Link from "next/link";
import { InputText } from "primereact/inputtext";
import { Fieldset } from "primereact/fieldset";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { useRouter } from "next/router";
import { useEffect } from "react";

const EmptyPage = () => {
  const Entreprise = ["Meta", "Appel", "Tesla", "AliBaba", "AliMama"];
  const [ShowForm, setShowForm] = useState(false);
  const [ShowFormUpdate, setShowFormUpdate] = useState(false);

  const [DataFormAjouter, setDataFormAjouter] = useState({
    libelle: "",
    date_debut: "",
    date_fin: "",
    payment: "",
    reste: "",
  });

  const [DataFormUpdate, setDataFormUpdate] = useState({
    libelle: "",
    date_debut: "",
    date_fin: "",
  });

  const [DataSearch, setDataSearch] = useState({
    libelle: "",
    date_debut: "",
    date_fin: "",
  });

  const [DataDomiciliations, setDataDomiciliations] = useState([
    {
      libelle: "Meta",
      date_debut: "21/02/2023",
      date_fin: "	10/07/2023",
      duree: "20",
      reste: "13",
      status: "pack creation",
    },
    {
      libelle: "Apple	",
      date_debut: "21/05/2023	",
      date_fin: "	12/06/2023	",
      duree: "17",
      reste: "16",
      status: "payment",
    },
    {
      libelle: "Tesla",
      date_debut: "21/06/2023",
      date_fin: "20/08/2023	",
      duree: "19",
      reste: "54",
      status: "pack paiment",
    },
  ]);

  const toast = useRef(null);

  const accept = () => {
    toast.current.show({
      severity: "success",
      summary: "Deleted",
      detail: "You have Deleted",
      life: 3000,
    });
  };

  const DeleteDomiciliations = () => {
    confirmDialog({
      message: "Do you want to delete this ?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept,
      // reject,
    });
  };

  const HandelDataSearch = (e) => {
    const { name, value } = e.target;
    setDataSearch({ ...DataSearch, [name]: value });
  };

  const ClearDataSearch = () => {
    setDataSearch({
      libelle: "",
      date_debut: "",
      date_fin: "",
    });
  };

  const AjouterDomiciliation = () => {
    var date_debut = new Date(DataFormAjouter.date_debut);
    var date_fin = new Date(DataFormAjouter.date_fin);

    var timeDiff = Math.abs(Date.now() - date_fin.getTime());
    var resteDay = Math.ceil(timeDiff / (1000 * 3600 * 24));

    var TimDuree = Math.abs(date_fin.getTime() - date_debut.getTime());
    var Duree = Math.ceil(TimDuree / (1000 * 3600 * 24));

    setDataDomiciliations([
      ...DataDomiciliations,
      {
        ...DataFormAjouter,
        reste: resteDay,
        duree: Duree,
      },
    ]);
    setShowForm(false);
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
          <Fieldset legend="Formulaire de recherche" toggleable>
            <form>
              <div className="p-fluid formgrid grid">
                <div className="field col-12 md:col-4">
                  <label htmlFor="libelle">Libelle</label>
                  <InputText
                    id="libelle"
                    name="libelle"
                    value={DataSearch.libelle}
                    onChange={HandelDataSearch}
                    type="text"
                  />
                </div>
                <div className="field col-12 md:col-4">
                  <label htmlFor="date_debut">Date debut : </label>
                  <InputText
                    type="date"
                    id="date_debut"
                    name="date_debut"
                    value={DataSearch.date_debut}
                    onChange={HandelDataSearch}
                  />
                </div>
                <div className="field col-12 md:col-4">
                  <label htmlFor="date_fin">Date fin :</label>
                  <InputText
                    type="date"
                    id="date_fin"
                    name="date_fin"
                    value={DataSearch.date_fin}
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
                flexWrap: "wrap",
              }}
            >
              <Button
                label="Ajouter une domiciliation"
                severity="success"
                icon="pi pi-plus-circle"
                onClick={() => setShowForm(true)}
              />
              <Button
                className="ml-2"
                label="Rechercher / Rafraîchir"
                icon="pi pi-search"
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
              value={DataDomiciliations}
              paginator
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
                field="date_debut"
                sortable
                header="Date debut"
                style={{ width: "20%" }}
              ></Column>
              <Column
                field="date_fin"
                header="Date fin"
                sortable
                style={{ width: "20%" }}
              ></Column>
              <Column
                field="duree"
                header="Duree"
                sortable
                style={{ width: "20%" }}
                body={(Domiciliations, id) => (
                  <span
                    className="order-badge"
                    style={{ textTransform: "lowercase" }}
                  >
                    {Domiciliations.duree} jrs
                  </span>
                )}
              ></Column>
              <Column
                field="reste"
                header="Reste"
                body={(Domiciliations) => (
                  <span
                    className={`order-badge ${
                      Domiciliations.reste >= 30
                        ? "order-pending"
                        : "order-cancelled"
                    } `}
                    style={{ textTransform: "lowercase" }}
                  >
                    {Domiciliations.reste} jrs
                  </span>
                )}
                sortable
                style={{ width: "20%" }}
              ></Column>
              <Column
                field="status"
                header="status"
                body={(Domiciliations) => (
                  <span style={{ textTransform: "lowercase" }}>
                    {Domiciliations.status}
                  </span>
                )}
                sortable
                style={{ width: "20%" }}
              ></Column>
              <Column
                header="Action"
                style={{ width: "25%" }}
                body={(Domiciliations) => (
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
                    <Button icon="pi pi-send" className="mr-2" rounded />
                    <Button
                      icon="pi pi-trash"
                      onClick={DeleteDomiciliations}
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
                <label htmlFor="Entreprise">Entreprise</label>
                <Dropdown
                  id="Entreprise"
                  value={DataFormAjouter.libelle}
                  onChange={(e) =>
                    setDataFormAjouter({
                      ...DataFormAjouter,
                      libelle: e.target.value,
                    })
                  }
                  options={Entreprise}
                  filter
                />
              </div>
              <div className="field col-12 md:col-3">
                <label htmlFor="date_debut">paiement : </label>
                <InputText
                  id="date_debut"
                  name="date_debut"
                  value={DataFormAjouter.payment}
                  onChange={(e) =>
                    setDataFormAjouter({
                      ...DataFormAjouter,
                      date_debut: e.target.value,
                    })
                  }
                />
              </div>
              <div className="field col-12 md:col-3">
                <label htmlFor="date_debut">reste : </label>
                <InputText
                  id="date_debut"
                  name="date_debut"
                  value={DataFormAjouter.reste}
                  onChange={(e) =>
                    setDataFormAjouter({
                      ...DataFormAjouter,
                      date_debut: e.target.value,
                    })
                  }
                />
              </div>
              <div className="field col-12 md:col-12">
                <label htmlFor="Entreprise">pack paiement</label>
                <Dropdown
                  id="date_debut"
                  name="date_debut"
                  value={"6 mois"}
                  options={["12 mois ", " 6 mois ", " 24 mois "]}
                  //   value={DataFormAjouter.date_debut}
                  //   onChange={(e) =>
                  //     setDataFormAjouter({
                  //       ...DataFormAjouter,
                  //       date_debut: e.target.value,
                  //     })
                  //   }
                />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="date_debut">Date debut : </label>
                <InputText
                  type="date"
                  id="date_debut"
                  name="date_debut"
                  value={DataFormAjouter.date_debut}
                  onChange={(e) =>
                    setDataFormAjouter({
                      ...DataFormAjouter,
                      date_debut: e.target.value,
                    })
                  }
                />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="date_fin">Date fin :</label>
                <InputText
                  type="date"
                  name="date_fin"
                  id="date_fin"
                  value={DataFormAjouter.date_fin}
                  onChange={(e) =>
                    setDataFormAjouter({
                      ...DataFormAjouter,
                      date_fin: e.target.value,
                    })
                  }
                />
              </div>
              <div className="field col-12 md:col-12">
                <label>La pièce jointe:</label>
                <FileUpload
                  name="demo[]"
                  accept=".png,.jpg,.jpeg,.gif,.jfif,.pdf,.docx"
                  multiple
                  maxFileSize={2000000}
                  chooseLabel="Joindre"
                  uploadOptions={{ className: "hidden" }}
                  cancelOptions={{ className: "hidden" }}
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
                onClick={AjouterDomiciliation}
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
              <div className="field col-12 md:col-12">
                <label htmlFor="Entreprise">Entreprise</label>
                <Dropdown
                  id="Entreprise"
                  value={DataFormUpdate.libelle}
                  onChange={(e) =>
                    setDataFormUpdate({
                      ...DataFormAjouter,
                      libelle: e.target.value,
                    })
                  }
                  options={Entreprise}
                  placeholder="Select a Country"
                  filter
                />{" "}
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="date_debut">Date debut : </label>
                <InputText
                  type="date"
                  id="date_debut"
                  name="date_debut"
                  value={DataFormUpdate.date_debut}
                  onChange={(e) =>
                    setDataFormUpdate({
                      ...DataFormAjouter,
                      date_debut: e.target.value,
                    })
                  }
                />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="date_fin">Date fin :</label>
                <InputText
                  type="date"
                  name="date_fin"
                  id="date_fin"
                  value={DataFormUpdate.date_fin}
                  onChange={(e) =>
                    setDataFormUpdate({
                      ...DataFormAjouter,
                      date_fin: e.target.value,
                    })
                  }
                />
              </div>
              <div className="field col-12 md:col-12">
                <label>La pièce jointe:</label>
                <FileUpload
                  name="demo[]"
                  accept=".png,.jpg,.jpeg,.gif,.jfif,.pdf,.docx"
                  multiple
                  maxFileSize={2000000}
                  chooseLabel="Joindre"
                  uploadOptions={{ className: "hidden" }}
                  cancelOptions={{ className: "hidden" }}
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
                onClick={AjouterDomiciliation}
              />
            </div>
          </div>
        </Fieldset>
      </Dialog>

      <Toast ref={toast} />

      {/* Popup for delete */}
      <ConfirmDialog />
    </>
  );
};

export default EmptyPage;
