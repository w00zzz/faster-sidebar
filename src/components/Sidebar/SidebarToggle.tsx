import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const SidebarToggle = ({
  isExpanded,
  onClick,
  drawerWidth,
}: {
  isExpanded: boolean;
  onClick: () => void;
  drawerWidth: number;
}) => (
  <IconButton // Icono para expandir y collapsar el drawer
    onClick={onClick}
    sx={{
      position: "fixed",
      top: "21px",
      left: isExpanded ? drawerWidth - 12.5 : "75px",
      width: "24px",
      height: "24px",
      padding: 0,
      minWidth: "24px",
      backgroundColor: "#fff",
      border: "1px solid rgba(145, 158, 171, 0.3)",
      borderRadius: "50%",
      zIndex: 1300,
      "&:hover": {
        backgroundColor: "#f5f5f5",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0)",
      },
    }}
  >
    {isExpanded ? <ChevronLeft /> : <ChevronRight />}
  </IconButton>
);

export default SidebarToggle;
