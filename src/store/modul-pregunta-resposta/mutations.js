import fitxer1 from "../../fitxers/DTICauditories.pr"
import fitxer2 from "../../fitxers/cursAuditories.pr"


export function mutModificarArrPR (state, temaSeleccionat) {
	state.temaSeleccionat = temaSeleccionat
	
	switch (temaSeleccionat) {
		case "arrCursAuditories":
			state.arrPR = JSON.parse(JSON.stringify(arrCursAuditories))
			break;
		case "arrDTICauditories":
			state.arrPR = JSON.parse(JSON.stringify(arrDTICauditories))
			break;
	}
	
}


export function mutGenerarPRSeleccionades (state, arrPRSeleccionades2) {
	state.arrPRSeleccionades = arrPRSeleccionades2.slice()
}