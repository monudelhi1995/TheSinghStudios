window.onload = function() {
    replaceCustomHeaderContent();
};

function replaceCustomHeaderContent() {

    console.log("Mayank log is here");

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
                                <img src="./img/logo.png" alt="">
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

    //  var customHeaderDiv = document.getElementById("customHeader");

    //     if (customHeaderDiv) {
    //         fetch('header.html')
    //             .then(response => response.text())
    //             .then(html => {
    //                 customHeaderDiv.innerHTML = html;
    //             })
    //             .catch(error => console.error('Error fetching HTML file:', error));
    //     }
}