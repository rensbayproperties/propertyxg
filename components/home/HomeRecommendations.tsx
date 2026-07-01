import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";

const HomeRecommendations = () => {
  return (
    <Section>
      <Container size="md">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl md:text-3xl font-bold">
              Get home recommendations
            </h2>
            <p className="text-gray-600 text-lg">
              Sign in for a more personalized experience.
            </p>
            <div>
              <Link href="/signin">
                <Button variant="outline_brand" className="rounded-lg px-8">
                  Sign in
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end min-h-[280px]">
            <div className="relative w-full max-w-md">
              <div className="absolute top-4 right-4 w-[90%] h-48 bg-gray-100 rounded-xl border shadow-sm" />
              <div className="absolute top-8 right-8 w-[90%] h-48 bg-gray-50 rounded-xl border shadow-md" />
              <div className="relative z-10 bg-white rounded-xl border shadow-lg overflow-hidden w-[90%] ml-auto">
                <div className="relative h-40">
                  <Image
                    src="/assets/images/hero/recommendations.webp"
                    alt=""
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <span className="inline-flex items-center gap-1 bg-emerald-800 text-white text-[10px] px-2 py-1 rounded-full max-w-[200px]">
                      Recommended homes based on your monthly budget
                    </span>
                    <span className="inline-flex items-center gap-1 bg-orange-500 text-white text-[10px] px-2 py-1 rounded-full max-w-[200px]">
                      Recommended homes based on your preferred location
                    </span>
                  </div>
                </div>
                <div className="p-3 space-y-2">
                  <p className="font-bold text-sm">AED 2,450,000</p>
                  <p className="text-xs text-gray-500">
                    3 bd | 4 ba | 2,800 sqft | Villa for Sale
                  </p>
                  <div className="space-y-1.5 pt-1">
                    <div className="h-2 bg-gray-200 rounded w-full" />
                    <div className="h-2 bg-gray-200 rounded w-3/4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default HomeRecommendations;
