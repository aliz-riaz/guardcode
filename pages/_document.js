import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${"G-G0VKPSW2TW"}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-G0VKPSW2TW', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
          />
          <meta
            property="og:image"
            content="/employers/images/meta_img.png"
          ></meta>
          <meta
            name="description"
            content="GuardPass by Get Licensed streamlines security workforce management, offering features for hiring SIA licensed professionals, providing staff training in security courses, conducting vetting, and more. Simplify your security operations in the UK with GuardPass."
          />
          <link
            rel="icon"
            type="image/x-icon"
            href={`/employers/images/favicon_img.png`}
          />
        </Head>
        <body>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-M3FZ32H"
              height="0"
              width="0"
              styles={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
          <Main></Main>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
