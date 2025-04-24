import { Box, Drawer } from "@mui/material";
import { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarToggle from "./SidebarToggle";
import SidebarContent from "./SidebarContent";
import { IPWARoutes } from "faster-router-pwa";

interface SidebarProps {
  routes: IPWARoutes;
  title?: string;
  logoPath?: string;
  navigate: any;
}


const calcDrawerWidth = (routes: IPWARoutes): number => {
  let maxLength: number = 0;

  // Función auxiliar para calcular el valor ajustado
  const calculateAdjustedValue = (length: number): number => {
    const baseValue = 350; // Valor mínimo
    const maxValue = 600;  // Valor máximo
    const baseLength = 70; // Longitud base
    const maxAdditionalLength = 100; // Suponemos un límite razonable para evitar desbordamientos

    if (length <= baseLength) {
      return baseValue;
    }

    // Calculamos el exceso de longitud sobre 70
    const excessLength = Math.min(length - baseLength, maxAdditionalLength);

    // Factor de proporcionalidad
    const factor = (maxValue - baseValue) / maxAdditionalLength;

    // Calculamos el valor ajustado
    const adjustedValue = baseValue + excessLength * factor;

    // Aseguramos que no supere el máximo
    return Math.min(adjustedValue, maxValue);
  };

  // Recorremos las rutas para encontrar la longitud máxima
  Object.entries(routes).forEach(([, { title, subPath }]) => {
    // Calculamos la longitud del título actual si existe
    const currentTitleLength: number = title?.length ?? 0;
    maxLength = Math.max(maxLength, currentTitleLength);

    // Si existe un subPath, llamamos recursivamente a la función
    if (subPath) {
      const subPathMaxLength: number = calcDrawerWidth(subPath);
      maxLength = Math.max(maxLength, subPathMaxLength);
    }
  });

  // Devolvemos el valor ajustado según la longitud máxima encontrada
  return calculateAdjustedValue(maxLength);
};

const Sidebar = ({routes, title, logoPath, navigate}: SidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // console.log(calcDrawerWidth(routes));
  const drawerWidth = isExpanded ? calcDrawerWidth(routes) : 87;

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer // Drawer con estilos principales
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            overflowX: "hidden",
            backgroundColor: "#fff",
            borderRight: "1px solid rgba(145, 158, 171, 0.2)",
          },
          position: "relative",
        }}
      >
        <SidebarHeader isExpanded={isExpanded} logoPath={logoPath} />
        <SidebarContent isExpanded={isExpanded} routes={routes} title={title} navigate={navigate}/>
        <SidebarToggle
          isExpanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
          drawerWidth={drawerWidth}
        />
      </Drawer>
      <Box
        component="main" // Contenido principal de la pagina.
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        Contenido de la Pagina
      </Box>
    </Box>
  );
};

export default Sidebar;
