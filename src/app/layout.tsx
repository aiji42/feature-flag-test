import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextScript from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { FeatureFlagScript } from "@/components/FeatureFlagScript/FeatureFlagScript";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <NextScript id="optimze-next">
          {`(function(p,r,o,j,e,c,t,g){
p['_'+t]={};g=r.createElement('script');g.src='https://www.googletagmanager.com/gtm.js?id=GTM-'+t;r[o].prepend(g);
g=r.createElement('style');g.innerText='.'+e+t+'{visibility:hidden!important}';r[o].prepend(g);
r[o][j].add(e+t);setTimeout(function(){if(r[o][j].contains(e+t)){r[o][j].remove(e+t);p['_'+t]=0}},c)
})(window,document,'documentElement','classList','loading',2000,'TTG682GH')`}
        </NextScript>
        <GoogleAnalytics gaId="G-ZXQTWYEQQQ" />
        <FeatureFlagScript />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
