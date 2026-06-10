'use client';
import { Button } from '../button';

type DataTableResetFilterProps = {
  isFilterActive: boolean;
  onReset: () => void;
};

export function DataTableResetFilter({
  isFilterActive,
  onReset
}: DataTableResetFilterProps) {
  return (
    <>
      {isFilterActive ? (
        <Button variant="outline" onClick={onReset} className="border-none shadow-none opacity-60 px-0">
          <i className="bi-x-lg"></i>
          Reset filters
        </Button>
      ) : null}
    </>
  );
}