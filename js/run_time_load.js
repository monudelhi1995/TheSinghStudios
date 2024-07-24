window.onload = function() {
    replaceCustomHeaderContent();
};

function replaceCustomHeaderContent() {

    var customHeaderDiv = document.getElementById("customHeader");
    if (customHeaderDiv) {
        customHeaderDiv.innerHTML = `
               	<header class="header-section">
                    <div class="header-warp">
                        <div class="header-social d-flex justify-content-end">
                            <p>Follow us:</p>
                            <a href="https://www.youtube.com/channel/UCNfeTXZ2VAxaLpmoz0H5jvQ"><i class="fa fa-youtube"></i></a>
                            <a href="https://www.udemy.com/user/mayank-singh-336/"><i class="fa  fa-graduation-cap
                            "></i></a>
                        <!-- <a href="#"><i class="fa fa-facebook"></i></a>
                        <a href="#"><i class="fa fa-twitter"></i></a> -->
                        </div>
                        <div class="header-bar-warp d-flex">
                            <!-- site logo -->
                            <a href="index.html" class="site-logo">
                                <img width="100" height="100" src="./img/logo.png" alt="">
                            </a>
                            <nav class="top-nav-area w-100">
                                <!-- <div class="user-panel">
                                    <a href="">Login</a> / <a href="">Register</a>
                                </div> -->
                                <!-- Menu -->
                                <ul class="main-menu primary-menu">
                                    <li><a href="index.html">Home</a></li>
                                    <li><a href="games.html">Games</a>
                                        <ul class="sub-menu">
                                            <li><a href="game-single.html">Game Singel</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="review.html">Reviews</a></li>
                                    <li><a href="blog.html">News</a></li>
                                    <li><a href="contact.html">Contact</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </header>
            `;
    }

    var footerDiv = document.querySelector('.footer-section');

    // Check if the footer with class "something" exists before replacing its content
    if (footerDiv) {
        // Your HTML content to replace the inner content of the footer
        var newHTMLContent = `
        <div class="container">
        <div class="footer-left-pic">
            <img src="img/footer-left-pic.png" alt="">
        </div>
        <div class="footer-right-pic">
            <img src="img/footer-right-pic.png" alt="">
        </div>
        <a href="#" class="footer-logo">
            <img src="./img/logo.png" alt="">
        </a>
        <ul class="main-menu footer-menu">
            <li><a href="">Home</a></li>
            <li><a href="">Games</a></li>
            <li><a href="">Reviews</a></li>
            <li><a href="">News</a></li>
            <li><a href="">Contact</a></li>
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