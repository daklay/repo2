import { useState } from "react";
import { SelectButton } from 'primereact/selectbutton';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import GetFiles from "../components/GetFiles";
import Status from "../components/Status";

export default function Cnss(props) {
  const [cnssNot, setCnssNot] = useState();
  const [DataFormUpdate, setDataFormUpdate] = useState({
    numeroAffiliation: ""
  });
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
        <div className="field col-12 md:col-10">
          {/* <label htmlFor="">Numero rc</label> */}
          <InputText
            name="date_debut"
            value={DataFormUpdate.numeroAffiliation}
            placeholder='numero affiliation'
            onChange={(e) =>
              setDataFormUpdate({
                ...DataFormUpdate,
                numeroAffiliation: e.target.value,
              })
            }
          />
        </div>
        <div className="field col-12 md:col-2">
          <Button label="save" onClick={() => handleSubmitAdresse('bail')} />
        </div>
        <div className="field col-12 md:col-3">
          <Button
            type="button"
            className="p-button-success"
            label="telecharger cnss"
          />
        </div>
      </div>
    <GetFiles companyId={props.companyId} step={props.current_step}/>
    <Status endpoint={`stepper/cnss/${props.companyId}`} companyId={props.companyId} current_step={props.current_step}/>
    </>
  )
}