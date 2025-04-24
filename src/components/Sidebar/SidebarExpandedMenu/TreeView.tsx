import {
    Box,
    Collapse,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
  } from "@mui/material";
  import { useTreeViewLogic } from "./TreeView.logic";
  import { ExpandLess, ExpandMore } from "@mui/icons-material";
  import TreeViewProps from "../types";
  import React, { useState } from "react";
  
  const TreeView: React.FC<TreeViewProps> = ({
    routes,
    parent = "",
    level = 0,
    isCollapsed = false,
    navigate,

  }) => {
    const { open, handleClick } = useTreeViewLogic();
    const hasParent = Boolean(parent);
    const marginLeft = hasParent && level === 0 ? 8 : 2;
  
    const [expandedMode] = useState(true);
  
    const listItemTextStyles = {
      m: 0,
      "& .MuiTypography-root": {
        fontSize: "0.875rem",
        color: "#637381",
        fontWeight: 500,
      },
    };
  
    return (
      <Stack
        component="nav"
        sx={{
          color: "text.secondary",
          p: 2,
          pr: hasParent ? 0 : 2,
          pl: hasParent ? 2 : 0,
          pt: "8px",
          pb: "8px",
        }}
      >
        <ul
          style={{
            position: "relative",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {Object.entries(routes)
            .filter(([, { title }]) => title)
            .map(([key, { subPath, path, title, icon: Icon }], index, array) => {
              const fullPath = `${parent}${path}`;
              const last = index === array.length - 1;
              const first = index === 0;
              const isOpen = open[title as keyof typeof open];
  
              const handleItemClick = () => {
                if (subPath) {
                  handleClick(title as keyof typeof open);
                } else {
                  navigate(fullPath);
                  // console.log("fullPath",fullPath);
                }
              };
  
              return (
                <li key={key} style={{ position: "relative" }}>
                  {level > 0 && !last && (
                    <Box
                      sx={{
                        position: "absolute",
                        // left: `${marginLeft * 6}px`,
                        left: hasParent ? "0.3px" : "0px",
  
                        top: 0,
                        bottom: 0,
                        borderLeft: "2px solid gray",
                        zIndex: 0,
                      }}
                    />
                  )}
                  <ListItemButton
                    onClick={handleItemClick}
                    sx={{
                      ml: hasParent ? marginLeft : "10px",
                      position: "relative",
                      zIndex: 1,
                      backgroundColor: isOpen ? "#f0f4f8 !important" : "",
  
                      borderRadius: "8px",
                      mb: 0.5,
                      py: 0.5,
                      transition: "background-color 0.2s",
                      "&:hover": {
                        backgroundColor: isOpen ? "#e3eaf2" : "#f8f9fa",
                      },
                      
                    }}
                  >
                    {hasParent && (
                      <Box
                        sx={{
                          borderLeft: "2px solid gray",
                          left: "9px",
                          borderBottomLeftRadius: "10px ",
                          borderBottom: "2px solid gray",
                          width: "16px",
                          height: first ? "30px" : "120%",
                          transform: "translate(-155%, -50%)",
                          position: "absolute",
                        }}
                      />
                    )}
                    {Icon && (
                      <ListItemIcon sx={{ minWidth: "35px" }}>
                        <Icon />
                      </ListItemIcon>
                    )}
                    {!isCollapsed && expandedMode && (
                      <ListItemText primary={title} sx={listItemTextStyles} />
                    )}
                    {subPath &&
                      expandedMode &&
                      (isOpen ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemButton>
  
                  {subPath && expandedMode && (
                    <Collapse
                      in={isOpen}
                      timeout="auto"
                      unmountOnExit
                      sx={{
                        p: 0,
                        ml: marginLeft,
                        position: "relative",//
                        "& .MuiListItemButton-root": {
                          backgroundColor: "transparent",
                          py: 0.5,
                          "&:hover": {
                            backgroundColor: "#f8f9fa",
                          },
                        },
                      }}
                    >
                      <TreeView
                        routes={subPath}
                        parent={`${fullPath}`}
                        level={level + 1}
                        isCollapsed={isCollapsed}
                        navigate={navigate}
                      />
                    </Collapse>
                  )}
                </li>
              );
            })}
        </ul>
      </Stack>
    );
  };
  
  export default React.memo(TreeView);
  