window.onload = function() {
    replaceCustomHeaderContent();
};

function replaceCustomHeaderContent() {

    var customHeaderDiv = document.getElementById("customHeader");
    if (customHeaderDiv) {
        customHeaderDiv.innerHTML = `
               	<header class="header-section">
                    <div class="header-warp">

                        <div class="header-bar-warp d-flex">
                            <!-- site logo -->
                            <a href="index.html" style="padding;padding-left: 10px;" class="site-logo">
                                <img width="75" height="75" src="./img/logo.png" alt="">
                            </a>
                            <nav class="top-nav-area w-100">
                                <!-- Menu -->
                                <ul class="main-menu primary-menu">
                                    <li><a href="index.html">Home</a></li>
                                    <li><a href="https://www.youtube.com/channel/UCNfeTXZ2VAxaLpmoz0H5jvQ">Youtube</a></li>
                                    <li><a href="https://www.udemy.com/user/mayank-singh-336">Courses</a></li>
                                    <li><a href="contact.html">Contact</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </header>
            `;
    }



//     <div class="header-social d-flex justify-content-end">
//     <p>Follow us:</p>
//     <a href="https://www.youtube.com/channel/UCNfeTXZ2VAxaLpmoz0H5jvQ"><i class="fa fa-youtube"></i></a>
//     <a href="https://www.udemy.com/user/mayank-singh-336/"><i class="fa  fa-graduation-cap"></i></a>
//      </div>
    var footerDiv = document.querySelector('.footer-section');

    // Check if the footer with class "something" exists before replacing its content
    if (footerDiv) {
        // Your HTML content to replace the inner content of the footer
        var newHTMLContent = `
        <div class="container">
        <div class="footer-left-pic">
            <imgsrc="img/footer-left-pic.png" alt="">
        </div>
        <div class="footer-right-pic">
            <img src="img/footer-right-pic.png" alt="">
        </div>
        <a href="#" class="footer-logo">
            <img  width="200" height="200"  src="./img/logo.png" alt="">
        </a>
        <ul class="main-menu footer-menu">
            <li><a href="">Home</a></li>
            <li><a href="">Games</a></li>
            <li><a href="">Reviews</a></li>
            <li><a href="">News</a></li>
            <li><a href="">Contact</a></li>
             <button type="button" class="btn btn-primary button-primary-purp">Download</button>
        </ul>
        <div class="footer-social d-flex justify-content-center">
        <p>Follow us:</p>
        <a href="https://www.youtube.com/channel/UCNfeTXZ2VAxaLpmoz0H5jvQ"><i class="fa fa-youtube"></i></a>
        <a href="https://www.udemy.com/user/mayank-singh-336/"><i class="fa  fa-graduation-cap
        "></i></a>
        </div>
        <div class="copyright"><a href="">TheSinghStudios</a> 2024 @ All rights reserved</div>
    </div>

        `;

        footerDiv.innerHTML = newHTMLContent;
    }

  
}