import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import { useEffect, useState } from "react";
import axios from '../../../api/axios';

export default function Status(props) {
  const options = [{ icon: 'pi pi-clock', value: "PE" }, { icon: 'pi pi-check', value: "CO" }, { icon: 'pi pi-check', value: "AP" }];
  const [value, setValue] = useState(options[0]);
  const [btnStatus, setBtnStatus] = useState('');
  const [status, setStatus] = useState({
    status: "",
    actionRequise: ""
  });
  const handleStatus = async () => {
    const data = {
      status: btnStatus,
    };
    console.log(data);
    if(data.status){
      const response = await axios.put(props.endpoint,data);
      console.log(response)
    }
  }
  const justifyTemplate = (option) => {
    return <i className={option.icon}></i>;
  }
  useEffect(()=>{
    const getStatus =async ()=>{
      const response = await axios.get(`/stepper/statutsOfSteppers/${props.companyId}`);
      setBtnStatus(response.data[props.current_step]);
      console.log(response.data[props.current_step]);
      console.log(response)
    }
    getStatus();
  },[])
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
  )
}