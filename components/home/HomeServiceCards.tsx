import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Buy a Property",
    description:
      "No matter what path you take to buy your Property, we can help you navigate a successful experience.",
    cta: "Properties for sale",
    href: "/buy",
    image: "/assets/images/hero/feat-2.png",
  },
  {
    title: "Rent a Property",
    description:
      "We're creating a seamless online experience – from shopping on the largest rental network, to applying, to paying rent.",
    cta: "Find rentals",
    href: "/rent",
    image: "/assets/images/hero/feat-2.png",
  },
  {
    title: "Find an Agent",
    description:
      "A real estate agent can provide you with a clear breakdown of costs so that you can avoid surprise expenses.",
    cta: "Discover Agents",
    href: "/find-agents",
    image: "/assets/images/hero/feat-3.png",
  },
];

const HomeServiceCards = () => {
  return (
    <Section className="">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl shadow-sm border flex flex-col gap-4 p-6 md:p-8 items-center text-center"
            >
              <div className="h-36 flex items-center justify-center">
                <Image
                  src={service.image}
                  alt=""
                  width={200}
                  height={140}
                  className="object-contain max-h-36 w-auto"
                />
              </div>
              <h3 className="font-bold text-xl">{service.title}</h3>
              <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
                {service.description}
              </p>
              <Link href={service.href} className="mt-auto">
                <Button variant="outline_brand" className="rounded-full px-6">
                  {service.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default HomeServiceCards;
