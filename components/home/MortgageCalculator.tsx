"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { buildListingSearchUrl } from "@/lib/buildListingSearchUrl";

function formatAed(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(value);
}

function calculateMortgage(
  homePrice: number,
  downPaymentPercent: number,
  annualRate: number,
  termYears: number,
) {
  const downPayment = homePrice * (downPaymentPercent / 100);
  const principal = Math.max(homePrice - downPayment, 0);
  const months = termYears * 12;

  if (principal === 0) {
    return {
      monthlyPayment: 0,
      loanAmount: 0,
      totalInterest: 0,
      totalCost: downPayment,
      maxAffordablePrice: homePrice,
    };
  }

  if (annualRate === 0) {
    const monthlyPayment = principal / months;
    return {
      monthlyPayment,
      loanAmount: principal,
      totalInterest: 0,
      totalCost: homePrice,
      maxAffordablePrice: homePrice,
    };
  }

  const monthlyRate = annualRate / 100 / 12;
  const monthlyPayment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  const totalCost = monthlyPayment * months + downPayment;
  const totalInterest = totalCost - homePrice;

  return {
    monthlyPayment,
    loanAmount: principal,
    totalInterest,
    totalCost,
    maxAffordablePrice: homePrice,
  };
}

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState("2000000");
  const [downPaymentPercent, setDownPaymentPercent] = useState("20");
  const [interestRate, setInterestRate] = useState("4.5");
  const [loanTerm, setLoanTerm] = useState("25");

  const results = useMemo(() => {
    const price = parseFloat(homePrice) || 0;
    const down = parseFloat(downPaymentPercent) || 0;
    const rate = parseFloat(interestRate) || 0;
    const term = parseFloat(loanTerm) || 0;

    if (price <= 0 || term <= 0) {
      return null;
    }

    return calculateMortgage(price, Math.min(down, 100), rate, term);
  }, [homePrice, downPaymentPercent, interestRate, loanTerm]);

  const budgetHref = results
    ? buildListingSearchUrl("sale", {
        maxPrice: String(Math.round(parseFloat(homePrice) || 0)),
      })
    : "/buy";

  return (
    <div className="bg-white rounded-xl border shadow-sm p-5 flex flex-col gap-4 h-full">
      <div className="font-semibold text-sm text-gray-800 border-b pb-3">
        Mortgage Calculator
      </div>

      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="home-price" className="text-xs text-gray-600">
            Home price (AED)
          </Label>
          <Input
            id="home-price"
            type="number"
            min={0}
            value={homePrice}
            onChange={(e) => setHomePrice(e.target.value)}
            className="h-9"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="down-payment" className="text-xs text-gray-600">
            Down payment (%)
          </Label>
          <Input
            id="down-payment"
            type="number"
            min={0}
            max={100}
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(e.target.value)}
            className="h-9"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="interest-rate" className="text-xs text-gray-600">
            Interest rate (%)
          </Label>
          <Input
            id="interest-rate"
            type="number"
            min={0}
            step={0.1}
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="h-9"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="loan-term" className="text-xs text-gray-600">
            Loan term (years)
          </Label>
          <Input
            id="loan-term"
            type="number"
            min={1}
            max={40}
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="h-9"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm border-t pt-3">
        <div>
          <p className="text-gray-500 text-xs">Monthly payment</p>
          <p className="font-semibold">
            {results ? formatAed(results.monthlyPayment) : "—"}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Loan amount</p>
          <p className="font-semibold">
            {results ? formatAed(results.loanAmount) : "—"}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Total interest</p>
          <p className="font-semibold">
            {results ? formatAed(results.totalInterest) : "—"}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Total cost</p>
          <p className="font-semibold">
            {results ? formatAed(results.totalCost) : "—"}
          </p>
        </div>
      </div>

      <Link href={budgetHref} className="mt-auto">
        <Button variant="brand" className="w-full rounded-lg">
          See homes in budget
        </Button>
      </Link>
    </div>
  );
};

export default MortgageCalculator;
