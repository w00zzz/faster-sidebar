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
  width?:number
}

const calcDrawerWidth = (routes: IPWARoutes): number => {
  let maxLength: number = 0;

  

  Object.entries(routes).forEach(([, { title, subPath }]) => {
    const currentTitleLength: number = title?.length ?? 0;
    maxLength = Math.max(maxLength, currentTitleLength);

    if (subPath) {
      const subPathMaxLength: number = calcDrawerWidth(subPath);
      maxLength = Math.max(maxLength, subPathMaxLength);
    }
  });

  return maxLength;
};

const Sidebar = ({ routes, title, logoPath, navigate,width }: SidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxTitle=calcDrawerWidth(routes)
  const maxWidth=maxTitle>80?500:380

  const drawerWidth = isExpanded ? width??maxWidth : 87;

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
        {logoPath && (<SidebarHeader isExpanded={isExpanded} logoPath={logoPath} />)}
        <SidebarContent
          isExpanded={isExpanded}
          routes={routes}
          title={title}
          navigate={navigate}
        />
        <SidebarToggle
          isExpanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
          drawerWidth={drawerWidth}
        />
      </Drawer>
     {/* <h1>{textLength}</h1> */}
    </Box>
  );
};

export default Sidebar;
