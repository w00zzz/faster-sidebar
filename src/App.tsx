import './App.css'
import { IPWARoutes, PwaRoutes } from "faster-router-pwa";
import HomeIcon from "@mui/icons-material/Home";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";


export enum Pages {
  Configuracion,
  DatosHogar
}

function App() {

  const myRoutes2: IPWARoutes = {
    [Pages.Configuracion]: {
      component: () => <h1>componente</h1>,
      path: "/Configuración",
      title: "Configuración",
      icon: SettingsRoundedIcon,
    },
    [Pages.DatosHogar]: {
      component: () => <h1>componente</h1>,
      path: "/datos-hogar",
      title: "Información general de la vivienda",
      icon: HomeIcon,
    },
  }


  return (
    <>
      <PwaRoutes
      routes={myRoutes2}
      CallBackUrlController={() => <h1>Hola mundo!</h1>}
      DashboardLayout={({ children }: any) => (
        <div style={{ display: "flex" }}>
          <h1>Template</h1>
          {/* <Drawer routes={myRoutes2}></Drawer> */}
          {/* <TreeViewPopover/> */}
          <div style={{ backgroundColor: "red" }}>{children}</div>
          {/* <Sidebar routes={myRoutes2} title="titulo del sidebar" logoPath="logo.png"/> */}
        </div>
      )}
      LandingPage={() => <h1>Landing!</h1>}
      NotFoundPage={() => <h1>Not found!</h1>}
      SignInPage={() => <h1>Sign in!</h1>}
      SignUpPage={() => <h1>Sign up!</h1>}
    />
    </>
  )
}

export default App
