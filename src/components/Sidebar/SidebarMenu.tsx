import { IPWARoutes } from "faster-router-pwa";
import SidebarCollapsedMenu from "./SidebarCollapsedMenu/SidebarCollapsedMenu";
import TreeView from "./SidebarExpandedMenu/TreeView";
import { Box, Typography } from "@mui/material";

interface SidebarMenuProps {
  routes: IPWARoutes;
  isExpanded: boolean;
  title?: string;
  navigate: any;
}

const SidebarMenu = ({ isExpanded, routes,title, navigate }: SidebarMenuProps) => {
  return isExpanded ? (
    <Box display={"flex"} flexDirection={"column"}>
      {title && <Typography variant="h5" style={{ textAlign: "center", marginTop:10 ,marginLeft:2,marginBottom:3, color: "gray" }}>{title}</Typography>}
      <TreeView routes={routes} navigate={navigate} />
    </Box>
  ) : (
    <>
      <SidebarCollapsedMenu routes={routes} navigate={navigate} />
    </>
  );
};

export default SidebarMenu;
