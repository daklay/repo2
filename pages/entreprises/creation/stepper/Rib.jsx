import { useState } from "react";
import { SelectButton } from 'primereact/selectbutton';
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Fieldset } from "primereact/fieldset";

export default function Rib() {
  const [ribNot, setRibNot] = useState();
  const [DataFormUpdate, setDataFormUpdate] = useState({
    rib: ""
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
  return (<>
    <div className="p-fluid formgrid grid">
      <div className="field col-12 md:col-10">
        {/* <label htmlFor="">Numero rc</label> */}
        <InputText
          name="date_debut"
          value={DataFormUpdate.rib}
          placeholder='numero rib'
          onChange={(e) =>
            setDataFormUpdate({
              ...DataFormUpdate,
              rib: e.target.value,
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
          label="telecharger rib"
        />
      </div>
    </div>
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