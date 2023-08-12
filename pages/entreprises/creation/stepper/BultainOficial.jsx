import { FileUpload } from "primereact/fileupload";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import { Button } from "primereact/button";
import { SelectButton } from 'primereact/selectbutton';
import { InputText } from "primereact/inputtext";
import { Fieldset } from "primereact/fieldset";
import GetFiles from "../components/GetFiles";
import Status from "../components/Status";

export default function BultainOficial(props) {
  const [bultainNot, settBultainNot] = useState();
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
  return (
    <>
      <div className="p-fluid formgrid grid">
        <div className="field col-12 md:col-12">
          <label>importer les document:</label>
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
        <div className="field col-12 md:col-3">
          <Button
            type="button"
            className="p-button-success"
            label="envoyer le document"
          />
        </div>
      </div>
    <GetFiles companyId={props.companyId} step={props.current_step}/>
    <Status endpoint={`stepper/bultain/${props.companyId}`} companyId={props.companyId} current_step={props.current_step}/>
    </>
  )
}