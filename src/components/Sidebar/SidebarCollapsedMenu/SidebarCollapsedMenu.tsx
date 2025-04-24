import { PopoverProps } from "../../Sidebar/types";
import SidebarCollapsedMenuItem from "./SidebarCollapsedMenuItem";

const SidebarCollapsedMenu = ({ routes, navigate }: PopoverProps) => {

  return (
    <>
      {Object.entries(routes)
        .filter((entry): entry is [string, any] => {
          const [, route] = entry;
          return Boolean(route.title && route.icon);
        })
        .map(([key, route]) => {
          const fullPath = `${route.path}`;
          return (
            <SidebarCollapsedMenuItem
              key={key}
              // handleClick={() => console.log(`click en ${route.title}`)}
              handleClick={() => navigate(fullPath)}
              icon={route.icon}
              routes={route.subPath ? route : undefined}
              title={route.title}
              path={route.path}
              navigate={navigate}
            />
          );
        })}
    </>
  );
};

export default SidebarCollapsedMenu;
