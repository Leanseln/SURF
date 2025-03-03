import Logo from "../images/logogo.png"
function Footer() {
    return(
        <footer className="bg-white py-2">
            <div className="container mx-auto px-4 flex justify-center items-center space-x-2">
                <img src={Logo} alt="" className="w-6 h-auto"/>
                <p className="text-center text-xs text-black">
                &copy; {new Date().getFullYear()} S.U.R.F. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;