import PaginationButton from "./PaginationButton";

export default function Pagination({ pagination, anchor = null }) {
    if (pagination.total <= pagination.per_page) return null;

    const prev_page_url = pagination.prev_page_url
        ? anchor
            ? `${pagination.prev_page_url}#${anchor}`
            : pagination.prev_page_url
        : null;

    const next_page_url = pagination.next_page_url
        ? anchor
            ? `${pagination.next_page_url}#${anchor}`
            : pagination.next_page_url
        : null;

    return (
        <div className="flex items-center justify-between px-2 py-4 border-t-2 border-slate-200">
            <div className="text-sm text-slate-500">
                Hal{" "}
                <span className="font-semibold text-slate-700">
                    {pagination.current_page}
                </span>{" "}
                dari{" "}
                <span className="font-semibold text-slate-700">
                    {pagination.last_page}
                </span>
            </div>

            <div className="flex items-center gap-2">
                <PaginationButton url={prev_page_url}>←</PaginationButton>

                <PaginationButton active>
                    {pagination.current_page}
                </PaginationButton>

                <PaginationButton url={next_page_url}>→</PaginationButton>
            </div>
        </div>
    );
}