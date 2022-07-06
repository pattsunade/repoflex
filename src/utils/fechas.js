export const formatearFechaHora = (dato) => {
    return dato? `${dato.substring(4,6)}/${dato.substring(2,4)}/${dato.substring(0,2)} - ${dato.substring(6,8)}:${dato.substring(8,10)}`:""
}
export const formatearFecha = (fecha) =>  {
    return fecha? `${fecha.substring(4,6)}/${fecha.substring(2,4)}/${fecha.substring(0,2)}`:""
}