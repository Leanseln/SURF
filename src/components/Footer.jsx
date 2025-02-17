function Footer() {
    return(
        <footer className="bg-blue-600 py-4">
            <div className="container mx-auto px-4">
                <p className="text-center text-sm text-white">
                &copy; {new Date().getFullYear()} S.U.R.F. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;