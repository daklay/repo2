import { FileUpload } from "primereact/fileupload";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import { Button } from "primereact/button";
import { SelectButton } from 'primereact/selectbutton';
import axios from "../../../api/axios";
import { Fieldset } from "primereact/fieldset";
import { InputText } from "primereact/inputtext";

export default function Reception(props) {
  const [fileUpload, setFileUpload] = useState();
  const [DataDomiciliations, setDataDomiciliations] = useState([
    {
      date: "2002/02/22",
      document: "test44.pdf"
    }
  ]);
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
  useState(() => {
    const getAllFiles = async () => {
      const response = await axios.post(`filemanager/getFiles/${props.companyId}`, { step: 6 });
      setDataDomiciliations(response.data);
      console.log(response);
      return response;
    }
    if (props.companyId) {
      getAllFiles();
    }
  }, [])
  const OpenStepper = () => {
    setVisible(true)
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
        <div className="field col-12 md:col-6">
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
        <div className="field col-12 md:col-6">
          <label>document recue:</label>
          <DataTable
            value={DataDomiciliations}
            rows={5}
          // tableStyle={{ minWidth: "50rem" }}
          >
            <Column
              field="document"
              header="document"
              // sortable
              style={{ width: "5%" }}
            ></Column>
            <Column
              field="date"
              header="date"
              // sortable
              style={{ width: "5%" }}
            ></Column>
            <Column
              header="Action"
              style={{ width: "5%" }}
              body={(Domiciliations) => (
                <div className=" flex ">
                  <Button icon="pi pi-hourglass" onClick={OpenStepper} className="mr-2" rounded />
                </div>
              )}
            ></Column>
          </DataTable>
        </div>
        <div className="field col-12 md:col-2">
          <Button label="valider" onClick={() => handleUpload(props.companyId)} />
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