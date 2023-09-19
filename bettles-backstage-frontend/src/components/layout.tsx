import BeetleHeader from "./header/beetleHeader";
import MainFrame from "./mainFrame/mainFrame";
import NavLayout from "./navBar/navLayout";

type account = {
    accName:string
}

const Layout = ():JSX.Element=> {
    const _account:account = { accName:"user1" }

    return(
    <>
        <BeetleHeader account = {_account}/>
        <div className="flex-1 flex flex-row">
            <NavLayout />
            <MainFrame />
        </div>
    </>
    )
}
export default Layout;