import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import AdminArticleEditor from "./AdminArticleEditor";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const createMockQuery = (resolvesTo: any) => {
  const query: any = Promise.resolve({ data: [] });
  query.eq = vi.fn().mockReturnValue(query);
  query.single = vi.fn().mockResolvedValue(resolvesTo);
  return query;
};

const mockQuery = createMockQuery({
    data: { 
      id: "1", title: "Existing Article", slug: "existing-article", 
      status: "draft", content: [], excerpt: "Test Excerpt" 
    }
});

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnValue(mockQuery),
      insert: vi.fn().mockResolvedValue({ error: null }),
      update: vi.fn().mockReturnValue({
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

// Mock ContentBlockEditor to avoid complex UI rendering issues in tests
vi.mock("@/components/admin/ContentBlockEditor", () => ({
  default: () => <div data-testid="content-block-editor">Content Block Editor</div>
}));

// Mock ResizeObserver for Recharts / Radix components that might use it
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("AdminArticleEditor", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders new article editor when no id is provided", () => {
    render(
      <MemoryRouter initialEntries={["/admin/articles/new"]}>
        <Routes>
          <Route path="/admin/articles/:id" element={<AdminArticleEditor />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("New Article")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Article title...")).toBeInTheDocument();
  });

  it("loads existing article data when editing", async () => {
    render(
      <MemoryRouter initialEntries={["/admin/articles/1"]}>
        <Routes>
          <Route path="/admin/articles/:id" element={<AdminArticleEditor />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Edit Article")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Existing Article")).toBeInTheDocument();
      expect(screen.getByDisplayValue("existing-article")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Test Excerpt")).toBeInTheDocument();
    });
  });

  it("handles saving functionality", async () => {
    render(
      <MemoryRouter initialEntries={["/admin/articles/new"]}>
        <Routes>
          <Route path="/admin/articles/:id" element={<AdminArticleEditor />} />
        </Routes>
      </MemoryRouter>
    );

    const titleInput = screen.getByPlaceholderText("Article title...");
    fireEvent.change(titleInput, { target: { value: "New Title" } });

    await waitFor(() => {
      // Slug should be automatically generated
      expect(screen.getByDisplayValue("new-title")).toBeInTheDocument();
    });

    const saveButton = screen.getByText("Save Draft");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith("articles");
      expect(toast.success).toHaveBeenCalledWith("Article saved!");
    });
  });
});
