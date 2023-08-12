import { FileUpload } from "primereact/fileupload";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import { Button } from "primereact/button";
import { SelectButton } from 'primereact/selectbutton';
import axios from "../../../api/axios";
import { Fieldset } from "primereact/fieldset";
import { InputText } from "primereact/inputtext";
import GetFiles from "../components/GetFiles";
import Status from "../components/Status";

export default function Reception(props) {
  const [fileUpload, setFileUpload] = useState();
  const options = [{ icon: 'pi pi-clock', value: "En cours" }, { icon: 'pi pi-check', value: "Validé" }, { icon: 'pi pi-check', value: "pret" }];
  const [value, setValue] = useState(options[0]);
  const [btnStatus, setBtnStatus] = useState(options[0]);
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

  const handleUpload = async (company_id) => {
    const formData = new FormData();
    formData.append('file', fileUpload);
    formData.append('step', props.current_step);
    formData.append('file_type', 'ID');
    const response = await axios.post(`/filemanager/addFile/${company_id}`, formData);
    console.log(response);
  }
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
  return (
    <>
      <div className="p-fluid formgrid grid">
        <div className="field col-12 md:col-12">
          <label>importer les document:</label>
          <FileUpload
            name="demo[]"
            customUpload={true}
            uploadHandler={(e) => setFileUpload(e.files[0])}
            accept=".png,.jpg,.jpeg,.gif,.jfif,.pdf,.docx"
            multiple
            maxFileSize={2000000}
            chooseLabel="Joindre"
            cancelOptions={{ className: "hidden" }}
          />
        </div>
        <div className="field col-12 md:col-2">
          <Button label="valider" onClick={() => handleUpload(props.companyId)} />
        </div>
        <GetFiles companyId={props.companyId} step={props.current_step}/>
        <div className="field col-12 md:col-2">
          <Button label="valider" onClick={() => handleUpload(props.companyId)} />
        </div>
      </div>
      <Status endpoint={`stepper/reception/${props.companyId}`} companyId={props.companyId} current_step={props.current_step}/>
    </>
  )
}