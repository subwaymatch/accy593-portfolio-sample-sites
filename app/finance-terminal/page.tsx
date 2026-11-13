import type { Metadata } from "next";
import Shell from "./Shell";
import { buildDetails } from "./details";
import { About, Contact, Footer, Header, Overview, Ticker, Work } from "./sections";

export const metadata: Metadata = {
  title: "Hana Kim · Finance Terminal Portfolio",
  description:
    "Portfolio of Hana Kim, MS in Accountancy student at Gies College of Business (UIUC): DCF valuation, cash forecasting, variance analysis and personal projects, presented as a financial data terminal.",
};

export default function FinanceTerminalPage() {
  return (
    <Shell
      header={<Header />}
      ticker={<Ticker />}
      panels={{
        overview: <Overview />,
        work: <Work />,
        about: <About />,
        contact: <Contact />,
      }}
      details={buildDetails()}
      footer={<Footer />}
    />
  );
}
