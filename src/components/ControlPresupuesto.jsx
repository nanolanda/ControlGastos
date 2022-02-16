import { useState, useEffect } from "react";
import { formatearCantidad } from "../helpers";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({presupuesto, setPresupuesto, gastos, setGastos, setIsValidPresupuesto}) => {

    const [porcentaje, setPorcentaje] = useState(0);
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);


    const handleResetApp = () => {
        const resultado = confirm("Deseas reiniciar presupuesto y gastos?");

        if(resultado){
            setGastos([]);
            setPresupuesto(0);
            setIsValidPresupuesto(false);
        }
    }

    useEffect(() => {
        const totalGastado = gastos.reduce((total,gasto) => gasto.cantidad + total, 0);
        const totalDisponible = presupuesto - totalGastado;

        //Calcular el porcentaje gastado
        const totalPorcentaje = (((presupuesto - totalDisponible)/presupuesto)*100).toFixed(2);

        setDisponible(totalDisponible);
        setGastado(totalGastado);

        setTimeout(() => {
            setPorcentaje(totalPorcentaje);
        }, 1000);

    }, [gastos]);
    

  return (
  <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
            <CircularProgressbar

                value = {porcentaje}
                text = {`${porcentaje}%`}
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? "#DA1212":"#3B82F6",
                    trailColor: "#F5F5F5",
                    textColor: porcentaje > 100 ? "#DA1212":"#3B82F6"
                })}
                
            />
      </div>

      <div className="contenido-presupuesto">
          <button
            className="reset-app"
            type="button"
            onClick={handleResetApp}
          >
              Resetear
          </button>
            <p>
                <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ?  "negativo":"" }`}>
                <span>Disponible: </span > {formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span> {formatearCantidad(gastado)}
            </p>
      </div>
  </div>
  )
};

export default ControlPresupuesto