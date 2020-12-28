export function actModificarArrPR (context, temaSeleccionat) {
	context.commit("mutModificarArrPR", temaSeleccionat)
}

export function actGenerarPRSeleccionades (context, arrPRSeleccionades2) {
	context.commit("mutGenerarPRSeleccionades", arrPRSeleccionades2)
}