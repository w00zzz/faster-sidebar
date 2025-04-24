import { Box } from "@mui/material";
import { IPWARoutes } from "faster-router-pwa";
import SidebarMenu from "./SidebarMenu";

interface SidebarContentProps {
  isExpanded: boolean;
  routes: IPWARoutes;
  title?: string;
  navigate: any;
}

const SidebarContent = ({ isExpanded, routes, title, navigate }: SidebarContentProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        overflowY: "auto",
        flex: 1,
        maxHeight: "calc(100vh - 64px)",
        "&::-webkit-scrollbar": {
          width: "1px",
        },
        transition: "all 0.3s ease-in-out",
      }}
    >
      <SidebarMenu routes={routes} isExpanded={isExpanded} title={title} navigate={navigate}/>
    </Box>
  );
};

export default SidebarContent;
