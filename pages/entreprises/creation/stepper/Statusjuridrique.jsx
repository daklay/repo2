import { Fieldset } from "primereact/fieldset";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { RadioButton } from 'primereact/radiobutton';
import Personne from '../Personne';
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { Editor } from "primereact/editor";
import { SelectButton } from 'primereact/selectbutton';
import axios from '../../../api/axios';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { useReactToPrint } from "react-to-print";

export default function Statusjuridrique(props) {
  const [statusNot, seStatusNot] = useState();
  const [StepperFormUpdate, setStepperFormUpdate] = useState({
    formeJuridrique: "",
    capital: "",
    pvGerance: "",
    adresse: ""
  });
  const [statusj, setStatusj] = useState(`<div class="ql-editor" data-gramm="false" contenteditable="true"><p class="ql-align-center"><br></p><p class="ql-align-center"> <strong>«…………………. » ..... </strong></p><p class="ql-align-center"><u>AU CAPITAL DE</u><strong><u> …………………..,00DHS</u></strong></p><p class="ql-align-center"><u>SIEGE SOCIAL : ………………………………………………………………</u></p><p class="ql-align-center"><br></p><p class="ql-align-center"> </p><p><br></p><p class="ql-align-center"><strong><u>STATUTS</u></strong></p><p><br></p><p><strong><u>Entre les soussignés</u> :</strong></p><p class="ql-align-justify"><strong>1°/ ………………………..</strong>de Nationalité <strong>………………,</strong> né le <strong>…………………….., </strong>titulaire de la CIN N°<strong>…………………………., </strong>demeurant à<strong> …………………………………………………….</strong></p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong>2°/ ………………………….. de</strong> Nationalité <strong>…………………………</strong>, né le <strong>………………………, </strong>titulaire de la CIN N°<strong>…………………………., </strong>demeurant à<strong> ……………………………………………..</strong></p><p><br></p><p><br></p><p>Ont établi, ainsi qu'il suit, les statuts de la société qu'ils ont convenu de créer.</p><p><br></p><p class="ql-align-center"><u>TITRE PREMIER</u></p><p class="ql-align-center"><u>FORMATION - DENOMINATION- OBJET - SIEGE - DUREE</u></p><p><br></p><p><strong><u>ARTICLE 1° : FORMATION.</u></strong></p><p>Les soussignés, propriétaire des parts ci-après et de celles qui pourront l’être ultérieurement, ont formé une société à responsabilité limitée qui sera régie par la législation en vigueur au Maroc notamment par la loi N° 5-96 promulguée par le Dahir 1-97-49 du 5 choual 1417 (13 février 1997) portant promulgation de la loi N° 5-96, notamment en ses articles 44 à 87 et par les présents statuts.</p><p><br></p><p><strong><u>ARTICLE 2°: DENOMINATION</u>:  ………………………………… SARL </strong></p><p class="ql-align-justify"><strong><u>ARTICLE 3° : OBJET</u></strong></p><p class="ql-align-justify"><br></p><p>La société a pour objet, directement ou indirectement, au Maroc et en tous pays et autres pays, soit pour elle, soit pour le compte de tiers, les opérations suivantes qui sont énonciatives et non limitatives&nbsp;:</p><p><br></p><ul><li class="ql-align-justify">……………………………………………………</li><li><br></li><li class="ql-align-justify">Et plus généralement, toutes opérations commerciales, industrielles, financières, mobilières ou immobilières se rattachant directement ou indirectement à l’un quelconque des objets précités, ou à tous objets similaires ou connexes, et susceptibles de favoriser le développement de la société&nbsp;;&nbsp;</li></ul><p>	</p><p><br></p><p class="ql-align-justify"><strong><u>ARTICLE 4° : SIEGE SOCIAL&nbsp;:	</u></strong></p><p><strong>Le siège Social est fixé au : ………………………………………………………………….</strong></p><p>Il pourra être transféré en tout autre endroit de la même ville ou dans une autre localité du Maroc par décision de la majorité des Associés.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong><u>ARTICLE 5° : DUREE</u></strong></p><p class="ql-align-justify">La durée de la société est fixée à 99 années consécutives à dater de sa constitution.</p><p class="ql-align-justify">Une décision prise en Assemblée Extraordinaire des Associés peut également, à tout moment, prononcer la dissolution anticipée de la société.</p><p class="ql-align-justify">Dans tous les cas de dissolution, le ou les Associés qui se prononceront pour la constitution de la société peuvent racheter ou faire racheter la totalité des parts du ou des Associés ayant demandé la dissolution, dans les conditions prévues ci-après pour l’exercice du droit de préemption.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong><u>ARTICLE 6° : APPORTS EN NUMERAIRES</u></strong></p><p>Les associés font à la présente société l’apport suivant : </p><p>…………………………………<strong>..	 ………………… </strong></p><p>…………………………………<strong>.. ..………………</strong></p><p> </p><p><strong>Total …………………. dhs</strong></p><p class="ql-align-justify"><u> </u></p><p class="ql-align-justify"><strong><u>ARTICLE 7° : CAPITAL </u></strong></p><p>Le capital est fixé à la somme <strong>……………………. (…………….,00dhs)</strong> divisé en <strong>…………….. parts de 100 Dirhams</strong> chacune, attribuées à l'associé en fonction de ses apports à savoir :</p><p>………………………………………… <strong>	 …….. parts </strong></p><p>…………………………………………<strong> …….. parts </strong></p><p><strong>Total ……… parts </strong></p><p class="ql-align-center"> </p><p class="ql-align-justify"><strong><u>ARTICLE 8° : CAPITAL SOCIAL /AUGMENTATION OU REDUCTION DU CAPITAL</u></strong></p><p class="ql-align-justify">Le capital social peut être augmenté en une ou plusieurs fois, par la création de parts nouvelles, en vertu d’une décision des associés prise dans les termes de l’article17 ci-après.</p><p class="ql-align-justify">Ces parts nouvelles peuvent être émises en représentation d’apports en nature, soit en numéraire, soit par l’incorporation des fonds disponibles de réserve, soit exceptionnellement par des apports en industrie.</p><p class="ql-align-justify">L’augmentation de capital ne peut être attribuée qu’aux associés ou à des personnes représentées par l’un des associés et agréer dans les conditions fixées à l’article 10 ci -après pour les cessions de parts. Chaque associé ancien, à dans la proportion de ses droits sociaux, un droit de préférence à la souscription du nouveau capital.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong><u>ARTICLE 9° : PARTS SOCIALES.</u></strong></p><p class="ql-align-justify">Le titre de chaque associé résultera seulement des présents statuts, des actes ultérieurs qui pourraient modifier le capital social et des cessions qui seraient régulièrement consenties.</p><p class="ql-align-justify">Une copie ou extrait de ces actes et pièces certifiées conforme par la gérance, pourra être délivré à chaque associé, sur sa demande et à ses frais, les parts attribuées, soit lors de la constitution, soit lors de l’augmentation du capital, doivent être intégralement libérées et toutes reparties lors de leur création, elles ne peuvent jamais être représentées par des titres négociables, elles ne peuvent non plus faire l’objet d’une souscription publique.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong><u>ARTICLE</u> <u>10°:</u> <u>CESSION</u> <u>DE</u> <u>PARTS.</u></strong></p><p class="ql-align-justify">La cession des parts s’opposera par un acte notarié ou sous-seing privé signifié à la Société, ou par l’acceptation de gérance dans un acte ayant date certaine conformément au Dahir portant code des obligations et contrats. Les parts sont librement cessibles entre associés.</p><p class="ql-align-justify">La cession de parts sociales est libre entre associés ou leur conjoint.</p><p class="ql-align-justify">En cas de cession à un non associé, les associés autre que le cédant, ont un droit de préemption sur les parts à céder par ce dernier au prix projeté pour la cession ou si ce prix dépasse le prix fixé en fin d’exercice comme il sera dit à l’article 23 au prix ainsi déterminé.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong><u>ARTICLE 11°: TRANSMISSION PAR SUCCESSION</u></strong></p><p class="ql-align-justify">Les Parts Sociales seront librement transmissibles par voie de succession. Les héritiers doivent justifier de leurs qualités d’héritier et désigner un mandataire chargé de les représenter pendant la durée de l’indivision.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong><u>ARTICLE 12° : GERANCE</u></strong></p><p>Dès à présent la société est gérée et administrée par </p><p>…………………<strong>.. de</strong> Nationalité <strong>………………………</strong>, né le <strong>…………………….., </strong>titulaire de la CIN N°<strong>……………………………., </strong>demeurant à<strong> ………………………………………………………</strong></p><p><br></p><p><strong>Il </strong>est nommé <strong>gérant</strong> pour une durée illimitée.</p><p><br></p><p>- Il a les pouvoirs les plus étendus pour faire toute opération d’ordre juridique ou matérielle se rattachant directement ou indirectement à l’objet social. Il pourra notamment :</p><p class="ql-align-justify">- Représenter la société en toutes circonstances se rattachant à son objet social ou désigner toute autre personne pour les assister ou les représenter pour ce faire,</p><p class="ql-align-justify">-Représenter la société vis-à-vis de l’état et de son administration, trésor, douane, conservation foncière et plus généralement auprès de tous tiers et de toutes administrations publiques ou privées, en toutes </p><p class="ql-align-justify">Circonstances tant au Maroc qu’à l’étranger, Il peut déléguer tout ou partie de ses pouvoirs,</p><p class="ql-align-justify">- Nommer et révoquer tout agent ou employé ou représentant de cette société, fixer leurs traitements, salaires, remises, et gratifications ainsi que les conditions de leur admission, de leur révocation,</p><p class="ql-align-justify">- Faire toutes opérations rentrant dans l’objet social, passer et résilier tous marchés, les exécuter, soumissionner à toutes adjudications publiques ou privées, arrêter tout compte et signer la correspondance,</p><p class="ql-align-justify">- Tirer, accepter. Endosser, acquitter tous effets, chèques, traites, billets, lettres de change, faire tous protêts,</p><p class="ql-align-justify">-Toucher toutes sommes dues à la société et payer celles qu’elle doit donner valable quittance à tous débiteurs, fixer leur mode de libération,</p><p>- Accepter toutes garanties hypothécaires ou autres et en donner mainlevée,</p><p class="ql-align-justify">- Faire tout dépôt et cautionnement dans toutes caisses publiques ou privées et les retirer,</p><p class="ql-align-justify">- Contracter tous emprunts par voie d’ouverture de crédit ou autrement, d’un gage ou d’une hypothèque sur les biens de la société.</p><p class="ql-align-justify">- Consentir et accepter tous baux et les résilier, contracter et résilier toutes assurances contre tous risques,</p><p class="ql-align-justify">- En cas de contestation, retard ou litige dans les paiements ou difficultés quelconques, prendre toutes mesures conservatoires, transiger, compromettre, provoquer toutes expertises ou contestation soit aimable, soit judiciaire, exercer toutes poursuites, comparaître soit en demandant, soit en défendant et intervenir devant tout juge ou tribunaux à tous degrés de juridiction,</p><p class="ql-align-justify">- Former toute demande, présenter toute défense, constituer et révoquer tout défendeur, obtenir tout jugement, arrêt et autre décision, les faire signifier ou exécuter.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong><u>ARTICLE 13°: SIGNATURE</u></strong> </p><p class="ql-align-justify">La Société sera valablement engagée pour tous les actes la concernant par la signature ………………. de&nbsp;: </p><p>……………………………………………<strong>., </strong>de Nationalité <strong>……………………….</strong>, né le <strong>………………………, </strong>titulaire de la CIN N°<strong>………………………, </strong>demeurant à<strong> ……………………………………………………..</strong></p><p><br></p><p><br></p><p class="ql-align-justify"><strong><u>ARTICLE 14°: REMUNERATION DE LA GERANCE :</u></strong></p><p class="ql-align-justify">A titre de rémunération pour sa fonction, et en raison de sa responsabilité, le gérant a droit à un traitement fixe ou proportionnel dont le montant ou les modalités seront déterminées par l’Assemblée des Associés.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong><u>ARTICLE</u> <u>15°:</u> <u>DROIT</u> <u>DE</u> <u>VOTE</u></strong></p><p class="ql-align-justify">Tous les Associés ont droit de participer aux décisions collectives quel que soit le nombre des parts leur appartenant, chacun d’eux a autant de voix qu’il possède de parts sans limitation, le vote par écrit est exclusivement personnel et ne peut être exercé par mandataire, mais s’il est tenue une assemblée générale tout associé, peut s’y faire représenter par un autre associé Le Droit de vote attaché aux parts grevées d’usufruit est exercé par l’usufruitier.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong><u>ARTICLE</u> <u>16° ASSEMBLEE</u> <u>ANNUELLE</u>.</strong></p><p class="ql-align-justify">Chaque année dans les trois mois qui suivront la clôture de l’exercice social, la gérance réunit les associés en Assemblée Générale au jour, heure et lieu désignés dans l’avis de convocation à l’effet notamment de statuer sur les comptes de l’exercice écoulé, de fixer les dividendes à répartir et le prix sur lequel s’exercera le droit de préemption conférée aux associés par les articles.</p><p class="ql-align-justify">Ce prix ne pourra être inférieur à la valeur des Parts telle quelle résultera du bilan compte tenu des réserves.</p><p class="ql-align-justify">Pour se tenir valablement l’assemblée générale extraordinaire doit réunir au moins 75% (soixante Quinze Pour Cent) du Capital Social.</p><p>La gérance peut en outre, à toute époque, soumettre à la décision des Associés, au moyen d’un vote émis par écrit ou en Assemblée Générale, toutes autres propositions concernant la Société. Elle est tenue de provoquer pareille décision dans le mois de la demande qui lui en sera faite si elle est requise par un ou plusieurs Associés représentant plus du quart du Capital Social.</p><p><br></p><p class="ql-align-justify"><strong><u>ARTICLE 17°: QUORUM.</u></strong></p><p class="ql-align-justify">Les décisions collectives doivent pour être valables, être adoptées par des Associés représentant la majorité des voix et plus de la moitié du Capital Social.</p><p class="ql-align-justify">Si les Associés qui ont pris part au vote, soit par écrit, soit en Assemblée générale ne représentent pas la majorité prévue, la gérance soumet une seconde fois aux Associés, le texte des résolutions proposées. Il pourra être alors adopté à la majorité simple qu’elle soit la portion du Capital représentée par les Associés ayant participé au vote. L’unanimité est requise si le nombre des Associés est égal à deux.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong><u>ARTICLE 18°: ASSEMBLEE GENERALE EXTRAORDINAIRE</u></strong></p><p class="ql-align-justify">Les Associés peuvent apporter toute modification aux statuts sans qu’ils leur soient permis toutefois de changer la nationalité de la société ou d’obliger un des Associés à augmenter sa part sociale.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong><u>ARTICLE 19°: REGISTRE DES RESOLUTIONS.</u></strong></p><p class="ql-align-justify">La Gérance est tenue d’avoir un registre spécial pour consigner les décisions collectivement prises par les Associés et constatées en la forme de Procès-verbaux.</p><p class="ql-align-justify">Si les décisions sont prises en Assemblée Générale, les Procès-verbaux sont signés par le gérant, Président du bureau et par le secrétaire.</p><p class="ql-align-justify">Les copies ou extraits de ces Procès-verbaux, à produire en justice ou ailleurs sont signés par le gérant.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong><u>ARTICLE 20°: ANNEE SOCIALE</u></strong></p><p class="ql-align-justify">L’année Sociale commence le 1er janvier et finit le 31 décembre.</p><p class="ql-align-justify">Le premier exercice social comprendra le temps à courir depuis la constitution de la société jusqu’au 31 décembre. Il est dressé chaque année par la gérance, un état de la situation active et passive de la société qui est transcrit dans un mois de son établissement sur un registre spécial.</p><p class="ql-align-justify">Dans cet inventaire, la gérance fut subir aux divers éléments de l’actif les amortissements qu’elle juge utiles.</p><p class="ql-align-justify"><strong><u>ARTICLE 21° : REPARTITION DES BENEFICES</u></strong></p><p class="ql-align-justify">Les produits de la société par l’inventaire Annuel, déductions faite des frais généraux, des charges sociales, de tout amortissement de l’Actif Social et de toute réserve pour risques divers constituent les bénéfices nets.</p><p class="ql-align-justify">Le solde des bénéfices est réparti entre les Associés proportionnellement au nombre de Parts Sociales appartenant à chacun d’eux</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong><u>ARTIÇLE 22° COMPTES COURANTS</u></strong></p><p class="ql-align-justify">Chacun des Associés, avec le consentement de la gérance, pourra verser en compte courant ou laisser sur sa part de bénéfice ou sur le montant des intérêts qui lui sont dus, toutes les sommes dont la société aurait l’emploi, ces sommes pourront suivant décision de la gérance, être stipulées productives d’intérêt, au profit de l’associé titulaire du compte courant à compter du jour du versement au taux fixé de commun accord avec la gérance sans toutefois dépasser le taux d’intérêt bancaire en vigueur et à passer aux frais généraux.</p><p class="ql-align-justify">Ces sommes pourront être retirées à la fin du deuxième exercice suivant le dépôt, ou à tout moment avec l’accord de la gérance compte tenu de la trésorerie et de la situation financière de la société. De son côté, la gérance aura toujours le droit de rembourser à l’associé titulaire d’un compte courant, tout ou partie de sommes portées à ces comptes et dont elles n’auraient pas d’emploi.</p><p class="ql-align-justify">Les intérêts, s’il en est stipulé, cesseront de courir le jour même du retrait des dites sommes.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong><u>ARTICLE 23°: CAS DE DECES D’UN ASSOCIE</u></strong></p><p class="ql-align-justify">En cas de décès d’un associé, la société ne sera pas dissoute et continuera entre le ou les associés survivants et les héritiers ou les représentants de l’associé décédé qui devront se faire représenter par un seul d’entre eux s’il reste dans l’indivision. Les ayants droit du défunt devront justifier de leur qualité dans les trois mois du décès, en produisant à la gérance, un acte de notoriété ou un extrait d’intitulé d’inventaire, la transmission de parts sociales appartenant à l’associé décédé s’effectuera alors de plein droit au profit de ses héritiers et ayants droit. Il ne pourra être exercé aucun droit de préemption à l’encontre de cette transmission au profit des héritiers.</p><p class="ql-align-justify">Les Associés survivants n’auront aucun droit de préemption sur les parts de l’associé décédé.</p><p class="ql-align-justify">Les héritiers ou ayants droit de l’associé décédé ont droit à la portion de dividende revenant aux parts de l’associé décédé et continuent sa personne, comme nouvel associé admis d’office et sans réserve. Ils sont subrogés dans les droits de l’associé décédé.</p><p class="ql-align-justify">La dissolution d’une société associée, donne par contre aux associés restants un droit de préemption sur les parts appartenant à la société dissoute dans les conditions prévues par la loi.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong><u>ARTICLE 24°: CAS DE DECES; DE DEMISSION OU REVOCATION D’UN GERANT</u></strong></p><p class="ql-align-justify">En cas de décès, de démission ou de révocation d’un gérant les associés délibérant et votant à majorité prévue à l’article 21 ci-dessus décideront s’il y a lieu de procéder à son remplacement et le cas échéant statueront sur la nomination d’un nouveau gérant</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong><u>ARTICLE 25° : DISSOLUTION</u></strong></p><p class="ql-align-justify">La société est dissoute de plein droit après l’expiration du temps établi pour sa durée. Elle est prorogée tacitement lorsque, malgré l’expiration de la durée convenue, les associés continuent les opérations qui faisaient l’objet de la société. La prorogation tacite est censée faite d’année en année.</p><p class="ql-align-justify">Les associés peuvent, par décision représentant les trois quart (3/4) du capital social, décider la dissolution anticipée de la société.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong><u>ARTICLE 26°: LIQUIDATION</u></strong></p><p class="ql-align-justify">A l’expiration de la société, ou en cas de dissolution anticipée, la liquidation est faite par le gérant alors en fonction. Le liquidateur peut s’il le juge utile et dans l’intérêt de la société notamment, faire l’apport à une société, ou la cession à toute autre personne, de l’ensemble des biens, droits, obligations tant actifs que passifs de la société dissoute. Après l’acquit du Passif et des Charges Sociales, le produit net de la liquidation est employé tout d’abord à rembourser le montant des parts sociales, si ce remboursement n’a pas encore été opéré. Le surplus est réparti entre tous les Associés gérants ou non gérants au prorata du nombre de parts appartenant a chacun d’eux.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong><u>ARTICLE 27°: CONTESTATION</u></strong></p><p class="ql-align-justify">Toutes contestations qui pourraient s’élever entre les associés pendant la durée de la société ou lors de sa liquidation relativement aux affaires sociales seront soumises à la juridiction des tribunaux compétents de la circonscription du siège.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong><u>ARTICLE 28°: PUBLICATIONS</u></strong></p><p class="ql-align-justify">Pour effectuer les publications et dépôts des présents actes et de leurs suites conformément à la loi, tout pouvoir sont donnés au porteur d’un original ou d’une expédition des présents, tout pouvoir seront donnés aux gérants pour certifier conforme les présents statuts et requérir les publications nécessaires.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong><u>ARTICLE 29°: FRAIS</u></strong></p><p class="ql-align-justify">Les frais de timbres, rédactions, et enregistrements des présents, ainsi que ceux de dépôts et de publications et généralement tout débours occasionné par les présents seront portés à un compte de frais de constitution et amorti comme en décidera la gérance chaque année.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong><u>ARTICLE 30°: TRANSFORMATION- FUSION</u></strong></p><p class="ql-align-justify">La présente société pourra être transformée en société commerciale de toute autre forme, ou fusionner.</p><p class="ql-align-justify">Les statuts seront déposés conformément à la loi au CRI de Casablanca ou au tribunal de commerce de Casablanca</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><br></p><p> <strong>Fait à Casablanca</strong></p><p><br></p><p><br></p><p>………………………………………<strong>.</strong></p><p><br></p><p><strong>Associé</strong></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p>……………………………………<strong>..</strong></p><p><br></p><p><strong>Associé</strong></p><p><br></p><p><br></p><p><br></p><p><br></p><p>……………………………………………</p><p><strong>Gérant</strong></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p></div>`);
  const [pvdoc, setPvdoc] = useState(`<div class="p-editor-content ql-container ql-snow" style="height: 320px;"><div class="ql-editor" data-gramm="false" contenteditable="true"><p class="ql-align-center"><strong>«&nbsp;……………………………. » SARL AU</strong></p><p class="ql-align-center"><strong>SOCIETE A RESPONSABILITE LIMITEE A ASSOCIE UNIQUE </strong></p><p class="ql-align-center"><strong>AU CAPITAL DE ……………………………...00 DHS</strong></p><p class="ql-align-center"><strong>	Siege Social: ……………………………………………………………………………..</strong></p><p>	</p><p>	</p><p class="ql-align-center"><br></p><p class="ql-align-center"><strong>PROCES-VERBAL DE NOMINATION DU GERANT</strong></p><p class="ql-align-center"><strong>EN DATE DU ………………………….</strong></p><p><br></p><p><u>……………date en lettres…………………………..</u></p><p class="ql-align-justify"><br></p><p class="ql-align-justify">L’associé unique de la société <strong><em>«</em>……………………………….»<em>,</em></strong> Société à responsabilité limitée au capital social de <strong>………………………..&nbsp;,00 DHS</strong>, dont le siège social est établi à <strong><u>……………………………………………….</u><em>,</em></strong> s’est réunis ce jour à 10 heures audit siège de la société, en assemblée générale extraordinaire régulièrement constituée.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Est présent&nbsp;: </p><p class="ql-align-justify"> …………………………………<strong>.. …………….. PARTS</strong></p><p class="ql-align-justify"><strong>Total ……………. PARTS</strong></p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Total des parts présentes ou représentées&nbsp;: …………………… parts présentes ou représentées&nbsp;: ………………………parts en pleine propriété sur ……………………. parts composant le capital social. </p><p class="ql-align-justify"><br></p><p class="ql-align-center"><br></p><p class="ql-align-center">ORDRE DU JOUR</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Le dossier juridique de la société.</p><p class="ql-align-justify">Le texte des résolutions proposées.</p><p class="ql-align-justify">Divers documents.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">……………………………………… rappelle que l'ordre du jour de la présente assemblée est le suivant&nbsp;: </p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><br></p><ul><li class="ql-align-justify">Nomination et fixation des pouvoirs du gérant,</li><li class="ql-align-justify">Désignation du signataire, </li><li class="ql-align-justify">Pouvoirs à conférer,</li></ul><p class="ql-align-justify"><br></p><p class="ql-align-justify"><br></p><h2><u>PREMIERE RESOLUTION&nbsp;:</u></h2><p class="ql-align-justify"><br></p><p>L’Assemblée Générale Extraordinaire décide à compter de ce jour de nommer&nbsp;:</p><p class="ql-align-justify">……………………………<strong>., né le ………………………., titulaire de la CIN N° ……………………, demeurant au ………………………………..</strong></p><p><br></p><p>La société est gérée et administrée par <strong>…………………………………..</strong> pour une durée illimitée.</p><p><br></p><p>- Elle a les pouvoirs les plus étendus pour faire toute opération d’ordre juridique ou matérielle se rattachant directement ou indirectement à l’objet social. Elle pourra notamment :</p><p class="ql-align-justify">- Représenter la société en toutes circonstances se rattachant à son objet social ou désigner toute autre personne pour les assister ou les représenter pour ce faire,</p><p class="ql-align-justify">-Représenter la société vis-à-vis de l’état et de son administration, trésor, douane, conservation foncière et plus généralement auprès de tous tiers et de toutes administrations publiques ou privées, en toutes circonstances tant au Maroc qu’à l’étranger, Il peut déléguer tout ou partie de ses pouvoirs,</p><p class="ql-align-justify">- Nommer et révoquer tout agent ou employé ou représentant de cette société, fixer leurs traitements, salaires, remises, et gratifications ainsi que les conditions de leur admission, de leur révocation,</p><p class="ql-align-justify">- Faire toutes opérations rentrant dans l’objet social, passer et résilier tous marchés, les exécuter, soumissionner à toutes adjudications publiques ou privées, arrêter tout compte et signer la correspondance,</p><p class="ql-align-justify">- Tirer, accepter. Endosser, acquitter tous effets, chèques, traites, billets, lettres de change, faire tous protêts,</p><p class="ql-align-justify">-Toucher toutes sommes dues à la société et payer celles qu’elle doit donner valable quittance à tous débiteurs, fixer leur mode de libération,</p><p>- Accepter toutes garanties hypothécaires ou autres et en donner mainlevée,</p><p class="ql-align-justify">- Faire tout dépôt et cautionnement dans toutes caisses publiques ou privées et les retirer,</p><p class="ql-align-justify">- Contracter tous emprunts par voie d’ouverture de crédit ou autrement, d’un gage ou d’une hypothèque sur les biens de la société.</p><p class="ql-align-justify">- Consentir et accepter tous baux et les résilier, contracter et résilier toutes assurances contre tous risques,</p><p class="ql-align-justify">- En cas de contestation, retard ou litige dans les paiements ou difficultés quelconques, prendre toutes mesures conservatoires, transiger, compromettre, provoquer toutes expertises ou contestation soit aimable, soit judiciaire, exercer toutes poursuites, comparaître soit en demandant, soit en défendant et intervenir devant tout juge ou tribunaux à tous degrés de juridiction,</p><p class="ql-align-justify">- Former toute demande, présenter toute défense, constituer et révoquer tout défendeur, obtenir tout jugement, arrêt et autre décision, les faire signifier ou exécuter.</p><p class="ql-align-center"><strong><em>CETTE RESOLUTION EST ADOPTEE A L’UNANIMITE</em></strong></p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><strong><u>DEUXIEME RESOLUTION</u></strong></p><p class="ql-align-justify">La Société sera valablement engagée pour tous les actes la concernant par la signature de la gérante&nbsp;:</p><p class="ql-align-justify">…………………………………<strong>., né le ……………………….., titulaire de la CIN N° …………………, demeurant au ………………………………………………………….</strong></p><p class="ql-align-justify"><strong><u>TROIXIEME RESOLUTION </u></strong></p><p class="ql-align-justify"><br></p><p class="ql-align-justify">Tous pouvoirs sont conférés au porteur d’un original, copie ou extrait des présentes pour accomplir toutes les formalités légales prescrites.</p><p class="ql-align-justify"><br></p><p class="ql-align-center"><strong><em>CETTE RESOLUTION EST ADOPTEE A L’UNANIMITE</em></strong></p><p class="ql-align-center"><br></p><p class="ql-align-justify">Plus rien n’étant à l’ordre du jour, la séance s’est levée.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">De tout ce que dessus, il a été dressé le présent procès verbal, qui après lecture, a été signé par les associés. </p><p class="ql-align-justify"><br></p><p><br></p><p><br></p><p>……………………………………………………</p></div><div class="ql-clipboard" contenteditable="true" tabindex="-1"></div><div class="ql-tooltip ql-hidden" style="margin-top: -1446.25px;"><a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a><input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL"><a class="ql-action"></a><a class="ql-remove"></a></div></div>`);
  // const [stepperPersonne, setStepperPersonne] = useState([{ id: 1 }]);
  // const [personneFormUpdate, setPersonneFormUpdate] = useState([{
  //   id: 1,
  //   user_type: "",
  //   first_name: "",
  //   last_name: "",
  //   share: "",
  //   birth_date: "",
  //   nationality: "",
  //   adresse: "",
  //   identity_type: "",
  //   identity_number: "",
  // }]);
  const [pdfBytesStatusJuridrique, setPdfBytesStatusJuridrique] = useState();
  const [pdfBytesPvGerance, setPdfBytesPvGerance] = useState();

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

  const componentRef = React.useRef(null);
  const reactToPrintContent = React.useCallback(() => {
    console.log(componentRef.current.getContent());
    return componentRef.current.getContent();
  }, [componentRef.current]);
  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "AwesomeFileName",
    removeAfterPrint: true
  });
  const componentRef2 = React.useRef(null);
  const reactToPrintContent2 = React.useCallback(() => {
    console.log(componentRef2.current.getContent());
    return componentRef2.current.getContent();
  }, [componentRef2.current]);
  const handlePrint2 = useReactToPrint({
    content: reactToPrintContent2,
    documentTitle: "AwesomeFileName",
    removeAfterPrint: true
  });
  // const handlePersonneChange = (e, id) => {
  //   console.log('personid', id);
  //   const personToUpdate = personneFormUpdate.find(pers => pers.id == id);
  //   const updatedPersonneForms = [...personneFormUpdate];
  //   const indexToUpdate = updatedPersonneForms.findIndex(pers => pers.id === id);
  //   updatedPersonneForms[indexToUpdate] = { ...personToUpdate, [e.target.name]: e.target.value };
  //   console.log(updatedPersonneForms);
  //   setPersonneFormUpdate(updatedPersonneForms);
  // }

  const handleSubmit = async () => {
    const userDataUpdated = personneFormUpdate.map(user => {
      user.email = `${user.first_name}${user.last_name}@gmail.com`
      user.identity_type = user.identity_type === "carte d'identité nationale" ? 'CI' : user.identity_type === 'passport' ? 'PA' : 'SE'
      return user
    })
    console.log(userDataUpdated);
    const data = {
      formJuridique: StepperFormUpdate.formeJuridrique === 'SA' ? 'SA' : StepperFormUpdate.formeJuridrique === 'SARL' ? 'SR' : StepperFormUpdate.formeJuridrique === 'SAS' ? 'SAS' : StepperFormUpdate.formeJuridrique === 'ENTREPRISE INDIVIDUELLE' ? 'EI' : StepperFormUpdate.formeJuridrique === 'SNC' ? 'SNC' : StepperFormUpdate.formeJuridrique === 'SCS' ? 'SCS' : StepperFormUpdate.formeJuridrique === 'SCA' ? 'SCA' : 'SEP',
      capital: StepperFormUpdate.capital,
      management: true,
      adresse: StepperFormUpdate.pvGerance,
      statuts: "pe",
      users: userDataUpdated
    }
    console.log(data)
    const response = await axios.post(`stepper/statut_juridique/${props.companyId}`, data);
    console.log(response)
  }
  // const handleAddPerson = () => {
  //   const newPerson = { id: Date.now() };
  //   setPersonneFormUpdate([...personneFormUpdate, newPerson]);
  // };
  // const handleRemovePerson = (id) => {
  //   const updatedPersons = personneFormUpdate.filter((person) => person.id !== id);
  //   setPersonneFormUpdate(updatedPersons);
  // };

  // useEffect(() => {
  //   const generatePDFStatus = async () => {

  //     const formUrl = '../pdfs/statuts SARL(formfill).pdf';
  //     const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
  //     const pdfDoc = await PDFDocument.load(formPdfBytes);
  //     const form = pdfDoc.getForm()

  //     const field1 = form.getTextField('field1')//denomination name
  //     const field2 = form.getTextField('field1')//capital status juridrique
  //     const field3 = form.getTextField('field3')//domiciliation adresse either contrat de bail or domiciliation
  //     const field4 = form.getTextField('field4')//nom
  //     const field5 = form.getTextField('field5')//nationalite
  //     const field6 = form.getTextField('field6')//birth_date
  //     const field7 = form.getTextField('field7')//cin
  //     const field8 = form.getTextField('field8')//adresse
  //     const field9 = form.getTextField('field9')//denomination name
  //     const field10 = form.getTextField('field10')//nature d'activite
  //     const field11 = form.getTextField('field11')//this field should be edited to minimun 15 bullet
  //     const field12 = form.getTextField('field12')//domiciliation adresse either contrat de bail or domiciliation
  //     const field13 = form.getTextField('field13')//associe name
  //     const field14 = form.getTextField('field14')//associe part(capital) calcule
  //     const field15 = form.getTextField('field15')//associe part(capital) calcule
  //     const field16 = form.getTextField('field16')//total (avec condition de plusieur pdf)
  //     const field17 = form.getTextField('field17')//capitale en lettre
  //     const field18 = form.getTextField('field18')//capitale en chiffre
  //     const field19 = form.getTextField('field19')//son parts
  //     const field20 = form.getTextField('field20')//associe
  //     const field21 = form.getTextField('field21')//parts dyalo
  //     const field22 = form.getTextField('field22')//associe
  //     const field23 = form.getTextField('field23')//parts dyalo
  //     const field24 = form.getTextField('field24')//total parts
  //     const field25 = form.getTextField('field25')//gerant de (perssone) name
  //     const field26 = form.getTextField('field26')//nationalite
  //     const field27 = form.getTextField('field27')//date nessac
  //     const field28 = form.getTextField('field28')//cin
  //     const field30 = form.getTextField('field30')//signature khaliha khawya
  //     const field31 = form.getTextField('field31')//gerant name
  //     const field32 = form.getTextField('field32')//natitonalite
  //     const field33 = form.getTextField('field33')//date nessance
  //     const field34 = form.getTextField('field34')//adresse
  //     field1.setText('test')

  //     const pdfBytes = await pdfDoc.save()
  //     setPdfBytesStatusJuridrique(pdfBytes);
  //   }
  //   const generatePDFPvGerance = async () => {
  //     const formUrl = '../pdfs/pv gerance vierge(formfill).pdf';
  //     const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
  //     const pdfDoc = await PDFDocument.load(formPdfBytes);
  //     const form = pdfDoc.getForm()
  //     //! add input field in (date du )
  //     const field1 = form.getTextField('field1')//denomination name(remove au)
  //     const field2 = form.getTextField('field2')//capital
  //     const field3 = form.getTextField('field3')//adresse
  //     const field4 = form.getTextField('field4')//empty
  //     const field5 = form.getTextField('field5')//empty
  //     const field6 = form.getTextField('field6')//
  //     const field7 = form.getTextField('field7')//
  //     const field8 = form.getTextField('field8')//
  //     const field9 = form.getTextField('field9')//
  //     const field10 = form.getTextField('field10')//
  //     const field11 = form.getTextField('field11')//
  //     const field12 = form.getTextField('field12')//
  //     const field13 = form.getTextField('field13')//
  //     const field14 = form.getTextField('field14')//
  //     const field15 = form.getTextField('field15')//
  //     const field16 = form.getTextField('field16')//
  //     field1.setText('test')

  //     const pdfBytes = await pdfDoc.save()
  //     setPdfBytesPvGerance(pdfBytes);
  //   }
  //   generatePDFStatus()
  //   generatePDFPvGerance()
  // }, [])
  // const renderPDFStatus = () => {
  //   if (typeof window !== 'undefined') {
  //     const blob = new Blob([pdfBytesStatusJuridrique], { type: 'application/pdf' });
  //     const dataUrl = URL.createObjectURL(blob);

  //     return (
  //       <iframe
  //         src={dataUrl}
  //         // src={'../pdfs/rc1.pdf'}
  //         title="PDF Viewer"
  //         width="100%"
  //         height="500px"
  //       >
  //       </iframe>
  //     )
  //   }
  // }
  // const renderPDFPvGerance = () => {
  //   if (typeof window !== 'undefined') {
  //     const blob = new Blob([pdfBytesPvGerance], { type: 'application/pdf' });
  //     const dataUrl = URL.createObjectURL(blob);

  //     return (
  //       <iframe
  //         src={dataUrl}
  //         // src={'../pdfs/rc1.pdf'}
  //         title="PDF Viewer"
  //         width="100%"
  //         height="500px"
  //       >
  //       </iframe>
  //     )
  //   }
  // }
  return (
    <>
      <div className="p-fluid formgrid grid">
        <div className="col-12 md:col-12 mt-3" style={{ display: "flex", justifyContent: "space-between" }}>
          <p>Denomination valide:testss3</p>
          <p>ICE:asdfsd</p>
        </div>
      </div>
      <Fieldset>
        <form>
          <div className="p-fluid formgrid grid">
            {/* <div className="field col-12 md:col-3">
              <label htmlFor="position">Forme Juridrique: </label>
              <Dropdown
                id="date"
                name="date"
                value={StepperFormUpdate.formeJuridrique}
                onChange={(e) =>
                  setStepperFormUpdate({
                    ...StepperFormUpdate,
                    formeJuridrique: e.target.value
                  })
                }
                options={['SA', 'SARL', 'SAS', 'ENTREPRISE INDIVIDUELLE', 'SNC', 'SCS', 'SCA', 'SEP']}
              />
            </div>
            <div className="field col-12 md:col-3">
              <label htmlFor="adresse">Capital: </label>
              <InputText
                id="date"
                name="date"
                value={StepperFormUpdate.capital}
                onChange={(e) =>
                  setStepperFormUpdate({
                    ...StepperFormUpdate,
                    capital: e.target.value,
                  })
                }
              />
            </div> */}
            <div className="field col-12 md:col-6">
              <p>PV gérance : </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex align-items-center">
                  <RadioButton inputId="ingredient1" name="pizza" value="test1"
                    onChange={(e) => setStepperFormUpdate({ ...StepperFormUpdate, pvGerance: false })}
                    checked={StepperFormUpdate.pvGerance === false}
                  />
                  <label htmlFor="ingredient1" className="ml-2">Sans PV gerance</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton inputId="ingredient2" name="pizza" value="test2"
                    onChange={(e) => setStepperFormUpdate({ ...StepperFormUpdate, pvGerance: true })}
                    checked={StepperFormUpdate.pvGerance === true}
                  />
                  <label htmlFor="ingredient2" className="ml-2">Avec PV gerance</label>
                </div>
              </div>
            </div>
            {/* <div className="field col-12 md:col-12">
              <label htmlFor="adresse">adresse: </label>
              <InputText
                id="date"
                name="date"
                value={StepperFormUpdate.adresse}
                onChange={(e) =>
                  setStepperFormUpdate({
                    ...StepperFormUpdate,
                    adresse: e.target.value,
                  })
                }
              />
            </div> */}
          </div>
        </form>
      </Fieldset>
      {/* {personneFormUpdate.map(pers => (
        // <Personne key={pers.id} personneFormUpdate={personneFormUpdate} setPersonneFormUpdate={setPersonneFormUpdate} />
        <Fieldset key={pers.id} legend="Personne" className="mt-3">
          <form>
            <div className="p-fluid formgrid grid">
              <div className="field col-12 md:col-3">
                <label htmlFor="position">Position: </label>
                <Dropdown
                  id="user_type"
                  name="user_type"
                  value={pers.user_type}
                  onChange={(e) =>
                    handlePersonneChange(e, pers.id)
                  }
                  options={['associe', 'gerant', 'associe & gerant']}
                />
              </div>
              <div className="field col-12 md:col-3">
                <label htmlFor="adresse">nom: </label>
                <InputText
                  id="first_name"
                  name="first_name"
                  value={pers.first_name}
                  onChange={(e) =>
                    handlePersonneChange(e, pers.id)
                  }
                />
              </div>
              <div className="field col-12 md:col-3">
                <label htmlFor="adresse">prenom: </label>
                <InputText
                  id="last_name"
                  name="last_name"
                  value={pers.last_name}
                  onChange={(e) =>
                    handlePersonneChange(e, pers.id)
                  }
                />
              </div>
              <div className="field col-12 md:col-3">
                <label htmlFor="adresse">parts: </label>
                <InputText
                  id="parts"
                  name="share"
                  value={pers.share}
                  onChange={(e) =>
                    handlePersonneChange(e, pers.id)
                  }
                />
              </div>
              <div className="field col-12 md:col-4">
                <label htmlFor="adresse">Date naissance: </label>
                <InputText
                  id="date"
                  type="date"
                  name="birth_date"
                  value={pers.birth_date}
                  onChange={(e) =>
                    handlePersonneChange(e, pers.id)
                  }
                />
              </div>
              <div className="field col-12 md:col-4">
                <label htmlFor="position">Nationalité : </label>
                <Dropdown
                  id="nationality"
                  name="nationality"
                  value={pers.nationality}
                  onChange={(e) =>
                    handlePersonneChange(e, pers.id)
                  }
                  options={['maroc', 'us']}
                />
              </div>
              <div className="field col-12 md:col-4">
                <label htmlFor="position">adresse : </label>
                <Dropdown
                  id="adresse"
                  name="adresse"
                  value={pers.adresse}
                  onChange={(e) =>
                    handlePersonneChange(e, pers.id)
                  }
                  options={['casa', 'rabat']}
                />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="position">Type piece d&apos;identité: </label>
                <Dropdown
                  id="identity_type"
                  name="identity_type"
                  value={pers.identity_type}
                  onChange={(e) =>
                    handlePersonneChange(e, pers.id)
                  }
                  options={["carte d'identité nationale", "passport", "carte de séjour"]}
                />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="adresse">N° piece d&apos;identité: </label>
                <InputText
                  id="identity_number"
                  name="identity_number"
                  value={pers.identity_number}
                  onChange={(e) =>
                    handlePersonneChange(e, pers.id)
                  }
                />
              </div>
            </div>
          </form>
        </Fieldset>
      ))} */}
      <div className="flex justify-content-end center_media mt-2">
        {/* <div className="mr-3">
          <Button
            type="button"
            className="p-button-danger"
            onClick={() => handleAddPerson()}
            label="Ajouter Personne"
          />
        </div> */}
        {StepperFormUpdate.pvGerance === true ? <div className="mr-3">
          <Button
            type="button"
            label="Generate PV"
          />
        </div> : ''}
        <div className="mr-3">
          <Button
            type="button"
            label="generer status juridrique"
          />
        </div>
        <div>
          <Button
            type="button"
            className="p-button-success"
            label="Enregistre les infos"
            onClick={handleSubmit}
          />
        </div>
      </div>
      <div className="field col-12 md:col-12">
        <p>status juridrique :</p>
        <Editor value={statusj} ref={componentRef} onTextChange={(e) => setStatusj(e.htmlValue)} style={{ height: '320px' }} />
        {/* <div style={{ height: "500px" }}>{renderPDFStatus()}</div> */}
      </div>
      {/* <div className="flex"> */}
      <div className="flex justify-content-end center_media mt-2">
        <div className="mr-3">
          <Button
            type="button"
            severity='secondary'
            label="imprimer"
            onClick={handlePrint}
          />
        </div>
        {/* <div className="mr-3">
        <Button
          type="button"
          label="print"
          severity='secondary'
          onClick={handlePrint}
        />
      </div> */}
      </div>
      {StepperFormUpdate.pvGerance == true && <><div className="field col-12 md:col-12">
        <p>document pv gerance :</p>
        <Editor value={pvdoc} ref={componentRef2} onTextChange={(e) => setPvdoc(e.htmlValue)} style={{ height: '320px' }} />
        {/* <div style={{ height: "500px" }}>{renderPDFPvGerance()}</div> */}
      </div>
        <div className="flex justify-content-end center_media mt-2">

          <div className="mr-3">
            <Button
              type="button"
              severity='secondary'
              label="imprimer"
              onClick={handlePrint2}
            />
          </div>
        </div>
      </>
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