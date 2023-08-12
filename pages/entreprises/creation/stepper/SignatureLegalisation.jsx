import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { SelectButton } from 'primereact/selectbutton';
import { useState } from "react";
import axios from "../../../api/axios";
import { Fieldset } from "primereact/fieldset";
import GetFiles from "../components/GetFiles";
import Status from "../components/Status";

export default function SignatureLegalisation(props) {
  const [signatureNot, setSignatureNot] = useState();
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

  const sendNotif = async () => {
    const Formdata = new FormData();
    Formdata.append('company_id', props.companyId);
    Formdata.append('current_step', props.current_step);
    Formdata.append('type', 'FI');
    Formdata.append('content', 'testt');
    // console.log(Formdata);
    for (const entry of Formdata.entries()) {
      console.log(entry);
    }
    const response = await axios.post('notification/createNotification/9', Formdata);
    console.log(response);
    return response
  }
  return (
    <>
      <div className="field col-12 md:col-12">
        <Button
          type="button"
          className="p-button-success"
          label="envoyer les documents"
          onClick={() => sendNotif()}
        />
      </div>
      <GetFiles companyId={props.companyId} step={props.current_step}/>
      <Status endpoint={`stepper/signature/${props.companyId}`} companyId={props.companyId} current_step={props.current_step}/>
    </>
  )
}