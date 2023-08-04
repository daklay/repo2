import { InputText } from "primereact/inputtext";
import { Fieldset } from "primereact/fieldset";
import { Dropdown } from "primereact/dropdown";
import { useRef, useState } from "react";

export default function Personne(props) {
  const [StepperFormUpdate, setStepperFormUpdate] = useState({
    position: "",
    nom: "",
    prenom: "",
    parts: "",
    date: "+212",
    nationalite: "",
    ville: "",
    typePiece: "",
    pieceNumero: "",
  });
  return (
    <Fieldset legend="Personne" className="mt-3">
      <form>
        <div className="p-fluid formgrid grid">
          <div className="field col-12 md:col-3">
            <label htmlFor="position">Position: </label>
            <Dropdown
              id="date"
              name="date"
              value={StepperFormUpdate.position}
              onChange={(e) =>
                setStepperFormUpdate({
                  ...StepperFormUpdate,
                  position: e.target.value,
                })
              }
              options={['associe', 'gerant', 'associe & gerant']}
            />
          </div>
          <div className="field col-12 md:col-3">
            <label htmlFor="adresse">nom: </label>
            <InputText
              id="date"
              name="date"
              value={StepperFormUpdate.nom}
              onChange={(e) =>
                setStepperFormUpdate({
                  ...StepperFormUpdate,
                  nom: e.target.value,
                })
              }
            />
          </div>
          <div className="field col-12 md:col-3">
            <label htmlFor="adresse">prenom: </label>
            <InputText
              id="date"
              name="date"
              value={StepperFormUpdate.prenom}
              onChange={(e) =>
                setStepperFormUpdate({
                  ...StepperFormUpdate,
                  prenom: e.target.value,
                })
              }
            />
          </div>
          <div className="field col-12 md:col-3">
            <label htmlFor="adresse">parts: </label>
            <InputText
              id="date"
              name="date"
              value={StepperFormUpdate.parts}
              onChange={(e) =>
                setStepperFormUpdate({
                  ...StepperFormUpdate,
                  parts: e.target.value,
                })
              }
            />
          </div>
          <div className="field col-12 md:col-4">
            <label htmlFor="adresse">Date naissance: </label>
            <InputText
              id="date"
              type="date"
              name="date"
              value={StepperFormUpdate.date}
              onChange={(e) =>
                setStepperFormUpdate({
                  ...StepperFormUpdate,
                  date: e.target.value,
                })
              }
            />
          </div>
          <div className="field col-12 md:col-4">
            <label htmlFor="position">Nationalité : </label>
            <Dropdown
              id="date"
              name="date"
              value={StepperFormUpdate.nationalite}
              onChange={(e) =>
                setStepperFormUpdate({
                  ...StepperFormUpdate,
                  nationalite: e.target.value,
                })
              }
              options={['maroc', 'us']}
            />
          </div>
          <div className="field col-12 md:col-4">
            <label htmlFor="position">Ville : </label>
            <Dropdown
              id="date"
              name="date"
              value={StepperFormUpdate.ville}
              onChange={(e) =>
                setStepperFormUpdate({
                  ...StepperFormUpdate,
                  ville: e.target.value,
                })
              }
              options={['casa', 'rabat']}
            />
          </div>
          <div className="field col-12 md:col-6">
            <label htmlFor="position">Type piece d&apos;identité: </label>
            <Dropdown
              id="date"
              name="date"
              value={StepperFormUpdate.typePiece}
              onChange={(e) =>
                setStepperFormUpdate({
                  ...StepperFormUpdate,
                  typePiece: e.target.value,
                })
              }
              options={["carte d'identitre nationale", "passport", "carte de sejour"]}
            />
          </div>
          <div className="field col-12 md:col-6">
            <label htmlFor="adresse">N° piece d&apos;identité: </label>
            <InputText
              id="date"
              name="date"
              value={StepperFormUpdate.pieceNumero}
              onChange={(e) =>
                setStepperFormUpdate({
                  ...StepperFormUpdate,
                  pieceNumero: e.target.value,
                })
              }
            />
          </div>
        </div>
      </form>
    </Fieldset>
  )
}