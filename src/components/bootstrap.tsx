"use client";
import { useEffect } from "react";

// Este componente se encarga de importar y ejecutar el JavaScript de Bootstrap en el lado del cliente.
export default function InstallBootstrap() {
  useEffect(() => {
    // Importamos el archivo JavaScript de Bootstrap cuando el componente se monta.
    require("bootstrap/dist/js/bootstrap.min.js");
    require("bootstrap-icons/font/bootstrap-icons.css");

    // Ambas son validas
    // import("bootstrap/dist/js/bootstrap.min.js");
  }, []);

  // El componente no necesita renderizar nada, por eso retornamos un fragmento vacío.
  return <></>;
}
