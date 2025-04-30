import { FC, useState, MouseEvent, useRef } from "react";
import {
  Box,
  ListItemButton,
  ListSubheader,
  Divider,
  Popover,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { SubMenuProps } from "../types";

const SubMenu: FC<SubMenuProps> = ({
  routes,
  onItemClick,
  onClose,
  parentTitle,
  level = 0,
  title,
  parentPath="",
  parentRoute,
  isMobile = false,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [activeSubPath, setActiveSubPath] = useState<string | null>(null);
  const timeoutRef = useRef<any>(null);

  const handleSubMenuOpen = (event: MouseEvent<HTMLElement>, key: string) => {
    event.stopPropagation();
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setAnchorEl(event.currentTarget);
    setActiveSubPath(key);
  };

  const handleSubMenuClose = () => {
    // Only close this level's submenu, not parent menus
    timeoutRef.current = setTimeout(() => {
      setAnchorEl(null);
      setActiveSubPath(null);
    }, 10); // Small delay to prevent menu from closing immediately when moving to submenu
  };

  return (
    <Box sx={{ pt: 1, display: "flex", flexDirection: "column" }}>
      {/* Display header with title */}
      {parentTitle ? (
        <>
          <ListSubheader
            sx={{
              backgroundColor: "transparent",
              color: "#9DA4AE",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "24px",
              userSelect: "none",
              paddingTop: "0px",
              paddingBottom: "0px",
            }}
          >
            {parentTitle}
          </ListSubheader>
          <Divider sx={{ my: 0.5 }} />
        </>
      ) : (
        <>
          <ListSubheader
            sx={{
              backgroundColor: "transparent",
              color: "#9DA4AE",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "24px",
              userSelect: "none",
              paddingTop: "0px",
              paddingBottom: "0px",
            }}
          >
            {title}
          </ListSubheader>
          <Divider sx={{ my: 0.5 }} />
        </>
      )}
      
      {/* Add parent route as first clickable item if available */}
      {parentRoute && (
        <ListItemButton
          onClick={() => {
            onItemClick(parentRoute.path);
            onClose();
          }}
          sx={{
            width: "auto",
            minWidth: "120px",
            height: "40px",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 16px",
            margin: 0,
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
            color: "#637381",
            fontSize: "14px",
            fontWeight: 700, // Make it bold to indicate it's the parent route
          }}
        >
          <span>{parentRoute.title}</span>
        </ListItemButton>
      )}
      {Object.entries(routes).map(
        ([key, route]: [string, any]) =>
          route.title && (
            <Box key={key} sx={{ position: "relative" }}>
              <ListItemButton
                onClick={(e: MouseEvent<HTMLElement>) => {
                  if (route.subPath) {
                    handleSubMenuOpen(e, key);
                    // If on mobile and has subpaths, only open submenu, don't navigate
                    if (!isMobile) {
                      onItemClick(`${parentPath}${route.path}`);
                    }
                  } else {
                    onItemClick(`${parentPath}${route.path}`);
                    onClose();
                  }
                }}
                onMouseEnter={!isMobile ? (e: MouseEvent<HTMLElement>) => {
                  if (route.subPath) {
                    handleSubMenuOpen(e, key);
                  }
                } : undefined}
                onMouseLeave={!isMobile ? handleSubMenuClose : undefined}
                sx={{
                  width: "auto",
                  minWidth: "120px",
                  height: "40px",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 16px",
                  margin: 0,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                  color: "#637381",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                <span>{route.title}</span>
                {route.subPath && (
                  <ChevronRightIcon
                    sx={{
                      fontSize: 16,
                      opacity: 0.7,
                      ml: 1,
                    }}
                  />
                )}
              </ListItemButton>

              {route.subPath && activeSubPath === key && (
                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={handleSubMenuClose}
                  onMouseEnter={() => {
                    if (timeoutRef.current) {
                      clearTimeout(timeoutRef.current);
                      timeoutRef.current = null;
                    }
                  }}
                  onMouseLeave={handleSubMenuClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  sx={{
                    ".MuiPopover-paper": {
                      borderRadius: "8px",
                      marginLeft: "8px",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <SubMenu
                    routes={route.subPath}
                    onItemClick={onItemClick}
                    onClose={onClose}
                    parentTitle={route.title}
                    parentPath={`${parentPath}${route.path}`}
                    level={level + 1}
                    parentRoute={{
                      title: route.title,
                      path: `${parentPath}${route.path}`
                    }}
                    isMobile={isMobile}
                  />
                </Popover>
              )}
            </Box>
          )
      )}
    </Box>
  );
};

export default SubMenu;
