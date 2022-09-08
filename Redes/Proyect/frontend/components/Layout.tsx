import NavBar from "./NavBar"


export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="layout">
            <NavBar />
            <div className="content">
                {children}
            </div>
        </div>
    )
}