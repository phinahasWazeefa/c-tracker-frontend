import { Inter } from "next/font/google";
import Prvider from "../Redux/Prvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Odigos",
  description: "Odigos track your expense",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Prvider>{children}</Prvider>
       </body>
     </html>
  );  
}
