import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AdminDashboard from "./AdminDashboard";

// Mock Supabase client
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockResolvedValue({ count: 10, data: null, error: null }),
    })),
  },
}));

describe("AdminDashboard", () => {
  it("renders dashboard title and text", async () => {
    render(<AdminDashboard />);
    
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Overview of your platform")).toBeInTheDocument();

    await waitFor(() => {
      // 4 metrics loaded with value 10
      expect(screen.getAllByText("10").length).toBe(4);
    });
  });

  it("displays all metric cards with correct titles", async () => {
    render(<AdminDashboard />);
    expect(screen.getByText("Total Articles")).toBeInTheDocument();
    expect(screen.getByText("Total Posts")).toBeInTheDocument();
    expect(screen.getByText("Waitlist")).toBeInTheDocument();
    expect(screen.getByText("Event Registrations")).toBeInTheDocument();
  });
});
