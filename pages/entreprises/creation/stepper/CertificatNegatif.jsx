import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import { Dropdown } from "primereact/dropdown";
import { SelectButton } from 'primereact/selectbutton';
import { ToggleButton } from 'primereact/togglebutton';
import { RadioButton } from 'primereact/radiobutton';
import axios from "../../../api/axios";
import { Fieldset } from "primereact/fieldset";

export default function CertificatNegatif(props) {
  const options = [{ icon: 'pi pi-clock', value: "En cours" }, { icon: 'pi pi-check', value: "Validé" }, { icon: 'pi pi-check', value: "pret" }];
  const [btnStatus, setBtnStatus] = useState(options[0]);
  const [valideCn, setValideCn] = useState(false);
  const [visible2, setVisible2] = useState(false);

  //data
  const [fileUpload, setFileUpload] = useState({ certificatNegatif: "", attestation: "" });
  const [started, setStarted] = useState(false);
  const [FormUpdate, setFormUpdate] = useState({
    RepropositionCause: "refus ompic",
    autre: "",
    denomination: "",
    ice: "",
    name: "",
    date: "",
    numeroCertif: "",
    propositionDenomination: {
      prop1: "",
      prop2: "",
      prop3: ""
    }
  });
  const [status, setStatus] = useState({
    status: "",
    actionRequise: ""
  });
  const handleStatus = async () => {
    const data = {
      status: btnStatus == "En cours" ? 'PE' : btnStatus == "Validé" ? "CO" : "AP",
      current_step: props.companyId,
    };
    console.log(data)
    // const response = await axios.put(`/company/update_company/${props.companyId}`, data);
    // console.log(response)
  }
  const justifyTemplate = (option) => {
    return <i className={option.icon}></i>;
  }
  const handleActionRequise = async () => {
    const response = await axios.post(`/notification/createNotification`, {
      content: status.actionRequise,
      company_id: props.companyId,
      current_step: props.current_step,
      type: 'AR'
    });
    console.log(response);
  }
  const handleChangeDemande = (e) => {
    if (!started) {
      setStarted(e.value)
    } if (started) {
      setVisible2(true)
    }
  }
  const submitRepropositionCause = async () => {
    const response = await axios.post(`/notification/createNotification`, {
      content: FormUpdate.RepropositionCause,
      company_id: props.companyId,
      current_step: props.current_step,
      type: 'RP'
    });
    console.log(response);
  }
  useEffect(() => {
    const getCompanyInfo = async () => {
      const response = await axios.get(`/company/get_company/${props.companyId}`);
      console.log(response);
      setFormUpdate(
        {
          ...FormUpdate,
          RepropositionCause: "refus ompic",
          ice: response.data.certificatNegatif?.ice,
          date: response.data.certificatNegatif?.date.split('T')[0],
          numeroCertif: response.data.certificatNegatif?.certifNumber,
          name: response.data.certificatNegatif?.name,
          propositionDenomination: {
            prop1: response.data.name_one,
            prop2: response.data.name_two,
            prop3: response.data.name_three
          },
        }
      )
      if (response.data.certificatNegatif) {
        setValideCn(true)
      }
    }
    if (props.companyId) {
      getCompanyInfo();
    }
  }, [])
  console.log(FormUpdate);
  const handleSubmit = async () => {
    const response = await axios.post(`/stepper/certif_negatif/${props.companyId}`, {
      ice: FormUpdate.ice,
      name: FormUpdate.denomination,
      status: 'PE',
      certifNumber: FormUpdate.numeroCertif,
    });
    console.log({ ice: FormUpdate.ice, name: FormUpdate.denomination, certifNumber: FormUpdate.numeroCertif });
    console.log(response);
    if (response.data=='Comapny moved to step 2' && fileUpload.certificatNegatif && fileUpload.attestation) {
      handleUpload(props.companyId);
    }
  }
  const handleUpload = async (company_id) => {
    const formDataFile1 = new FormData();
    formDataFile1.append('file', fileUpload.certificatNegatif);
    formDataFile1.append('step', props.current_step);
    formDataFile1.append('file_type', 'ID');
    const responseFile1 = await axios.post(`/filemanager/addFile/${company_id}`, formDataFile1);
    console.log(responseFile1);
    const formDataFile2 = new FormData();
    formDataFile2.append('file', fileUpload.attestation);
    formDataFile2.append('step', props.current_step);
    formDataFile2.append('file_type', 'ID');
    const responseFile2 = await axios.post(`/filemanager/addFile/${company_id}`, formDataFile2);
    console.log(responseFile2);
  }
  return (
    <>
      {!valideCn ?
        <>
          <div className="p-fluid formgrid grid">
            <div className="field col-12 md:col-12">
              <ToggleButton onLabel="Valider la demande CN" offLabel="Commencer la demande"
                checked={started} onChange={(e) => handleChangeDemande(e)} />
            </div>
            <div className="field col-12 md:col-4">
              <Button label="Reproposition de dénomination" onClick={submitRepropositionCause} />
            </div>
            <div className="field col-12 md:col-3">
              <Dropdown
                id="date"
                name="date"
                value={FormUpdate.RepropositionCause}
                onChange={(e) =>
                  setFormUpdate({
                    ...FormUpdate,
                    RepropositionCause: e.target.value,
                  })
                }
                options={['refus ompic', 'demande client', 'autre']}
              />
            </div>
            {FormUpdate.RepropositionCause == 'autre' && <div className="field col-12 md:col-5">
              <InputText
                id="date"
                name="input"
                value={FormUpdate.autre}
                onChange={(e) =>
                  setFormUpdate({
                    ...FormUpdate,
                    autre: e.target.value
                  })
                }
              />
            </div>}
            <Dialog visible={visible2} style={{ width: '50vw' }} onHide={() => setVisible2(false)}>
              <form>
                <div className="p-fluid formgrid grid">
                  <div className="flex flex-wrap gap-3">
                    <p>Dénomination: </p>
                    <div className="flex align-items-center">
                      <RadioButton inputId="ingredient1" name="pizza" value={FormUpdate.propositionDenomination.prop1} onChange={(e) => setFormUpdate({ ...FormUpdate, denomination: e.value })} checked={FormUpdate.denomination === FormUpdate.propositionDenomination.prop1} />
                      <label htmlFor="ingredient1" className="ml-2">{FormUpdate.propositionDenomination.prop1}</label>
                    </div>
                    <div className="flex align-items-center">
                      <RadioButton inputId="ingredient2" name="pizza" value={FormUpdate.propositionDenomination.prop2} onChange={(e) => setFormUpdate({ ...FormUpdate, denomination: e.value })} checked={FormUpdate.denomination === FormUpdate.propositionDenomination.prop2} />
                      <label htmlFor="ingredient2" className="ml-2">{FormUpdate.propositionDenomination.prop2}</label>
                    </div>
                    <div className="flex align-items-center">
                      <RadioButton inputId="ingredient3" name="pizza" value={FormUpdate.propositionDenomination.prop3} onChange={(e) => setFormUpdate({ ...FormUpdate, denomination: e.value })} checked={FormUpdate.denomination === FormUpdate.propositionDenomination.prop3} />
                      <label htmlFor="ingredient3" className="ml-2">{FormUpdate.propositionDenomination.prop3}</label>
                    </div>
                  </div>
                  <div className="field col-12 md:col-12">
                    <label htmlFor="adresse">ICE: </label>
                    <InputText
                      id="date"
                      name="date"
                      value={FormUpdate.ice}
                      onChange={(e) =>
                        setFormUpdate({
                          ...FormUpdate,
                          ice: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="field col-12 md:col-12">
                    <label htmlFor="adresse">Date: </label>
                    <InputText
                      id="date"
                      type='date'
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
                  <div className="field col-12 md:col-12">
                    <label htmlFor="adresse">Numero certificat négatif: </label>
                    <InputText
                      id="date"
                      name="date"
                      value={FormUpdate.numeroCertif}
                      onChange={(e) =>
                        setFormUpdate({
                          ...FormUpdate,
                          numeroCertif: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="field col-12 md:col-6">
                    <label>Certificat negative:</label>
                    <FileUpload
                      name="demo[]"
                      customUpload={true}
                      uploadHandler={(e) => setFileUpload({ ...fileUpload, certificatNegatif: e.files[0] })}
                      accept=".png,.jpg,.jpeg,.gif,.jfif,.pdf,.docx"
                      multiple
                      maxFileSize={2000000}
                      chooseLabel="Joindre"
                      cancelOptions={{ className: "hidden" }}
                    />
                  </div>
                  <div className="field col-12 md:col-6">
                    <label>Attestation ice:</label>
                    <FileUpload
                      name="demo[]"
                      customUpload={true}
                      uploadHandler={(e) => setFileUpload({ ...fileUpload, attestation: e.files[0] })}
                      accept=".png,.jpg,.jpeg,.gif,.jfif,.pdf,.docx"
                      multiple
                      maxFileSize={2000000}
                      chooseLabel="Joindre"
                      cancelOptions={{ className: "hidden" }}
                    />
                  </div>
                </div>
                <div className="flex justify-content-between center_media mt-2">
                  <div>
                    <Button
                      type="button"
                      className="p-button-danger"
                      onClick={() => setVisible2(false)}
                      label="Fermer"
                    />
                  </div>
                  <div>
                    <Button
                      type="button"
                      className="p-button-success"
                      label=" Valider "
                      onClick={() => {
                        handleSubmit()
                        setVisible2(false)
                        setValideCn(true)
                      }}
                    />
                  </div>
                </div>
              </form>
            </Dialog>
          </div>
        </> :
        <div>
          <p>Dénomination validée:{FormUpdate.name}</p>
          <p>ICE:{FormUpdate.ice}</p>
          <p>Numéro de certificat :{FormUpdate.numeroCertif}</p>
          <p>Date de certificat:{FormUpdate.date}</p>
          <div className="p-fluid formgrid grid">
            {/* <div className="field col-12 md:col-3">
              <Button label="Telecharger CN" icon="pi pi-check" />
            </div>
            <div className="field col-12 md:col-4">
              <Button label="Telecharger attestation ICE" icon="pi pi-check" />
            </div> */}
            {/* <div className="field col-12 md:col-4">
              <Button label="Envoyer les document" icon="pi pi-check" />
            </div> */}
          </div>
        </div>
      }
      <div className="flex">
        <Fieldset className="mt-3" style={{ width: '20%', height: '140px' }} legend="Status de l'étape">
          <form>
            <div className="p-fluid formgrid grid">
              <div className="flex justify-content-center">
                <SelectButton value={btnStatus} onChange={(e) => {
                  setBtnStatus(e.value);
                  console.log(e.value);
                  handleStatus();
                }}
                  options={options} itemTemplate={justifyTemplate} />
              </div>

            </div>
          </form>
        </Fieldset>
        <Fieldset className="mt-3" style={{ width: '80%', height: '140px' }} legend="Action requise">
          <form>
            <div className="p-fluid formgrid grid">
              <div className="field col-12 md:col-8">
                <InputText
                  id="nom"
                  name="nom"
                  value={status.actionRequise}
                  placeholder="Action requise"
                  onChange={(e) =>
                    setStatus({
                      ...status,
                      actionRequise: e.target.value,
                    })
                  }
                />
              </div>
              <div className="field col-12 md:col-4">
                <Button label="envoyer au client" onClick={handleActionRequise} />
              </div>
            </div>
          </form>
        </Fieldset>
      </div>
    </>
  )
}