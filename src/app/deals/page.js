'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiChevronLeft, FiChevronRight, FiSearch, FiStar } from 'react-icons/fi';
import { DealFilters } from '@/components/deals/DealFilters';
import { DealTable } from '@/components/deals/DealTable';
import { clearFilters, fetchDeals, selectPaginatedDeals, selectVisibleDeals, setFilters, setPage, setSearch, setSort } from '@/features/deals/dealsSlice';
import { toggleInterest } from '@/features/interests/interestsSlice';
import { useDebounce } from '@/hooks/useDebounce';

export default function DealsPage() {
  const dispatch = useDispatch();
  const { data, loading, error, filters, search, sort, page, pageSize } = useSelector((state) => state.deals);
  const interests = useSelector((state) => state.interests.interests);
  const paginated = useSelector(selectPaginatedDeals);
  const visibleDeals = useSelector(selectVisibleDeals);
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    dispatch(fetchDeals());
  }, [dispatch]);

  useEffect(() => {
    if (debouncedSearch !== undefined) {
      dispatch(setSearch(debouncedSearch));
    }
  }, [debouncedSearch, dispatch]);

  const industries = useMemo(() => [...new Set(data.map((deal) => deal.industry))], [data]);
  const totalDeals = visibleDeals.length;

  const handleSearch = useCallback((value) => dispatch(setSearch(value)), [dispatch]);
  const handleSort = useCallback((value) => dispatch(setSort(value)), [dispatch]);
  const handlePage = useCallback((nextPage) => dispatch(setPage(nextPage)), [dispatch]);
  const handleToggleInterest = useCallback((dealId) => dispatch(toggleInterest(dealId)), [dispatch]);
  const handleClearFilters = useCallback(() => dispatch(clearFilters()), [dispatch]);
  const handleFilterChange = useCallback((newFilters) => dispatch(setFilters(newFilters)), [dispatch]);

  if (loading) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">Loading deals...</div>;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200">
        <div className="text-lg font-semibold">Something went wrong.</div>
        <button type="button" onClick={() => dispatch(fetchDeals())} className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-white">Retry</button>
      </div>
    );
  }

  const visibleDealsForPage = paginated.items || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="text-sm font-medium uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Deal Explorer</div>
          <h1 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">Curated investment opportunities</h1>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <FiSearch className="h-4 w-4" />
          <input
            aria-label="Search deals"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by company, sector, city"
            className="w-full border-none bg-transparent text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-100 md:w-72"
          />
        </div>
      </div>

      <DealFilters filters={filters} industries={industries} onChange={handleFilterChange} onClear={handleClearFilters} />

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-slate-500 dark:text-slate-400">Active filters:</span>
          {Object.entries(filters).filter(([, value]) => value !== '' && value !== 0 && value !== 100).map(([key, value]) => (
            <span key={key} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">{key}: {value}</span>
          ))}
          {!Object.values(filters).some((value) => value !== '' && value !== 0 && value !== 100) ? <span className="text-sm text-slate-400 dark:text-slate-500">None</span> : null}
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          Sort by
          <select value={sort} onChange={(e) => handleSort(e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
            <option value="roi-desc">ROI High → Low</option>
            <option value="roi-asc">ROI Low → High</option>
            <option value="investment-desc">Investment High → Low</option>
            <option value="investment-asc">Investment Low → High</option>
            <option value="risk">Risk</option>
            <option value="name">Company Name</option>
          </select>
        </label>
      </div>

      {visibleDealsForPage.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300"><FiStar className="h-6 w-6" /></div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white">No deals found</h3>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Try broadening your search or clearing filters to view more opportunities.</p>
        </div>
      ) : (
        <>
          <div className="text-sm text-slate-500 dark:text-slate-400">Showing {Math.min((page - 1) * pageSize + 1, totalDeals)}–{Math.min(page * pageSize, totalDeals)} of {totalDeals} deals</div>
          <DealTable deals={visibleDealsForPage} savedDeals={interests} onToggleInterest={handleToggleInterest} />
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <button type="button" onClick={() => handlePage(Math.max(1, page - 1))} disabled={page === 1} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-200">
              <FiChevronLeft className="h-4 w-4" /> Prev
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: Math.max(1, paginated.totalPages) }, (_, index) => index + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => handlePage(pageNumber)}
                  className={`h-10 w-10 rounded-xl text-sm font-medium ${page === pageNumber ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'}`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>

            <button type="button" onClick={() => handlePage(Math.min(paginated.totalPages, page + 1))} disabled={page >= paginated.totalPages} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-200">
              Next <FiChevronRight className="h-4 w-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
