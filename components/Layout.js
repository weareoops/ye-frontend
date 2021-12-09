const Layout = ({children}) => {
    return(
        <div className="flex flex-col w-full items-center justify-center min-h-screen">
            <main className="w-3/5 flex-1 my-5">
                {children}
            </main>
            <footer className="flex w-full items-center justify-center">
                <section className="w-3/5 my-4">
                    <p>@kroayaltq</p>
                </section>
            </footer>
        </div>
    )
}

export default Layout