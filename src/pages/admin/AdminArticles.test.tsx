import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import AdminArticles from "./AdminArticles";

const mockData = [
  { id: "1", title: "Test Article 1", status: "published", created_at: "2023-10-01T12:00:00Z" }
];

const createMockQuery = (resolvesTo: any) => {
  const query: any = Promise.resolve(resolvesTo);
  query.eq = vi.fn().mockReturnValue(query);
  query.ilike = vi.fn().mockReturnValue(query);
  query.order = vi.fn().mockReturnValue(query);
  return query;
};

const mockQuery = createMockQuery({ data: mockData, error: null });

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnValue(mockQuery),
      delete: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ error: null })
      })
    }))
  }
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

// Mock ResizeObserver for Recharts / Radix components that might use it
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("AdminArticles", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the articles header and new article button", () => {
    render(
      <MemoryRouter>
        <AdminArticles />
      </MemoryRouter>
    );
    expect(screen.getByText("Articles")).toBeInTheDocument();
    expect(screen.getByText("New Article")).toBeInTheDocument();
  });

  it("loads and displays articles in datatable", async () => {
    render(
      <MemoryRouter>
        <AdminArticles />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Test Article 1")).toBeInTheDocument();
      expect(screen.getByText("published")).toBeInTheDocument();
    });
  });

  it("allows searching for articles", async () => {
    render(
      <MemoryRouter>
        <AdminArticles />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText("Search articles...");
    fireEvent.change(searchInput, { target: { value: "Test" } });

    expect(searchInput).toHaveValue("Test");
    
    await waitFor(() => {
      expect(mockQuery.ilike).toHaveBeenCalledWith("title", "%Test%");
    });
  });
});
