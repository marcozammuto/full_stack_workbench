import { useEffect, useState, useCallback } from "react";
import { useApi } from "../../hooks/useApi";
import { useTheme } from "../../context/ThemeContext";

interface BookingInterface {
  GuestName?: string;
  BookingDateId: string;
  PropertyId: string;
  Paid?: boolean;
  Channel?: string;
}

const Bookings = () => {
  const [bookings, setBookings] = useState<BookingInterface[]>([]);
  const [cursorHistory, setCursorHistory] = useState<(string | null)[]>([null]);
  const [pageIndex, setPageIndex] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const api = useApi();
  const { isDarkMode } = useTheme();

  const fetchPage = useCallback(
    async (index: number) => {
      setLoading(true);
      try {
        const cursor = cursorHistory[index];
        const res = await api.post("/booking", { nextCursor: cursor });

        setBookings(res.data.data || []);
        setPageIndex(index);
        setHasNextPage(!!res.data.nextCursor);

        if (res.data.nextCursor && index === cursorHistory.length - 1) {
          setCursorHistory((prev) => [...prev, res.data.nextCursor]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [api, cursorHistory],
  );

  const goNext = () => {
    if (hasNextPage || pageIndex < cursorHistory.length - 1) {
      fetchPage(pageIndex + 1);
    }
  };

  const goPrev = () => {
    if (pageIndex > 0) {
      fetchPage(pageIndex - 1);
    }
  };

  useEffect(() => {
    fetchPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1
          className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
        >
          Bookings
        </h1>
        <p
          className={`mt-1 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          Manage your property bookings
        </p>
      </div>

      {/* Table Card */}
      <div
        className={`rounded-lg shadow-md overflow-hidden ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {loading && (
          <div
            className={`px-4 py-2 text-sm ${
              isDarkMode
                ? "bg-blue-900/30 text-blue-300"
                : "bg-blue-50 text-blue-600"
            }`}
          >
            Loading...
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className={isDarkMode ? "bg-gray-700" : "bg-gray-50"}>
              <tr>
                {["Date", "Channel", "Guest", "Status", "Property"].map(
                  (head) => (
                    <th
                      key={head}
                      className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {head}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody
              className={`divide-y ${isDarkMode ? "divide-gray-700" : "divide-gray-200"}`}
            >
              {bookings.length === 0 && !loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className={`px-6 py-8 text-center text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    No bookings found
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr
                    key={b.BookingDateId}
                    className={`transition ${
                      isDarkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-50"
                    }`}
                  >
                    <td
                      className={`px-6 py-4 text-sm font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {b.BookingDateId.split("#")[0]}
                    </td>
                    <td
                      className={`px-6 py-4 text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {b.Channel || "-"}
                    </td>
                    <td
                      className={`px-6 py-4 text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {b.GuestName || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          b.Paid
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {b.Paid ? "Paid" : "Unpaid"}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-4 text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {b.PropertyId}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div
          className={`px-6 py-4 flex items-center justify-between border-t ${
            isDarkMode
              ? "border-gray-700 bg-gray-800"
              : "border-gray-200 bg-gray-50"
          }`}
        >
          <p
            className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Page {pageIndex + 1}
          </p>
          <div className="flex gap-2">
            <button
              disabled={pageIndex === 0 || loading}
              onClick={goPrev}
              className={`px-4 py-2 text-sm font-medium rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed ${
                isDarkMode
                  ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            <button
              disabled={!hasNextPage || loading}
              onClick={goNext}
              className={`px-4 py-2 text-sm font-medium rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed ${
                isDarkMode
                  ? "bg-blue-600 text-white hover:bg-blue-500"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
