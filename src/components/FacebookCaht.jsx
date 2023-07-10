import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function FacebookChat() {
  return (
    <Html lang="en">
      <Head>/* Your code */</Head>
      <body>
        {/* <!-- Messenger Chat plugin Code --> */}
        <div id="fb-root"></div>

        {/* <!-- Your Chat plugin code --> */}
        <div id="fb-customer-chat" class="fb-customerchat"></div>
        <Script
          id="messenger-tag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: ` <script>
            var chatbox = document.getElementById('fb-customer-chat');
            chatbox.setAttribute("page_id", "114163531737817");
            chatbox.setAttribute("attribution", "biz_inbox");
          </script>`,
          }}
        ></Script>
        <Script
          id="messenger-sdk"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `<script>
            window.fbAsyncInit = function() {
              FB.init({
                xfbml            : true,
                version          : 'v17.0'
              });
            };
      
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
          </script>`,
          }}
        ></Script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
