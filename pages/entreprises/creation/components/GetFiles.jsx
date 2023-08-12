import { Button } from "@mui/material";
import { Column } from "jspdf-autotable";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react"
import axios from "../../../api/axios";


export default function GetFiles(props) {
  const [files, setFiles] = useState([]);
  useEffect(()=>{
    const getAllFiles = async () => {
      const response = await axios.post(`filemanager/getFiles/${props.companyId}`, { step: props.step });
      setFiles(response.data);
      console.log(response);
      return response;
    }
    if (props.companyId) {
      getAllFiles();
    }
    console.log(props.companyId);
    console.log(props);
  },[])
  const OpenStepper = () => {
    setVisible(true)
  }
  return (
    <div className="field col-12 md:col-12">
      <label>document recue:</label>
      <DataTable
        value={files}
        rows={5}
      // tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          field="type"
          header="type"
          // sortable
          style={{ width: "5%" }}
        ></Column>
        <Column
          field="description"
          header="description"
          // sortable
          style={{ width: "5%" }}
        ></Column>
        <Column
          field="file"
          header="file"
          // sortable
          style={{ width: "5%" }}
        ></Column>
        <Column
          header="Action"
          style={{ width: "5%" }}
          body={(Domiciliations) => (
            // <div className="flex ">
            //   <Button icon="pi pi-file-pdf" onClick={OpenStepper} className="mr-2" rounded />
            // </div>
            <a href={`https://mapp.pubsilon.com${Domiciliations.file}`} target="_blank">open</a>
          )}
        ></Column>
      </DataTable>
    </div>
  )
}