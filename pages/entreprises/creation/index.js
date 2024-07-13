import React, { useEffect, useState } from "react";
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

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

//stepper
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import ButtonS from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Domiciliation from "./stepper/Domiciliation";
import Statusjuridrique from "./stepper/Statusjuridrique";
import RegistreCommerce from "./stepper/RegistreCommerce";
import SignatureLegalisation from "./stepper/SignatureLegalisation";
import Reception from "./stepper/Reception";
import EnregistrerDocument from "./stepper/EnregistrerDocument";
import ValidationRc from "./stepper/ValidationRc";
import TaxProfesionelle from "./stepper/TaxProfesionelle";
import IdentifiantFiscale from "./stepper/IdentifiantFiscale";
import Jal from "./stepper/Jal";
import BultainOficial from "./stepper/BultainOficial";
import Model7 from "./stepper/Model7";
import Rib from "./stepper/Rib";
import Cnss from "./stepper/Cnss";
import Denomination from "./stepper/Denomination";
import CertificatNegatif from "./stepper/CertificatNegatif";
import axios from "../../api/axios";

const EmptyPage = () => {
  const [visible, setVisible] = useState(false);
  const Entreprise = ["Meta", "Appel", "Tesla", "AliBaba", "AliMama"];
  const [ShowForm, setShowForm] = useState(false);
  const [ShowFormUpdate, setShowFormUpdate] = useState(false);

  const [DataFormAjouter, setDataFormAjouter] = useState({
    libelle: "",
    telephone: "",
    ville: "",
    email: "",
  });

  const [DataFormUpdate, setDataFormUpdate] = useState({
    libelle: "",
    telephone: "",
    ville: "",
    email: "",
  });

  const [DataSearch, setDataSearch] = useState({
    libelle: "",
    telephone: "",
    ville: "",
    email: "",
  });

  const [Loading, setLoading] = useState(true);

  const router = useRouter();

  const [DataDomiciliations, setDataDomiciliations] = useState([{
    id: 1,
    libelle:  "test1",
    email: "test@gmail.com",
    telephone: "042425234",
    etat: "noncomplete",
    etap_active: "test",
  }]);

  useEffect(() => {
    const getAllCompanies = async () => {
      const response = await axios.get(
        "/company/get_companies?page_size=30&page=1"
      );
      setDataDomiciliations((prevDataDomiciliations) => [
        ...prevDataDomiciliations,
        ...response.data.data.map((company) => ({
          id: company.id,
          libelle: company.name ? company.name : "test1",
          email: company.user?.email,
          telephone: company.user?.phone,
          etat: company.completed ? "complete" : "noncomplete",
          etap_active: company.current_step,
        })),
      ]);
      console.log(response);
      return response;
    };
    getAllCompanies();
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
  console.log(DataDomiciliations);
  const toast = useRef(null);

  const accept = () => {
    toast.current.show({
      severity: "success",
      summary: "Deleted",
      detail: "You have Deleted",
      life: 3000,
    });
  };

  const DeleteDomiciliations = async (company) => {
    confirmDialog({
      message: "Do you want to delete this ?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept,
      // reject,
    });
    const response = await axios.delete(`company/delete_company/${company.id}`);
    console.log(response);
  };
  const OpenStepper = (companyId) => {
    setVisible(true);
    // console.log(companyId.id);
    setCompanyId(companyId.id);
  };

  const HandelDataSearch = (e) => {
    const { name, value } = e.target;
    setDataSearch({ ...DataSearch, [name]: value });
  };

  const ClearDataSearch = () => {
    setDataSearch({
      libelle: "",
      telephone: "",
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

  //#####stepper###########
  const options = ["En cours", "Validé", "Prêt"];
  const [btnStatus, setBtnStatus] = useState(options[0]);
  const [StepperFormUpdate, setStepperFormUpdate] = useState({
    nom: "",
    prenom: "",
    civilite: "",
    email: "",
    telephone: "+212",
    date: "",
    nationalite: "",
    ville: "",
    code_postal: "",
    adresse: "",
    nature_service: "",
    nature_activite: "",
  });
  //this is just the first step the others are not complete yet
  const [checked, setChecked] = useState(false);
  const [valideCn, setValideCn] = useState(false);
  const [visible2, setVisible2] = useState(false);
  // const [btnSelecet, setBtnSelecet] = useState(false);
  const [activeStep, setActiveStep] = React.useState(3);
  // const [radiobtnpv, setRadiobtnpv] = useState('');
  const [ingredient, setIngredient] = useState("");
  // const [stepperPersonne, setStepperPersonne] = useState([{ id: 1 }]);

  // const handleAddPerson = () => {
  //   const newPerson = { id: Date.now() };
  //   setStepperPersonne([...stepperPersonne, newPerson]);
  // };

  // const handleRemovePerson = (id) => {
  //   const updatedPersons = stepperPersonne.filter((person) => person.id !== id);
  //   setStepperPersonne(updatedPersons);
  // };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleChangeDemande = (e) => {
    if (!checked) {
      setChecked(e.value);
    }
    if (checked) {
      setVisible2(true);
    }
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  const [companyId, setCompanyId] = useState(false);

  const steps = [
    {
      label: "Proposition de Dénomination",
      description: (
        <Denomination
          setCompanyId={setCompanyId}
          companyId={companyId}
          current_step={0}
        />
      ),
    },
    {
      label: "Demande de Certificat Négatif",
      description: <CertificatNegatif companyId={companyId} current_step={1} />,
    },
    {
      label: "Domiciliation",
      description: <Domiciliation companyId={companyId} current_step={2} />,
    },
    {
      label: "Status juridique",
      description: <Statusjuridrique companyId={companyId} current_step={3} />,
    },
    {
      label: "Registre commerce",
      description: <RegistreCommerce companyId={companyId} current_step={4} />,
    },
    {
      label: "Signature / Legalisation",
      description: (
        <SignatureLegalisation companyId={companyId} current_step={5} />
      ),
    },
    {
      label: "Reception les documents",
      description: <Reception companyId={companyId} current_step={6} />,
    },
    {
      label: "Enregistrer les documents",
      description: (
        <EnregistrerDocument companyId={companyId} current_step={7} />
      ),
    },
    {
      label: "Validation register de commerce",
      description: <ValidationRc companyId={companyId} current_step={8} />,
    },
    {
      label: "Tax profesionelle",
      description: <TaxProfesionelle companyId={companyId} current_step={9} />,
    },
    {
      label: "Identifiant Fiscale",
      description: (
        <IdentifiantFiscale companyId={companyId} current_step={10} />
      ),
    },
    {
      label: "journal d annoce legal",
      description: <Jal companyId={companyId} current_step={11} />,
    },
    {
      label: "Bultain Oficial",
      description: <BultainOficial companyId={companyId} current_step={12} />,
    },
    {
      label: "Modele 7",
      description: <Model7 companyId={companyId} current_step={13} />,
    },
    {
      label: "Compte bancaire(RIB)",
      description: <Rib companyId={companyId} current_step={14} />,
    },
    {
      label: "CNSS",
      description: <Cnss companyId={companyId} current_step={15} />,
    },
  ];

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
                    id="date_debut"
                    name="date_debut"
                    value={DataSearch.ville}
                    onChange={HandelDataSearch}
                  />
                </div>
                <div className="field col-12 md:col-3">
                  <label htmlFor="email">email :</label>
                  <InputText
                    type="email"
                    id="date_fin"
                    name="date_fin"
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
                  setVisible(true);
                  setCompanyId(null);
                }}
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
              dataKey="id"
              rows={5}
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column
                field="libelle"
                header="Libellé du entreprisee"
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
                body={(Domiciliations, id) => (
                  <span
                    className="order-badge order-pending"
                    style={{ textTransform: "lowercase" }}
                  >
                    {Domiciliations.etat}
                  </span>
                )}
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
                      icon="pi pi-hourglass"
                      onClick={() => OpenStepper(DataDomiciliations)}
                      className="mr-2"
                      rounded
                    />
                    {/*//!m here */}
                    {/* <Button label="Show" icon="pi pi-external-link" onClick={OpenStepper} /> */}
                    <Button
                      icon="pi pi-trash"
                      onClick={() => DeleteDomiciliations(DataDomiciliations)}
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
              <div className="field col-12 md:col-12">
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
      {/* ############### stepper ###############*/}
      <Dialog
        header="Etapes de création"
        visible={visible}
        maximizable
        // maximized
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <Box>
          {/**sx={{ maxWidth: 500 }} */}
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel
                // optional={
                //   index === 2 ? (
                //     <Typography variant="caption">Last step</Typography>
                //   ) : null
                // }
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  <Box sx={{ mb: 2, mt: 3 }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <ButtonS
                        disabled={index === 0}
                        variant="contained"
                        startIcon={<ChevronLeftIcon />}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Précédent
                      </ButtonS>
                      <ButtonS
                        variant="contained"
                        endIcon={<ChevronRightIcon />}
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {/* pi-angle-double-left   pi-angle-double-right */}
                        {index === steps.length - 1 ? "Finish" : "Suivant"}
                      </ButtonS>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              {/* <Typography>All steps completed - you&apos;re finished</Typography>
              <ButtonS onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </ButtonS> */}
            </Paper>
          )}
        </Box>
        {/* <Fieldset legend="Formulaire de recherche">
          <form>
            <div className="p-fluid formgrid grid">
              <div className="field col-12 md:col-12">
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
        </Fieldset> */}
      </Dialog>

      {/* Popup for delete */}
      <ConfirmDialog />
    </>
  );
};

export default EmptyPage;
