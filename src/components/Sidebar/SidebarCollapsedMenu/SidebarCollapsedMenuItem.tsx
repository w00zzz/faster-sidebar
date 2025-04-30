import { useState, MouseEvent, useRef, useEffect } from "react";
import {
  Box,
  ListItemButton,
  Tooltip,
  Popover,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { PopoverItemProps } from "../types";
import SubMenu from "./SubMenu";

const SidebarCollapsedMenuItem = ({
  handleClick,
  icon: Icon,
  routes,
  title,
  path,
  navigate,
}: PopoverItemProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const timeoutRef = useRef<any>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  // Detect if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (routes?.subPath) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setAnchorEl(event.currentTarget);
    }
  };

  const handlePopoverClose = () => {
    // For the main menu item, we use a slightly longer delay
    timeoutRef.current = setTimeout(() => {
      setAnchorEl(null);
    }, 50); // Small delay to prevent menu from closing immediately when moving to submenu
  };

  const open = Boolean(anchorEl);

  const listItemButtonProps = {
    onClick: (event: MouseEvent<HTMLElement>) => {
      // On mobile, if there are subroutes, open the submenu instead of navigating
      if (isMobile && routes?.subPath) {
        handlePopoverOpen(event);
      } else {
        handleClick();
      }
    },
    onMouseEnter: !isMobile ? handlePopoverOpen : undefined,
    onMouseLeave: !isMobile ? handlePopoverClose : undefined,
    sx: {
      width: 65,
      height: 65,
      minWidth: 65,
      minHeight: 65,
      borderRadius: "8px",
      backgroundColor: "#ffffff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 0,
      margin: 0,
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        backgroundColor: "#f5f5f5",
        transform: "scale(1)",
      },
      position: "relative",
    },
  };

  const listItemContent = (
    <>
      <Icon
        sx={{
          fontSize: 23,
          color: "#637381",
        }}
      />
      {routes?.subPath && (
        <ChevronRightIcon
          sx={{
            position: "absolute",
            right: -8,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 16,
            color: "#637381",
            opacity: 0.7,
          }}
        />
      )}
    </>
  );

  return (
    <Box sx={{ padding: 0 }}>
      {routes?.subPath ? (
        <ListItemButton {...listItemButtonProps}>
          {listItemContent}
        </ListItemButton>
      ) : (
        <Tooltip title={title || ""} placement="right">
          <ListItemButton {...listItemButtonProps}>
            {listItemContent}
          </ListItemButton>
        </Tooltip>
      )}

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        onMouseEnter={() => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
        }}
        onMouseLeave={handlePopoverClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
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
        {routes?.subPath && (
            <>
            <SubMenu
              routes={routes.subPath}
              onItemClick={navigate}
              parentPath={`${path}`}
              onClose={handlePopoverClose}
              level={0}
              title={title}
              parentRoute={{
                title: title || '',
                path: path || ''
              }}
              isMobile={isMobile}
              />
              </>
        )}
      </Popover>
    </Box>
  );
};

export default SidebarCollapsedMenuItem;
