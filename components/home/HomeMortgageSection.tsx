import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";

const placeholderCards = [
  "/assets/images/hero/2.webp",
  "/assets/images/hero/1.jpg",
  "/assets/images/hero/2.webp",
  "/assets/images/hero/2.webp",
  "/assets/images/hero/2.webp",
  "/assets/images/hero/2.webp",
];

const PlaceholderPropertyCard = ({ imageSrc }: { imageSrc: string }) => (
  <div className="bg-white rounded-xl border shadow-sm overflow-hidden flex-shrink-0 w-[200px] md:w-[220px]">
    <div
      className="h-32 bg-cover bg-center relative"
      style={{ backgroundImage: `url('${imageSrc}')` }}
    >
      <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-medium px-2 py-0.5 rounded">
        Within budget
      </span>
    </div>
    <div className="p-3 space-y-2">
      <div className="h-2.5 bg-gray-200 rounded w-full" />
      <div className="h-2.5 bg-gray-200 rounded w-4/5" />
      <div className="h-2.5 bg-gray-200 rounded w-3/5" />
    </div>
  </div>
);

const summaryRows = [
  { label: "Target home price", value: "AED --" },
  { label: "Max home price", value: "AED --" },
  { label: "Target payment", value: "AED -- /mo" },
  { label: "Your est. rate", value: "-- %" },
  { label: "APR", value: "-- %" },
];

const HomeMortgageSection = () => {
  return (
    <Section className="bg-stone-50">
      <Container className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold">
            Plan your purchase with XgMortgage
          </h2>
          <p className="text-gray-600">
            Estimate your monthly payments and explore homes in your budget.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 overflow-hidden">
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-xl border shadow-sm p-5 flex flex-col gap-4 h-full">
              <div className="font-semibold text-sm text-gray-800 border-b pb-3">
                XgMortgage
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                {summaryRows.map((row) => (
                  <div key={row.label}>
                    <p className="text-gray-500 text-xs">{row.label}</p>
                    <p className="font-semibold">{row.value}</p>
                  </div>
                ))}
              </div>

              <Link href="/mortgage" className="mt-auto">
                <Button variant="brand" className="w-full rounded-lg">
                  Open mortgage calculator
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 flex-1 items-stretch">
            {placeholderCards.map((src, i) => (
              <PlaceholderPropertyCard key={i} imageSrc={src} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default HomeMortgageSection;
