import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import AdminArticles from "./AdminArticles";

const mockData = [
  { id: "1", title: "Test Article 1", status: "published", created_at: "2023-10-01T12:00:00Z" }
];

// Build a fresh thenable/chainable query on every call so clearAllMocks() never breaks the chain
const makeFreshQuery = () => {
  const q: any = {};
  const resolved = Promise.resolve({ data: mockData, error: null });
  q.then = resolved.then.bind(resolved);
  q.catch = resolved.catch.bind(resolved);
  q.finally = resolved.finally.bind(resolved);
  q.eq = vi.fn().mockReturnValue(q);
  q.ilike = vi.fn().mockReturnValue(q);
  q.order = vi.fn().mockReturnValue(q);
  return q;
};

// Keep a reference so search test can inspect calls
let currentQuery: ReturnType<typeof makeFreshQuery>;

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: vi.fn(() => {
      currentQuery = makeFreshQuery();
      return {
        select: vi.fn().mockReturnValue(currentQuery),
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ error: null })
        })
      };
    })
  }
}));

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() }
}));

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("AdminArticles", () => {
  // No clearAllMocks — each render triggers a fresh makeFreshQuery() via the from() factory


  it("renders the articles header and new article button", async () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AdminArticles />
      </MemoryRouter>
    );
    // Wait for the initial async load to settle before asserting static UI
    await screen.findByText("Articles");
    expect(screen.getByText("Articles")).toBeInTheDocument();
    expect(screen.getByText("New Article")).toBeInTheDocument();
  });

  it("loads and displays articles in datatable", async () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AdminArticles />
      </MemoryRouter>
    );

    // findByText auto-retries until the async load settles
    expect(await screen.findByText("Test Article 1")).toBeInTheDocument();
    // Status badge renders inside a <span>; targeting it avoids whitespace issues
    expect(await screen.findByText(/published/i, { selector: "span" })).toBeInTheDocument();
  });

  it("allows searching for articles", async () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AdminArticles />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText("Search articles...");
    fireEvent.change(searchInput, { target: { value: "Test" } });

    expect(searchInput).toHaveValue("Test");

    await waitFor(() => {
      // currentQuery is updated by the re-triggered load() after search state changes
      expect(currentQuery.ilike).toHaveBeenCalledWith("title", "%Test%");
    });
  });
});
